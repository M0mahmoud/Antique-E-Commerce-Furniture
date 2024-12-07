"use server";

import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function revalidate(path: string) {
    const locale = getLocale();
    revalidatePath(`/${locale}/${path}`);
    return { revalidated: true };
}
