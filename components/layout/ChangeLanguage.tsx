import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "@/i18n/routing";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Button } from "../ui/button";
type Props = {};

export default function ChangeLanguage({}: Props) {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex justify-start gap-2 w-40">
          <Globe className="size-5" />
          <span className="block">
            {locale === "en" ? t("arabic") : t("english")}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem className="hover:outline-none hover:border-none p-1">
          <Link className="w-full h-full flex " href="/" locale="en">
            {t("english")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:outline-none hover:border-none p-1">
          <Link className="w-full h-full flex " href="/" locale="ar">
            {t("arabic")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
