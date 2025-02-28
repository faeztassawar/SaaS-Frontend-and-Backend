import DNav from "@/app/template1/components/DNav";
import DSidebar from "@/app/template1/components/DSidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  restaurant_id: string;
}

const Layout = ({ children, restaurant_id }: LayoutProps) => {
  return <div className="mt-5">{children}</div>;
};

export default Layout;
