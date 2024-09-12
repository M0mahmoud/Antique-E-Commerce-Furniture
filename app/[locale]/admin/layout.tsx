"use client";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
