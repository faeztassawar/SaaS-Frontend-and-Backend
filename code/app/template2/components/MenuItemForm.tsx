"use client"

import React, { useState, type FormEvent } from "react"

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
    if (_id) {
      // update
      await fetch("/api/items", {
        method: "PUT",
        body: JSON.stringify({ ...data, _id }),
        headers: { "Content-Type": "application/json" },
      })
    } else {
      // create
      await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  return (
    <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleFormSubmit}>
      <div className="flex items-start gap-4">
        <div className="grow">
          <label>Item name</label>
          <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
          <label>Description</label>
          <input type="text" value={description} onChange={(ev) => setDescription(ev.target.value)} />
          <label>Category</label>
          <input type="text" value={category} onChange={(ev) => setCategory(ev.target.value)} />
          <label>Base price</label>
          <input type="text" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)} />
        </div>
        <div>
          <label>Item image</label>
          <img className="rounded-lg w-full h-full mb-1" src={image || "/placeholder.png"} alt="item image" />
          <label className="button w-full text-center cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileChange} />
            Edit image
          </label>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

