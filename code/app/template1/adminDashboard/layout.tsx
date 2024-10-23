import DNav from "@/app/template1/components/DNav";
import DSidebar from "@/app/template1/components/DSidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-[#172340] p-5 min-h-full">
        <DSidebar />
      </div>

      {/* Content area */}
      <div className="flex-1 p-5">
        {/* Navbar fixed at the top */}
        <DNav />
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;