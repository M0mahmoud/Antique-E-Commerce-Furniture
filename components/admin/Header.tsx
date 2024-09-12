"use client";
import { Menu, User } from "lucide-react";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <div className="p-4 bg-primary flex justify-between items-center">
    <button
      onClick={toggleSidebar}
      className="text-primary-foreground focus:outline-none lg:hidden self-end"
    >
      <Menu className="w-6 h-6 text-black" />
    </button>
    <User />
  </div>
);

export default Header;
