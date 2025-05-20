"use client";

import React, { useEffect, useState, Fragment } from "react";
import Header from "@/app/template2/components/Header";
import UserTabs from "@/app/template2/components/UserTabs";
import Footer from "@/app/template2/components/Footer";
import { Category } from "@prisma/client";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";

type CatPageProps = {
  menuId: string;
  restaurantId: string;
};

export default function CategoriesPage({ menuId, restaurantId }: CatPageProps) {
  const [catName, setCatName] = useState<string>("");
  const [catImage, setCatImage] = useState<File>();
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

  const openModal = (cat: Category) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;
    try {
      await handleDelete(selectedCategory);
      toast.success("Category deleted successfully!", {
        position: "top-right",
        style: { background: "#172340", color: "#fff", border: "1px solid #283d6f", borderRadius: "12px" },
      });
      await fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category", {
        position: "top-right",
        style: { background: "#450a0a", color: "#fff", border: "1px solid #7f1d1d", borderRadius: "12px" },
      });
    }
    closeModal();
  };

  const handleArchiveConfirm = async () => {
    if (!selectedCategory) return;
    try {
      await handleArchive(selectedCategory);
      toast.success("Category archived successfully!", {
        position: "top-right",
        style: { background: "#172340", color: "#fff", border: "1px solid #283d6f", borderRadius: "12px" },
      });
      await fetchCategories();
    } catch (error) {
      toast.error("Failed to archive category", {
        position: "top-right",
        style: { background: "#450a0a", color: "#fff", border: "1px solid #7f1d1d", borderRadius: "12px" },
      });
    }
    closeModal();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", catName || "");
    formData.append("menuId", menuId);
    if (catImage) formData.append("image", catImage);

    const res = await fetch(`/api/categories`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) await fetchCategories();
  };

  const handleDelete = async (cat: Category) => {
    const response = await fetch(`/api/categories`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cat.id, menuId: cat.menuId }),
    });
    if (!response.ok) throw new Error("Failed to delete category");
    return response.json();
  };

  const handleArchive = async (cat: Category) => {
    const response = await fetch("/api/categories", {
      method: "PUT",
      body: JSON.stringify({ id: cat.id, menuId: cat.menuId }),
    });
    if (!response.ok) throw new Error("Failed to archive category");
    return response.json();
  };

  const handleReset = () => {
    setEditedCategory(null);
    setCatName("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header rest_id={restaurantId} />
      <div className="text-center mt-8 mb-12">
        <UserTabs restaurant_id={restaurantId} />
      </div>

      <div className="flex grow flex-col items-center justify-center">
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
                <button className="bg-[#F13A01] text-white px-4 py-2 rounded-full" type="submit" onClick={handleSubmit}>
                  Create
                </button>
                <button type="button" className="bg-[#F13A01] text-white px-4 py-2 rounded-full" onClick={handleReset}>
                  Cancel
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-sm text-gray-500 mb-3">Existing Categories</h2>
            {categories.map((category) =>
              !category.isArchive ? (
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
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => openModal(category)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : null
            )}

            <h2 className="text-sm text-gray-500 mb-3">Archived Categories</h2>
            {categories.map((category) =>
              category.isArchive ? (
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
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Revert
                    </button>
                    <button
                      onClick={() => openModal(category)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      <Footer restaurant_id={restaurantId} />

      {/* Modal */}
      <Transition show={isModalOpen} as={Fragment}>
        <Dialog onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="scale-95 opacity-0" enterTo="scale-100 opacity-100"
            leave="ease-in duration-200" leaveFrom="scale-100 opacity-100" leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-[#172340] text-white p-6 rounded-xl shadow-xl max-w-md w-full">
              <Dialog.Title className="text-2xl font-bold mb-2">Are you sure?</Dialog.Title>
              <Dialog.Description className="mb-6 text-sm">You won’t be able to revert this!</Dialog.Description>
              <div className="flex justify-end gap-3">
                <button onClick={handleArchiveConfirm} className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700">
                  Archive it
                </button>
                <button onClick={handleDeleteConfirm} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
                  Delete
                </button>
                <button onClick={closeModal} className="bg-gray-400 px-4 py-2 rounded-md hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
