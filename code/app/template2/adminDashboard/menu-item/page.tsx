"use client"

import type React from "react"
import Link from "next/link"
import type { Item, Category } from "@prisma/client"
import { useEffect, useState } from "react"

interface Template2ItemsPageProps {
  restaurantId: string
  menuId: string
  categories: Category[]
  items: Item[]
}

const Template2ItemsPage: React.FC<Template2ItemsPageProps> = ({ restaurantId, menuId, categories, items }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
      <Link
        href={`/restaurants/${restaurantId}/adminDashboard/items/add`}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-600 transition-colors"
      >
        Add New Item
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{category.name}</h2>
            <ul className="space-y-2">
              {items
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <li key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-gray-700">{item.name}</span>
                      <span className="ml-2 text-gray-600">${item.price.toFixed(2)}</span>
                    </div>
                    <Link
                      href={`/restaurants/${restaurantId}/adminDashboard/items/edit/${item.id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              {items.filter((item) => item.categoryId === category.id).length === 0 && (
                <li className="text-gray-500 italic">No items in this category</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Template2ItemsPage