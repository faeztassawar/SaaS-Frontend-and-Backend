"use client";
import DSearch from "@/app/template1/components/DSearch";
import { Category, Item } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

type ItemProps = {
  menuId: string;
  restaurantId: string;
};

const handleDelete = async (item: Item) => {
  try {
    const response = await fetch(`/api/items`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        categoryId: item.categoryId,
      }),
    });

    if (!response.ok) throw new Error("Failed to delete item");

    return response.json();
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

const ItemPage = ({ menuId, restaurantId }: ItemProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const categoriesRes = await fetch(`/api/categories/${menuId}`);
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);

      const itemsPromises = categoriesData.map((cat: Category) =>
        fetch(`/api/items/category/${cat.id}`).then((res) =>
          res.ok ? res.json() : []
        )
      );

      const allItems = (await Promise.all(itemsPromises)).flat();
      setItemsList(allItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [menuId]);

  const confirmDelete = (item: Item) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const proceedDelete = async () => {
    if (!itemToDelete) return;

    try {
      await handleDelete(itemToDelete);
      toast.success("Item deleted successfully!", {
        style: {
          background: "#172340",
          color: "#fff",
          border: "1px solid #283d6f",
          borderRadius: "12px",
        },
      });
      await fetchData();
    } catch {
      toast.error("Failed to delete item", {
        style: {
          background: "#450a0a",
          color: "#fff",
          border: "1px solid #7f1d1d",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  const pathName = `/restaurants/${restaurantId}/adminDashboard/items/add`;

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
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan={4} className="py-7 text-2xl font-bold">
                  Items
                </th>
              </tr>
              <tr className="flex justify-between p-4 border-b border-gray-600">
                <th className="text-xl font-semibold w-[25%] text-left">
                  Name
                </th>
                <th className="text-xl font-semibold w-[25%] text-center">
                  Price
                </th>
                <th className="text-xl font-semibold w-[25%] text-center">
                  Category
                </th>
                <th className="text-xl font-semibold w-[25%] text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsList.map((item) => (
                <tr
                  key={item.id}
                  className="flex justify-between p-4 hover:bg-[#283d6f] transition-colors"
                >
                  <td className="text-xl font-semibold w-[25%] truncate">
                    {item.name}
                  </td>
                  <td className="text-xl font-semibold w-[25%] text-center">
                    {item.price}
                  </td>
                  <td className="text-xl font-semibold w-[25%] text-center truncate">
                    {item.desc}
                  </td>
                  <td className="text-xl font-semibold w-[25%] text-right">
                    <button className="px-4 py-2 mx-2 hover:scale-110 transition-all bg-green-700 rounded">
                      <Link
                        className=""
                        href={`/restaurants/${restaurantId}/adminDashboard/items/edit/${item.id}`}
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      onClick={() => confirmDelete(item)}
                      className="px-4 py-2 hover:scale-110 bg-red-700 transition-all rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Transition.Root show={isDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDeleteOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#172340] border border-gray-600 p-6 text-white shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold mb-4">
                  Are you sure?
                </Dialog.Title>
                <Dialog.Description className="mb-6 text-gray-300">
                  You won't be able to revert this action!
                </Dialog.Description>
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    onClick={proceedDelete}
                  >
                    Yes, delete it
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ItemPage;
