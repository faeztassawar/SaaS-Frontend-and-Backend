"use client"

import React, { useState, type FormEvent } from "react"
import { Upload } from "lucide-react"

interface MenuItemFormProps {
  _id?: string
  name?: string
  description?: string
  basePrice?: string
  category?: string
  image?: string
}

export default function MenuItemForm({
  _id,
  name: existingName,
  description: existingDescription,
  basePrice: existingBasePrice,
  category: existingCategory,
  image: existingImage,
}: MenuItemFormProps) {
  const [name, setName] = useState(existingName || "")
  const [description, setDescription] = useState(existingDescription || "")
  const [basePrice, setBasePrice] = useState(existingBasePrice || "")
  const [category, setCategory] = useState(existingCategory || "")
  const [image, setImage] = useState<string | null>(existingImage || null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleFormSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const data = { name, description, basePrice, category, image }
    const method = _id ? "PUT" : "POST"

    await fetch("/api/items", {
      method,
      body: JSON.stringify({ ...data, _id }),
      headers: { "Content-Type": "application/json" },
    })
  }

  return (
    <form className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleFormSubmit}>
      <h2 className="text-2xl font-semibold text-center text-red-700 mb-4">Add New Item</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} 
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" value={description} onChange={(ev) => setDescription(ev.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" value={category} onChange={(ev) => setCategory(ev.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Base Price</label>
            <input type="text" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700">Item Image</label>
          <div className="relative w-40 h-40 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            {image ? (
              <img src={image} alt="Item Preview" className="object-cover w-full h-full" />
            ) : (
              <Upload className="text-gray-500 w-10 h-10" />
            )}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange} 
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Click to upload</p>
        </div>
      </div>

      <button type="submit" className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
        Save
      </button>
    </form>
  )
}
