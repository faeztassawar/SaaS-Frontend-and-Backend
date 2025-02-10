"use client"

import Image from "next/image"
import Header from "@/app/template2/components/Header"
import Footer from "@/app/template2/components/Footer"
import UserTabs from "@/app/template2/components/UserTabs"
import { FaAngleRight } from "react-icons/fa"
import Link from "next/link"
import { Category,Item } from "@prisma/client"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Template2ItemsPageProps {
  restaurantId: string
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

const Template2ItemsPage = ({ restaurantId, menuId }: Template2ItemsPageProps) => {

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
      <div className="min-h-screen">
        <Header isAdmin={true} />
        <div className="text-center mt-12 mb-12">
          <UserTabs isAdmin={true} restaurant_id="" />
        </div>
        <section className="bg-gray-50 max-w-4xl mx-auto p-4 shadow-2xl">
          {/* Create New Menu Button */}
          <div className="mt-2 flex justify-center items-center">
            <Link href={`/restaurants/${restaurantId}/adminDashboard/items/add`}>
              <button className="flex justify-center items-center gap-2 text-center bg-[#800000] border text-white font-semibold rounded-xl px-6 py-2">
                Create New Menu Item
                <FaAngleRight size={20} />
              </button>
            </Link>
          </div>
  
          {/* Edit Menu Items */}
          <h2 className="text-sm text-gray-700 mt-8 mb-3 px-2">Edit Menu Item:</h2>
          <div className="flex flex-col gap-4 p-2">
            {itemsList.map((item) => (
              <Link
                key={item.id}
                href={`/restaurants/${restaurantId}/adminDashboard/items/edit`}
                className="bg-gray-300 rounded-lg p-4 hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
                aria-label={`Edit ${item.name}`}
              >
                {/* Flex container for horizontal alignment */}
                <div className="flex items-center justify-between p-4">
                  {/* Item Details */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
  
                  {/* Edit Button */}
                  <button className="bg-[#800000] text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    );
  };    

export default Template2ItemsPage

