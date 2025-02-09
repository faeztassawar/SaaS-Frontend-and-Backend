"use client";
import { useState } from "react";

type AddItemPageProps = {
  menuId: string;
};

const AddItemPage = ({ menuId }: AddItemPageProps) => {
  const [catName, setCatName] = useState<string>("");
  const [catImage, setCatImage] = useState<File>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", catName);
      if (catImage) formData.append("image", catImage);
      formData.append("menuId", menuId);

      const res = await fetch(`http://localhost:3000/api/categories`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Category added successfully!");
        // Clear form fields
        setCatName("");
        setCatImage(undefined);
      } else {
        setStatus("error");
        setMessage("Failed to add category. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please check your connection.");
    }
  };

  return (
    <div className="p-5 rounded-lg bg-[#172340] mt-5">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-wrap justify-between"
      >
        {/* Dialog Box */}
        {status !== "idle" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1f273a] p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">
                {status === "success" ? "Success!" : "Error!"}
              </h3>
              <p className="mb-4">{message}</p>
              <button
                onClick={() => {
                  setStatus("idle");
                }}
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
          value={catName}
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
