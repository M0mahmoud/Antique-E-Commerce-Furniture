import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  console.log("SEGMENTS:", segments);

  // TODO: Refactor
  if (locale != null && segments.join("/") === "admin") {
    const session = request.cookies.get("session")?.value;
    const user = await decrypt(session);
    const isAdmin = user?.userId === "6722860d13cfd239013a35fa";
    if (!isAdmin) {
      request.nextUrl.pathname = `/${locale}/auth/signup`;
    }
  }

  const handleI18nRouting = createMiddleware({
    locales: ["en", "ar"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
