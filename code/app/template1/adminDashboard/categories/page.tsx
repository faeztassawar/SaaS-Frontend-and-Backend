"use client";
import DSearch from "@/app/template1/components/DSearch";
import { Category } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

type CategoryProps = {
  menuId: string;
  restaurantId: string;
};

type ConfirmDialogState = {
  isOpen: boolean;
  category: Category | null;
};

const CategoriesPage = ({ menuId, restaurantId }: CategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    category: null,
  });

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

  const handleDelete = async (item: Category) => {
    try {
      const response = await fetch(`/api/categories`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, menuId: item.menuId }),
      });

      if (!response.ok) throw new Error("Failed to delete category");
      toast.success("Category deleted successfully!");
      await fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Delete error:", error);
    }
  };

  const handleArchive = async (item: Category) => {
    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, menuId: item.menuId }),
      });

      if (response.ok) {
        toast.success(
          item.isArchive
            ? "Category reverted successfully!"
            : "Category archived successfully!"
        );
        await fetchCategories();
      }
    } catch (error) {
      toast.error("Failed to update category");
      console.error("Archive/Revert error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [menuId]);

  const openDialog = (category: Category) => {
    setDialogState({ isOpen: true, category });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, category: null });
  };

  const confirmDelete = () => {
    if (dialogState.category) {
      handleDelete(dialogState.category);
      closeDialog();
    }
  };

  const archiveCategory = () => {
    if (dialogState.category) {
      handleArchive(dialogState.category);
      closeDialog();
    }
  };

  const pathName = `/restaurants/${restaurantId}/adminDashboard/categories/add`;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <DSearch placeholder="Search for a product .." />
        <Link
          href={pathName}
          className="px-4 py-2 bg-[#1c9cea] text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add new
        </Link>
      </div>

      {isLoading ? (
        <div className="w-full bg-[#172340] rounded-xl shadow-md min-h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-full bg-[#172340] rounded-xl shadow-md overflow-hidden">
          {/* Active Categories */}
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan={2} className="py-7 text-2xl font-bold">
                  CATEGORIES
                </th>
              </tr>
              <tr className="flex justify-between p-4 border-b border-gray-600">
                <th className="text-xl font-semibold w-[70%] text-left">
                  Name
                </th>
                <th className="text-xl font-semibold w-[30%] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) =>
                !item.isArchive ? (
                  <tr
                    key={item.id}
                    className="flex justify-between p-4 hover:bg-[#283d6f] transition-colors"
                  >
                    <td className="text-xl font-semibold w-[70%] truncate">
                      {item.name}
                    </td>
                    <td className="text-xl font-semibold w-[30%] text-right">
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() => openDialog(item)}
                          className="px-4 py-2 hover:scale-110 bg-red-700 transition-all rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>

          {/* Archived Categories */}
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan={2} className="py-7 text-2xl font-bold">
                  ARCHIVED CATEGORIES
                </th>
              </tr>
              <tr className="flex justify-between p-4 border-b border-gray-600">
                <th className="text-xl font-semibold w-[70%] text-left">
                  Name
                </th>
                <th className="text-xl font-semibold w-[30%] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) =>
                item.isArchive ? (
                  <tr
                    key={item.id}
                    className="flex justify-between p-4 hover:bg-[#283d6f] transition-colors"
                  >
                    <td className="text-xl font-semibold w-[70%] truncate">
                      {item.name}
                    </td>
                    <td className="text-xl font-semibold w-[30%] text-right">
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() => handleArchive(item)}
                          className="px-4 py-2 hover:scale-110 transition-all bg-green-700 rounded"
                        >
                          Revert
                        </button>
                        <button
                          onClick={() => openDialog(item)}
                          className="px-4 py-2 hover:scale-110 bg-red-700 transition-all rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Transition appear show={dialogState.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#172340] p-6 text-white shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-bold">
                    Are you sure?
                  </Dialog.Title>
                  <p className="mt-2 text-sm">
                    You won’t be able to revert this action.
                  </p>
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                      onClick={archiveCategory}
                    >
                      Archive
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                      onClick={closeDialog}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CategoriesPage;
