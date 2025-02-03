"use client";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AddItemPageProps = {
  menuId: string;
};

const AddItemPage = ({ menuId }: AddItemPageProps) => {
  const [catName, setCatName] = useState<string>();
  const [catImage, setCatImage] = useState<File>();
  const router = useRouter();
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", catName || "");
    formData.append("image", catImage || "");
    formData.append("menuId", menuId);
    console.log("Updating");
    const res = await fetch(`http://localhost:3000/api/categories`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Now: ", data);
    }
  };

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
          onChange={(e) => setCatName(e.target.value)}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setCatImage(e.target.files?.[0])}
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
