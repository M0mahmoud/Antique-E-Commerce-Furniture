import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Define which routes should be protected
const protectedRoutes = ["/user"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static files and assets - FIXED: More comprehensive exclusion
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    pathname.includes("/api/") ||
    /\.(svg|png|jpg|jpeg|gif|webp|avif|ico|js|css|woff|woff2|ttf|eot|otf|pdf|txt|xml|json)$/i.test(
      pathname
    );

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Handle i18n routing
  const handleI18nRouting = createMiddleware({
    locales: ["en", "ar"],
    defaultLocale: "en",
  });

  // Get the response from the i18n middleware
  const response = handleI18nRouting(request);

  // Extract locale from pathname after i18n middleware processing
  const [, locale] = request.nextUrl.pathname.split("/");

  // Check if the current route is protected (considering locale prefixes)
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === `/${locale}${route}` ||
      pathname.startsWith(`/${locale}${route}/`)
  );

  // Get the token from the request cookies
  const token = request.cookies.get("AntiqueToken")?.value;

  if (pathname.startsWith(`/${locale}/auth`) && token) {
    return NextResponse.redirect(new URL(`/${locale}/user`, request.url));
  }

  // If trying to access a protected route without a token, redirect to login with the correct locale
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL(`/${locale}/auth/signin`, request.url)
    );
  }

  // Return the response from the i18n middleware
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, _static, etc.)
    "/((?!_next|_static|_vercel|public|favicon.ico|sitemap.xml|robots.txt).*)",
    // Match internationalized pathnames
    "/(ar|en)/:path*",
    // Match the root path
    "/",
  ],
};