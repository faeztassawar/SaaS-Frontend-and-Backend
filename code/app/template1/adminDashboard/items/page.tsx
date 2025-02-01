"use client";
import DSearch from "@/app/template1/components/DSearch";
import { Category, Item } from "@prisma/client";
import { Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }

    return response.json();
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};
const MySwal = withReactContent(Swal);

const ItemPage = ({ menuId, restaurantId }: ItemProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const categoriesRes = await fetch(
        `http://localhost:3000/api/categories/${menuId}`
      );

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log("Categories Data:", categoriesData);
        setCategories(categoriesData);

        const itemsPromises = categoriesData.map(async (cat: Category) => {
          const itemsRes = await fetch(
            `http://localhost:3000/api/items/${cat.id}`
          );
          if (itemsRes.ok) {
            const itemsData = await itemsRes.json();
            console.log(`Items for Category ${cat.id}:`, itemsData);
            return itemsData;
          } else {
            console.error(`Failed to fetch items for category ${cat.id}`);
            return [];
          }
        });

        const allItems = (await Promise.all(itemsPromises)).flat();
        console.log("All Items:", allItems);
        setItemsList(allItems);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [menuId]);
  const confirmDelete = async (item: Item) => {
    MySwal.fire({
      title: <p className="text-2xl">Are you sure?</p>,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#172340",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border-gray-600",
        confirmButton: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg",
        cancelButton: "bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg mr-3",
      },
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await handleDelete(item);
          toast.success("Category deleted successfully!", {
            position: "top-right",
            style: {
              background: "#172340",
              color: "#fff",
              border: "1px solid #283d6f",
              borderRadius: "12px",
            },
          });
          await fetchData();
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
      }
    });
  };
  console.log("ITems: ", itemsList);
  console.log("Cats: ", categories);
  const pathName = `/restaurants/${restaurantId}/adminDashboard/items/add`;
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <DSearch placeholder="Search for a product .." />
        <Link href="/template1/adminDashboard/products/add">
          <Link
            href={pathName}
            className="px-4 py-2 bg-[#1c9cea] text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add new
          </Link>
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
              {itemsList?.map((item) => (
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
                    <div className="flex gap-4 justify-end">
                      <button className="px-4 py-2 hover:scale-110 transition-all bg-green-700 rounded">
                        View
                      </button>
                      <button
                        onClick={() => {
                          confirmDelete(item);
                        }}
                        className="px-4 py-2 hover:scale-110 bg-red-700 transition-all rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
