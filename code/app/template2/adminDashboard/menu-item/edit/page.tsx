"use client";

// import { useState, FormEvent } from "react";
import Link from "next/link";
import MenuItemForm from "@/app/template2/components/MenuItemForm";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "../../components/UserTabs";
import { FaAngleRight } from "react-icons/fa";

export default function EditMenuItemPage() {
  // const [menuItem, setMenuItem] = useState(null);

  // const handleFormSubmit = (ev: FormEvent<HTMLFormElement>) => {
  //   ev.preventDefault();

  // };

  return (
    <div className="min-h-screen">
      <Header isAdmin={true} />
      <div className="text-center mt-12 mb-10">
        <UserTabs isAdmin={true} />
      </div>
      <div className="mt-8 flex justify-center bg-gray-50">
        <Link href={"/template2/menu-item"}>
          <button className="flex justify-center items-center gap-2 text-center bg-primaryTem2 border text-white font-semibold rounded-xl px-6 py-2">
            Show All Menu Items
            <FaAngleRight size={20} />
          </button>
        </Link>
      </div>
      <MenuItemForm />
      <Footer />
    </div>
  );
}
