"use client";

import { FormEvent } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import MenuItemForm from "@/app/template2/components/MenuItemForm";
import SectionHeader from "../../../components/SectionHeader";

interface MenuItem {
  image: string;
  name: string;
  description: string;
  basePrice: string;
  category: string;
}

export default function NewMenuItemPage() {
  const handleFormSubmit = (
    ev: FormEvent<HTMLFormElement>,
    menuItem: MenuItem
  ) => {
    ev.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isAdmin={true} />
      <div className="text-center mt-8 mb-8">
        <UserTabs isAdmin={true} />
      </div>
      <div className="text-center justify-center items-center">
        <SectionHeader mainHeader="New Item" subHeader="ADD" />
      </div>
      <MenuItemForm />
      <Footer />
    </div>
  );
}
