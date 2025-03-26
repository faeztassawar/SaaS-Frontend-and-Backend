"use client";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AddItemPageProps = {
  menuId: string;
};

const AddItemPage = ({ menuId }: AddItemPageProps) => {
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>();
  const [itemCategory, setItemCategory] = useState<string>("");
  const [itemImg, setItemImage] = useState<File>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
        setItemImage(undefined);
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
    <div className="p-5 rounded-lg bg-[#172340] mt-5">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-wrap justify-between"
      >
        {/* Status Dialog */}
        {status !== "idle" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1f273a] p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">
                {status === "success" ? "Success!" : "Error!"}
              </h3>
              <p className="mb-4">{message}</p>
              <button
                onClick={() => setStatus("idle")}
                className="w-full p-2 bg-[#1c9cea] text-white rounded-md hover:bg-[#1683c2] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          value={itemName}
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
          onChange={(e) => setItemName(e.target.value)}
        />

        <select
          name="cat"
          id="cat"
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <option value="">Choose a Category</option>
          {categories.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          name="price"
          required
          value={itemPrice || ""}
          onChange={(e) => setItemPrice(Number(e.target.value))}
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />

        <input
          type="file"
          name="image"
          required
          accept="image/*"
          onChange={(e) => setItemImage(e.target.files?.[0])}
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />

        <button
          type="submit"
          className="w-full p-4 bg-[#1c9cea] text-white rounded-md cursor-pointer hover:bg-[#1683c2] transition-colors"
          onClick={handleSubmit}
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
