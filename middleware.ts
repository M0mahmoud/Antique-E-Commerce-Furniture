import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    const [, locale, ...segments] = request.nextUrl.pathname.split("/");
    console.log("SEGMENTS:", segments);

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
