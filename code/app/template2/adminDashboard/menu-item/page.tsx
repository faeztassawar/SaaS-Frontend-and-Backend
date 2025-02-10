"use client";

import Image from "next/image";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { Category, Item } from "@prisma/client";
import { useEffect, useState } from "react";

interface Template2ItemsPageProps {
  restaurantId: string;
  menuId: string;
}

const Template2ItemsPage: React.FC<Template2ItemsPageProps> = ({
  restaurantId,
  menuId,
}) => {
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
  return (
    <div className="min-h-screen">
      <Header isAdmin={true} />
      <div className="text-center mt-12 mb-12">
        <UserTabs isAdmin={true} restaurant_id="" />
      </div>
      <section className="bg-gray-50 max-w-2xl mx-auto p-2 shadow-2xl">
        <div className="mt-2 flex justify-center items-center">
          <Link href={`/restaurants/${restaurantId}/adminDashboard/items/add`}>
            <button className="flex justify-center items-center gap-2 text-center bg-[#800000] border text-white font-semibold rounded-xl px-6 py-2">
              Create New Menu Item
              <FaAngleRight size={20} />
            </button>
          </Link>
        </div>

        <div>
          <h2 className="text-sm text-gray-700 mt-8 mb-3 px-2">
            Edit Menu Item:
          </h2>
          <div className="grid grid-cols-3 gap-2 p-2">
            {itemsList.map((item) => (
              <Link
                key={item.id}
                href={`/restaurants/${restaurantId}/adminDashboard/items/edit`}
                className="bg-gray-300 rounded-lg p-4 hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
                aria-label={`Edit ${item.name}`}
              >
                <div className="relative">
                  <image
                    className="rounded-md"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center font-semibold text-lg">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Template2ItemsPage;
