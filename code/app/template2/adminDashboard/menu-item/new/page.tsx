"use client"

import Header from "@/app/template2/components/Header"
import Footer from "@/app/template2/components/Footer"
import UserTabs from "@/app/template2/components/UserTabs"
import MenuItemForm from "@/app/template2/components/MenuItemForm"
import SectionHeader from "../../../components/SectionHeader"
import { useState } from "react"

export default function NewMenuItemPage() {
  const [restId, setRestId] = useState<string>("")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isAdmin={true} />
      <div className="text-center mt-8 mb-8">
        <UserTabs isAdmin={true}
        rest_id={restId} />
      </div>
      <div className="text-center justify-center items-center">
        <SectionHeader mainHeader="New Item" subHeader="ADD" />
      </div>
      <MenuItemForm />
      <Footer />
    </div>
  )
}

