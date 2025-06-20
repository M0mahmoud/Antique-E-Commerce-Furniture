import { MetadataRoute } from "next";
import { Locale } from "next-intl";
import { getPathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getAllProducts } from "../api/products";

const host = "https://antique05.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts({
    page: 1, // waitting backend to create new endpoint for all products
  });
  const allProducts =
    products?.products.flatMap((product) =>
      routing.locales.map((locale) => ({
        url: getUrl(`/product/${product.slug}`, locale),
        lastModified: new Date(product.updatedAt),
        images: [product.main_image.url],
      }))
    ) || [];
  return [
    ...(await getEntries("/")),
    ...(await getEntries("/shop")),
    ...(await getEntries("/contact")),
    ...(await getEntries("/services")),
    ...allProducts,
  ];
}

type Href = Parameters<typeof getPathname>[0]["href"];

async function getEntries(href: Href): Promise<MetadataRoute.Sitemap> {
  return [
    ...routing.locales.map((locale) => ({
      url: getUrl(href, locale),
      lastModified: new Date(),

      // alternates: {
      //   languages: Object.fromEntries(
      //     routing.locales.map((cur) => [cur, getUrl(href, cur)])
      //   ),
      // },
    })),
  ];
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
