"use client";
import { sidebarSections } from "@/app/constant";
import { Link } from "@/navigation";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } overflow-y-auto flex flex-col w-64 h-screen bg-secondary border-r fixed lg:relative lg:block`}
    >
      <div className="p-4 flex justify-between">
        <div className="flex items-center justify-center w-24 h-12 rounded-full">
          <Image
            alt="logo"
            width={90}
            height={46}
            src="/anD.svg"
            className="bg-cover"
          />
        </div>
        <button
          onClick={toggleSidebar}
          className="text-primary focus:outline-none lg:hidden"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sidebarSections.map((section, idx) => (
            <li
              key={section.label}
              className={`
              rounded-md p-1
            ${idx === 0 || openSection === section.label ? "bg-primary/20" : ""}
            `}
            >
              <button
                onClick={() =>
                  setOpenSection(
                    openSection === section.label ? null : section.label
                  )
                }
                className="flex items-center justify-between w-full p-2 rounded-lg text-muted-foreground hover:text-primary"
              >
                <span className="flex items-center font-bold">
                  {section.icon && (
                    <section.icon className="w-5 h-5 me-3 text-primary" />
                  )}
                  {section.label}
                </span>
                {section.subItems?.length ? (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openSection === section.label ? "rotate-180" : ""
                    }`}
                  />
                ) : null}
              </button>
              {openSection === section.label && section.subItems && (
                <ul className="ps-4 mt-1 space-y-1 text-muted-foreground rounded-md">
                  {section.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.path}
                        className="block px-2 py-1 hover:text-primary"
                      >
                        {subItem.icon && (
                          <subItem.icon className="w-5 h-5 me-3 text-primary inline-block" />
                        )}
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
