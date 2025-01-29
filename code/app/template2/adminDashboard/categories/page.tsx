"use client";

import React, { useState } from "react";
import Header from "@/app/template2/components/Header";
import UserTabs from "@/app/template2/components/UserTabs";
import Footer from "@/app/template2/components/Footer";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  interface Category {
    _id: string;
    name: string;
  }

  const categories: Category[] = [
    { _id: "1", name: "Beverages" },
    { _id: "2", name: "Appetizers" },
    { _id: "3", name: "Desserts" },
  ];

  const handleEditClick = (category: Category) => {
    setEditedCategory(category);
    setCategoryName(category.name);
  };

  const handleReset = () => {
    setEditedCategory(null);
    setCategoryName("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAdmin={true} />
      <div className="text-center mt-8 mb-12">
        <UserTabs isAdmin={true} />
      </div>

      <div className="flex grow flex-col items-center justify-center">
        {/* Centering the category form */}
        <div className="w-full max-w-2xl p-5 py-5 shadow-2xl rounded-lg bg-gray-100">
          <form className="w-full">
            <div className="flex gap-3 items-end">
              <div className="grow">
                <label className="font-semibold text-md text-gray-700 block mb-2">
                  {editedCategory ? "Update Category" : "New Category Name"}
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="border w-full p-2 rounded mt-2"
                />
              </div>
              <div className="pb-1 flex justify-center items-center gap-3">
                <button
                  className="bg-[#F13A01] text-white px-4 py-2 rounded-full"
                  type="submit"
                >
                  {editedCategory ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="bg-[#F13A01] text-white px-4 py-2 rounded-full"
                  onClick={handleReset}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          {/* Centering the existing categories */}
          <div className="mt-8">
            <h2 className="text-sm text-gray-500 mb-3">Existing Categories</h2>
            {categories.length > 0 &&
              categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-gray-300 font-semibold text-md rounded-xl p-3 px-3 flex justify-between items-center mb-2 hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
                >
                  <span onClick={() => handleEditClick(category)}>
                    {category.name}
                  </span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditClick(category)}
                      type="button"
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
