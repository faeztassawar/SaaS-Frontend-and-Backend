"use client";

import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { Category, Item } from "@prisma/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Template2ItemsPageProps {
  restaurantId: string;
  menuId: string;
}

const convertImage = (image: string | Uint8Array): string | null => {
  if (typeof image === "string") {
    return image; // If it's already a URL, return it
  }

  if (image instanceof Uint8Array) {
    const base64String = Buffer.from(image).toString("base64");
    return `data:image/png;base64,${base64String}`; // Change MIME type if necessary
  }

  return null;
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

const Template2ItemsPage = ({
  restaurantId,
  menuId,
}: Template2ItemsPageProps) => {
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
            return itemsData;
          } else {
            console.error(`Failed to fetch items for category ${cat.id}`);
            return [];
          }
        });

        const allItems = (await Promise.all(itemsPromises)).flat();
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={true} />

      <div className="text-center mt-12 mb-12">
        <UserTabs restaurant_id={restaurantId} />
      </div>

      <section className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        {/* Create New Menu Button */}
        <div className="flex justify-center items-center mb-6">
          <Link href={`/restaurants/${restaurantId}/adminDashboard/items/add`}>
            <button className="flex items-center gap-3 text-center bg-[#800000] text-white font-semibold rounded-lg px-6 py-2 transition-transform hover:scale-105 shadow-md">
              Create New Menu Item
              <FaAngleRight size={20} />
            </button>
          </Link>
        </div>

        {/* Edit Menu Items */}
        <h2 className="text-lg text-gray-700 mt-6 mb-3 px-2 font-semibold">
          Edit Menu Item:
        </h2>
        <div className="flex flex-col gap-4">
          {itemsList.map((item) => {
            const category = categories.find(
              (cat) => cat.id === item.categoryId
            );
            return (
              <div
                key={item.id}
                className="bg-gray-200 hover:bg-gray-100 transition-all rounded-lg shadow-sm p-4 flex items-center justify-between border-l-4 border-red-500"
              >
                {/* Item Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    Category: {category ? category.name : "Uncategorized"}
                  </p>
                  <p className="text-gray-800 font-bold">${item.price}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => confirmDelete(item)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Template2ItemsPage;
