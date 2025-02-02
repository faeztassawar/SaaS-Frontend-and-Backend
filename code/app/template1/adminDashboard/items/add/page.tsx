"use client";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AddItemPageProps = {
  menuId: string;
};

const AddItemPage = ({ menuId }: AddItemPageProps) => {
  const [itemName, setItemName] = useState<string>();
  const [itemPrice, setItemPrice] = useState<number>();
  const [itemCategory, setItemCategory] = useState<string>();
  const [itemImg, setItemImage] = useState<File>();
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", itemName || "");
    formData.append("image", itemImg || "");
    formData.append("price", itemPrice?.toString() || "");
    formData.append("desc", itemCategory || "");
    formData.append("menu", menuId || "");
    console.log("Updating");
    const res = await fetch(`http://localhost:3000/api/items`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Now: ", data);
    } else {
      console.log("ERROR!");
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
    <div className="p-5 rounded-lg bg-[#172340] mt-5">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-wrap justify-between"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
          onChange={(e) => setItemName(e.target.value)}
        />
        <select
          name="cat"
          id="cat"
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <option value="">Choose a Category</option>
          {categories.map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price"
          name="price"
          required
          onChange={(e) => setItemPrice(Number(e.target.value))}
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setItemImage(e.target.files?.[0])}
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />

        <button
          type="submit"
          className="w-full p-4 bg-[#1c9cea] text-white rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
