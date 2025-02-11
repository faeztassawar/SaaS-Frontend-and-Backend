"use client";

import { useState, useEffect } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import SectionHeader from "@/app/template2/components/SectionHeader";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react"

type AddItemPageProps = {
  menuId: string;
  restaurantId: string;
};

const NewMenuItemPage = ({ menuId, restaurantId }: AddItemPageProps) => {
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>();
  const [itemCategory, setItemCategory] = useState<string>("");
  const [itemImg, setItemImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", itemName);
      if (itemImg) formData.append("image", itemImg);
      formData.append("price", itemPrice?.toString() || "");
      formData.append("desc", itemCategory);
      formData.append("menu", menuId);

      const res = await fetch(`http://localhost:3000/api/items`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setStatus("success");
        setMessage("Item added successfully!");
        // Clear form fields
        setItemName("");
        setItemPrice(undefined);
        setItemCategory("");
        setItemImage(null);
      } else {
        setStatus("error");
        setMessage("Failed to add item. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please check your connection.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/categories/${menuId}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [menuId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header isAdmin={true} />

      {/* User Tabs */}
      <div className="text-center mt-8 mb-8">
        <UserTabs isAdmin={true} restaurant_id={restaurantId}/>
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center">
        <SectionHeader mainHeader="New Item" subHeader="ADD" />
      </div>

      {/* Menu Item Form */}
      <div className="flex justify-center">
        <form className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-semibold text-center text-red-700 mb-4">Add New Item</h2>
          
          {/* Status Message */}
          {status !== "idle" && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {message}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input type="text" name="title" value={itemName} onChange={(e) => setItemName(e.target.value)} 
                className="mt-1 block w-full p-2 border rounded-lg  bg-white text-gray-700 focus:ring-red-500 focus:border-red-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="cat"
                  id="cat"
                  className="mt-1 block w-full p-2 border rounded-lg bg-white text-gray-700 focus:ring-red-500 focus:border-red-500"
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                >
                  <option value="">Choose a Category</option>
                  {categories.filter((item) => !item.isArchive).map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" name="price" required value={itemPrice || ""} onChange={(e) => setItemPrice(Number(e.target.value))}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"/>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700">Item Image</label>
              <div className="relative w-40 h-40 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                {itemImg ? (
                  <img src={URL.createObjectURL(itemImg)} alt="Item Preview" className="object-cover w-full h-full" />
                ) : (
                  <Upload className="text-gray-500 w-10 h-10" />
                )}
                <input 
                  type="file" 
                  name="image"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setItemImage(e.target.files?.[0] || null)} 
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Click to upload</p>
            </div>
          </div>

          <button type="submit" onClick={handleSubmit} className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            Save
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewMenuItemPage;