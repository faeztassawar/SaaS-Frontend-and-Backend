"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/template2/components/Header";
import UserTabs from "@/app/template2/components/UserTabs";
import Footer from "@/app/template2/components/Footer";
import { Category } from "@prisma/client";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type CatPageProps = {
  menuId: string;
  restaurantId: string;
};

export default function CategoriesPage({ menuId, restaurantId }: CatPageProps) {
  const [catName, setCatName] = useState<string>();
  const [catImage, setCatImage] = useState<File>();
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/categories/${menuId}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [menuId]);

  const confirmDelete = async (cat: Category) => {
    MySwal.fire({
      title: <p className="text-2xl">Are you sure?</p>,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true, // Add this to enable the third button
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      denyButtonColor: "#6b7280", // Color for the "Archive it" button
      confirmButtonText: "Yes, delete it!",
      denyButtonText: "Archive it", // Text for the third button
      cancelButtonText: "Cancel",
      background: "#172340",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border-gray-600",
        confirmButton: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg",
        cancelButton: "bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg mr-3",
        denyButton: "bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg", // Style for the "Archive it" button
      },
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await handleDelete(cat);
          toast.success("Category deleted successfully!", {
            position: "top-right",
            style: {
              background: "#172340",
              color: "#fff",
              border: "1px solid #283d6f",
              borderRadius: "12px",
            },
          });
          await fetchCategories();
        } catch (error) {
          toast.error("Failed to delete category", {
            position: "top-right",
            style: {
              background: "#450a0a",
              color: "#fff",
              border: "1px solid #7f1d1d",
              borderRadius: "12px",
            },
          });
        }
      } else if (result.isDenied) {
        // Handle archive action
        console.log("ARCHIVE");
        try {
          await handleArchive(cat); // Call your archive function here
          toast.success("Category archived successfully!", {
            position: "top-right",
            style: {
              background: "#172340",
              color: "#fff",
              border: "1px solid #283d6f",
              borderRadius: "12px",
            },
          });
          await fetchCategories();
        } catch (error) {
          toast.error("Failed to archive category", {
            position: "top-right",
            style: {
              background: "#450a0a",
              color: "#fff",
              border: "1px solid #7f1d1d",
              borderRadius: "12px",
            },
          });
        }
      }
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", catName || "");
    formData.append("menuId", menuId);
    formData.append("image", catImage || "");
    console.log("Updating");
    const res = await fetch(`http://localhost:3000/api/categories`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Now: ", data);
    }
    await fetchCategories();
  };

  const handleDelete = async (cat: Category) => {
    try {
      const response = await fetch(`/api/categories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cat.id,
          menuId: cat.menuId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      return response.json();
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  };

  const handleArchive = async (cat: Category) => {
    console.log("REVERTING");
    try {
      const response = await fetch("/api/categories", {
        method: "put",
        body: JSON.stringify({
          id: cat.id,
          menuId: cat.menuId,
        }),
      });

      if (response.ok) return response.json();
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleReset = () => {
    setEditedCategory(null);
    setCatName("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header rest_id={restaurantId} />
      <div className="text-center mt-8 mb-12">
        <UserTabs restaurant_id={restaurantId}/>
      </div>

      <div className="flex grow flex-col items-center justify-center">
        {/* Centering the category form */}
        <div className="w-full max-w-2xl p-5 py-5 shadow-2xl rounded-lg bg-gray-100">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <div className="flex gap-3 items-end">
              <div className="grow">
                <label className="font-semibold text-md text-gray-700 block mb-2">
                  New Category Name
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Title"
                  className="border w-full p-2 rounded mt-2"
                />
              </div>
              <div className="pb-1 flex justify-center items-center gap-3">
                <button
                  className="bg-[#F13A01] text-white px-4 py-2 rounded-full"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Create
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
                <>
                  {!category.isArchive ? (
                    <div
                      key={category.id}
                      className="bg-gray-300 font-semibold text-md rounded-xl p-3 px-3 flex justify-between items-center mb-2 hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
                    >
                      <span>{category.name}</span>
                      <div className="flex gap-4">
                        <button
                          onClick={async () => {
                            await handleArchive(category);
                            await fetchCategories();
                          }}
                          type="button"
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-300"
                        >
                          Archieve
                        </button>
                        <button
                          onClick={() => confirmDelete(category)}
                          type="button"
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            <h2 className="text-sm text-gray-500 mb-3">Archieve Categories</h2>
            {categories.length > 0 &&
              categories.map((category) => (
                <>
                  {category.isArchive ? (
                    <div
                      key={category.id}
                      className="bg-gray-300 font-semibold text-md rounded-xl p-3 px-3 flex justify-between items-center mb-2 hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
                    >
                      <span>{category.name}</span>
                      <div className="flex gap-4">
                        <button
                          onClick={async () => {
                            await handleArchive(category);
                            await fetchCategories();
                          }}
                          type="button"
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-300"
                        >
                          Revert
                        </button>
                        <button
                          onClick={() => confirmDelete(category)}
                          type="button"
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
