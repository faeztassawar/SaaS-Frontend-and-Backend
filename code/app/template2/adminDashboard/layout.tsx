import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  restaurant_id: string;
}

const Layout = ({ children, restaurant_id }: LayoutProps) => {
  return <div>{children}</div>;
};

export default Layout;
