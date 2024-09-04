"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const t = useTranslations("header");
  const searchParams = useSearchParams();
  return (
    <form
      action="/search"
      className="max-w-56 w-full lg:w-80 relative hidden md:block"
    >
      <Input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder={t("input")}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-md w-full bg-transparent rounded-md border px-4 py-2 text-white placeholder:text-white md:text-sm  focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div
        className="absolute ltr:right-0 rtl:left-0 top-0 me-3 flex h-full items-center cursor-pointer"
        role="button"
      >
        <SearchIcon className="h-4 text-white" />
      </div>
    </form>
  );
};

export default Search;
