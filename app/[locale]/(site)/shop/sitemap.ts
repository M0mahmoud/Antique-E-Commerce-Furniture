import { MetadataRoute } from "next";
import { getPathname, routing } from "@/i18n/routing";
import { getAllProducts } from "../../../api/products";
import { Locale } from "next-intl";

const host = "https://antique05.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const allProducts =
    products?.products.flatMap((product) =>
      routing.locales.map((locale) => ({
        url: getUrl(`/product/${product.slug}`, locale),
        lastModified: new Date(product.updatedAt),
        images: [product.main_image.url],
        // alternates: {
        //   languages: Object.fromEntries(
        //     routing.locales.map((cur) => [
        //       cur,
        //       getUrl(`/product/${product.slug}`, cur),
        //     ])
        //   ),
        // },
      }))
    ) || [];
  return [...allProducts];
}

type Href = Parameters<typeof getPathname>[0]["href"];
function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
