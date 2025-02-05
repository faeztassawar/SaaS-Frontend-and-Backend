"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import MenuItemForm from "@/app/template2/components/MenuItemForm"
import Header from "@/app/template2/components/Header"
import Footer from "@/app/template2/components/Footer"
import UserTabs from "@/app/template2/components/UserTabs"
import { FaAngleRight } from "react-icons/fa"

interface MenuItem {
  _id?: string
  name?: string
  description?: string
  basePrice?: string
  category?: string
  image?: string
}

export default function EditMenuItemPage({ params }: { params: { id: string } }) {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [restId, setRestId] = useState<string>("")

  useEffect(() => {
    if (params.id) {
      fetch(`/api/items/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMenuItem(data)
        })
    }
  }, [params.id])

  return (
    <div className="min-h-screen">
      <Header isAdmin={true} />
      <div className="text-center mt-12 mb-10">
        <UserTabs isAdmin={true}
        rest_id={restId} />
      </div>
      <div className="mt-8 flex justify-center bg-gray-50">
        <Link href={"/template2/menu-item"}>
          <button className="flex justify-center items-center gap-2 text-center bg-primaryTem2 border text-white font-semibold rounded-xl px-6 py-2">
            Show All Menu Items
            <FaAngleRight size={20} />
          </button>
        </Link>
      </div>
      {menuItem && <MenuItemForm {...menuItem} />}
      <Footer />
    </div>
  )
}

