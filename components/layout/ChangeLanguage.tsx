import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "@/i18n/routing";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Globe } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
type Props = {};

export default function ChangeLanguage({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="size-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/" locale="en">
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" locale="ar">
            Arabic
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
