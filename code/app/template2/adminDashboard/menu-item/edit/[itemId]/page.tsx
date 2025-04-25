"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/app/template2/components/Header"
import Footer from "@/app/template2/components/Footer"
import UserTabs from "@/app/template2/components/UserTabs"
import SectionHeader from "@/app/template2/components/SectionHeader"
import type { Category } from "@prisma/client"
import { Upload } from "lucide-react"

export default function EditItemPage() {
  const router = useRouter()
  const params = useParams()

  // Extract params from URL
  const itemId = params.itemId as string
  const restaurantId = params.restaurant_id as string

  // State for menuId
  const [menuId, setMenuId] = useState<string>("")
  const [itemName, setItemName] = useState<string>("")
  const [itemPrice, setItemPrice] = useState<number>()
  const [itemCategory, setItemCategory] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [itemImg, setItemImage] = useState<File | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  // First fetch the menu ID for this restaurant
  useEffect(() => {
    const fetchMenuId = async () => {
      if (!restaurantId) return

      try {
        const res = await fetch(`/api/menu/${restaurantId}`)
        if (res.ok) {
          const data = await res.json()
          setMenuId(data.id)
        } else {
          console.error("Failed to fetch menu ID")
        }
      } catch (error) {
        console.error("Error fetching menu ID:", error)
      }
    }

    fetchMenuId()
  }, [restaurantId])

  // Fetch item details
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId || !menuId) return

      try {
        setStatus("loading")

        // Get categories for the menu
        const categoriesRes = await fetch(`/api/categories/${menuId}`)
        let allCategories: Category[] = []

        if (categoriesRes.ok) {
          allCategories = await categoriesRes.json()
          setCategories(allCategories)
        }

        // Then fetch the item details
        const itemRes = await fetch(`/api/items/item/${itemId}`)
        if (itemRes.ok) {
          const itemData = await itemRes.json()
          setItemName(itemData.name)
          setItemPrice(itemData.price)
          setCategoryId(itemData.categoryId)

          // Find the category name
          const category = allCategories.find((cat: Category) => cat.id === itemData.categoryId)
          if (category) {
            setItemCategory(category.name)
          }

          // Handle image
          if (itemData.image) {
            const imageUrl = convertImage(itemData.image)
            setCurrentImage(imageUrl)
          }

          setStatus("idle")
        } else {
          setStatus("error")
          setMessage("Failed to fetch item details")
        }
      } catch (error) {
        console.error("Error fetching item details:", error)
        setStatus("error")
        setMessage("An error occurred while fetching item details")
      }
    }

    fetchItemDetails()
  }, [itemId, menuId])

  const convertImage = (image: string | Uint8Array): string | null => {
    if (typeof image === "string") {
      return image // If it's already a URL, return it
    }

    if (image instanceof Uint8Array) {
      const base64String = Buffer.from(image).toString("base64")
      return `data:image/png;base64,${base64String}` // Change MIME type if necessary
    }

    return null
  }

  const handleSubmit = async () => {
    try {
      setStatus("loading")
      const formData = new FormData()
      formData.append("id", itemId)
      formData.append("name", itemName)
      if (itemImg) formData.append("image", itemImg)
      formData.append("price", itemPrice?.toString() || "")
      formData.append("desc", itemCategory)
      formData.append("categoryId", categoryId)

      const res = await fetch(`/api/items`, {
        method: "PUT",
        body: formData,
      })

      if (res.ok) {
        setStatus("success")
        setMessage("Item updated successfully!")
        // Redirect back to items list after a short delay
        setTimeout(() => {
          router.push(`/restaurants/${restaurantId}/adminDashboard/items`)
        }, 1500)
      } else {
        setStatus("error")
        setMessage("Failed to update item. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please check your connection.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header rest_id={restaurantId} />

      <div className="text-center mt-8 mb-8">
        <UserTabs restaurant_id={restaurantId} />
      </div>

      <div className="flex flex-col items-center">
        <SectionHeader mainHeader="Edit Item" subHeader="UPDATE" />
      </div>

      <div className="flex justify-center">
        <form
          className="mt-8 max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-3xl font-semibold text-center text-red-700 mb-6">Edit Menu Item</h2>

          

          {/* Status Message */}
          {status !== "idle" && status !== "loading" && (
            <div
              className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
                status === "success"
                  ? "bg-green-100 text-green-700 border border-green-500"
                  : "bg-red-100 text-red-700 border border-red-500"
              }`}
            >
              {message}
            </div>
          )}

          {status === "loading" && (
            <div className="mb-4 p-3 rounded-lg text-center text-sm font-medium bg-blue-100 text-blue-700 border border-blue-500">
              Loading...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="title"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="mt-2 block w-full p-2.5 border rounded-lg bg-gray-50 text-gray-700 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Enter item name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="cat"
                  className="mt-2 block w-full p-2.5 border rounded-lg bg-gray-50 text-gray-700 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  value={itemCategory}
                  onChange={(e) => {
                    setItemCategory(e.target.value)
                    // Find the category ID based on the selected name
                    const selectedCategory = categories.find((cat) => cat.name === e.target.value)
                    if (selectedCategory) {
                      setCategoryId(selectedCategory.id)
                    }
                  }}
                >
                  <option value="">Choose a Category</option>
                  {categories
                    .filter((item) => !item.isArchive)
                    .map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={itemPrice || ""}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                  className="mt-2 block w-full p-2.5 border rounded-lg bg-gray-50 text-gray-700 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
              <div className="relative w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
                {itemImg ? (
                  <img
                    src={URL.createObjectURL(itemImg) || "/placeholder.svg"}
                    alt="Item Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : currentImage ? (
                  <img
                    src={currentImage || "/placeholder.svg"}
                    alt="Current Item"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <Upload className="text-gray-500 w-12 h-12" />
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setItemImage(e.target.files?.[0] || null)}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Click to upload new image</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => router.push(`/restaurants/${restaurantId}/adminDashboard/items`)}
              className="w-1/2 bg-gray-500 text-white py-2.5 rounded-lg font-medium hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-1/2 bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition duration-200"
              disabled={status === "loading"}
            >
              Update Item
            </button>
          </div>
        </form>
      </div>

      <Footer restaurant_id={restaurantId} />
    </div>
  )
}
