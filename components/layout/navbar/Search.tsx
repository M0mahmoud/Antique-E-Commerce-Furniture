"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const t = useTranslations("header");
  const searchParams = useSearchParams();
  const locale = useLocale();

  return (
    <form
      action={`${locale}/shop`}
      className="relative hidden w-full max-w-56 lg:w-80 md:block"
    >
      <Input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder={t("input")}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full px-4 py-2 text-white bg-transparent border rounded-md text-md placeholder:text-white md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div
        className="absolute top-0 flex items-center h-full cursor-pointer ltr:right-0 rtl:left-0 me-3"
        role="button"
      >
        <SearchIcon className="h-4 text-white" />
      </div>
    </form>
  );
};

export default Search;
