import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Define which routes should be protected
const protectedRoutes = ["/user"];

export default async function middleware(request: NextRequest) {
  const [, locale] = request.nextUrl.pathname.split("/");
  const { pathname } = request.nextUrl;

  // Exclude static files and assets
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|js|css|woff|woff2|ttf|eot|otf)$/.test(
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
    // Match all paths that start with supported locales
    "/(ar|en)/:path*",
    // Match the root path
    "/",
    // Exclude static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
