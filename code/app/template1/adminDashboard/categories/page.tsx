"use client";
import DSearch from "@/app/template1/components/DSearch";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-hot-toast";

const MySwal = withReactContent(Swal);

type CategoryProps = {
  menuId: string;
  restaurantId: string;
};

const handleDelete = async (item: Category) => {
  try {
    const response = await fetch(`/api/categories`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        menuId: item.menuId,
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

const CategoriesPage = ({ menuId, restaurantId }: CategoryProps) => {
  const router = useRouter();
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

  const confirmDelete = async (item: Category) => {
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
      }
    });
  };
  const pathName = `/restaurants/${restaurantId}/adminDashboard/categories/add`;

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
              {categories?.map((item) => (
                <tr
                  key={item.id}
                  className="flex justify-between p-4 hover:bg-[#283d6f] transition-colors"
                >
                  <td className="text-xl font-semibold w-[70%] truncate">
                    {item.name}
                  </td>
                  <td className="text-xl font-semibold w-[30%] text-right">
                    <div className="flex gap-4 justify-end">
                      <button className="px-4 py-2 hover:scale-110 transition-all bg-green-700 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(item)}
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

export default CategoriesPage;
