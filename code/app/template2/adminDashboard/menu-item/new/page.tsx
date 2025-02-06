"use client";

import { useState } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import MenuItemForm from "@/app/template2/components/MenuItemForm";
import SectionHeader from "@/app/template2/components/SectionHeader";

export default function NewMenuItemPage() {
  const [restId, setRestId] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header isAdmin={true} />

      {/* User Tabs */}
      <div className="text-center mt-8 mb-8">
        <UserTabs isAdmin={true} restaurant_id={restId} />
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center">
        <SectionHeader mainHeader="New Item" subHeader="ADD" />
      </div>

      {/* Menu Item Form */}
      <div className="flex justify-center">
        <MenuItemForm />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
