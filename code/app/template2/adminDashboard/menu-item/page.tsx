"use client"

import Header from "@/app/template2/components/Header"
import Footer from "@/app/template2/components/Footer"
import UserTabs from "@/app/template2/components/UserTabs"
import { FaAngleRight } from "react-icons/fa"
import Link from "next/link"
import type { Category, Item } from "@prisma/client"
import { Dialog } from "@headlessui/react"
import { useEffect, useState, Fragment } from "react"
import { toast } from "react-hot-toast"

interface Template2ItemsPageProps {
  restaurantId: string
  menuId: string
}

const convertImage = (image: string | Uint8Array): string | null => {
  if (typeof image === "string") {
    return image
  }

  if (image instanceof Uint8Array) {
    const base64String = Buffer.from(image).toString("base64")
    return `data:image/png;base64,${base64String}`
  }

  return null
}

const handleDelete = async (item: Item) => {
  try {
    const response = await fetch(`/api/items`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        categoryId: item.categoryId,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to delete item")
    }

    return response.json()
  } catch (error) {
    console.error("Delete error:", error)
    throw error
  }
}

const Template2ItemsPage = ({ restaurantId, menuId }: Template2ItemsPageProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [itemsList, setItemsList] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const categoriesRes = await fetch(`http://localhost:3000/api/categories/${menuId}`)

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)

        const itemsPromises = categoriesData.map(async (cat: Category) => {
          const itemsRes = await fetch(`http://localhost:3000/api/items/category/${cat.id}`)
          return itemsRes.ok ? await itemsRes.json() : []
        })

        const allItems = (await Promise.all(itemsPromises)).flat()
        setItemsList(allItems)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [menuId])

  const confirmDelete = (item: Item) => {
    setItemToDelete(item)
    setShowConfirm(true)
  }

  const performDelete = async () => {
    if (!itemToDelete) return
    try {
      await handleDelete(itemToDelete)
      toast.success("Item deleted successfully!", {
        position: "top-right",
        style: {
          background: "#172340",
          color: "#fff",
          border: "1px solid #283d6f",
          borderRadius: "12px",
        },
      })
      await fetchData()
    } catch (error) {
      toast.error("Failed to delete item", {
        position: "top-right",
        style: {
          background: "#450a0a",
          color: "#fff",
          border: "1px solid #7f1d1d",
          borderRadius: "12px",
        },
      })
    } finally {
      setShowConfirm(false)
      setItemToDelete(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header rest_id={restaurantId} />
      <div className="text-center mt-12 mb-12">
        <UserTabs restaurant_id={restaurantId} />
      </div>

      <section className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <div className="flex justify-center items-center mb-6">
          <Link href={`/restaurants/${restaurantId}/adminDashboard/items/add`}>
            <button className="flex items-center gap-3 text-center bg-[#800000] text-white font-semibold rounded-lg px-6 py-2 transition-transform hover:scale-105 shadow-md">
              Create New Menu Item
              <FaAngleRight size={20} />
            </button>
          </Link>
        </div>

        <h2 className="text-lg text-gray-700 mt-6 mb-3 px-2 font-semibold">Menu Items:</h2>
        <div className="flex flex-col gap-4">
          {itemsList.map((item) => {
            const category = categories.find((cat) => cat.id === item.categoryId)
            return (
              <div
                key={item.id}
                className="bg-gray-200 hover:bg-gray-100 transition-all rounded-lg shadow-sm p-4 flex items-center justify-between border-l-4 border-red-500"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Category: {category ? category.name : "Uncategorized"}</p>
                  <p className="text-gray-800 font-bold">${item.price}</p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/restaurants/${restaurantId}/adminDashboard/items/edit/${item.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 hover:bg-blue-700">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(item)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Footer restaurant_id={restaurantId} />

      {/* Delete Confirmation Modal */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)} as={Fragment}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <Dialog.Title className="text-lg font-semibold text-gray-900">Are you sure?</Dialog.Title>
            <p className="text-gray-600 mt-2">This action cannot be undone.</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={performDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default Template2ItemsPage
