"use client";

import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ItemModal from "../components/ItemModal";
import Footer from "../components/Footer";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";

interface MenuItemType {
  id: string;
  name: string;
  desc: string;
  price: string;
  category_id: string;
}

interface Restaurant {
  restaurant_id: string;
  name: string;
  about_us: string;
  cuisine: string;
  desc: string;
  phone: string;
}

export default function MenuPage({ restaurant }: { restaurant?: Restaurant }) {
  useEffect(() => {
    if (restaurant?.restaurant_id) {
      document.cookie = `id=${restaurant.restaurant_id}`;
    }
  }, [restaurant?.restaurant_id]);

  const { status } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<
    Record<string, MenuItemType[]>
  >({});
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  // Fetch Categories and Items
  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch(
          `/api/categories/${restaurant?.restaurant_id}`
        );
        if (!categoryResponse.ok) throw new Error("Failed to fetch categories");

        const categoryData: Category[] = await categoryResponse.json();
        setCategories(categoryData);
        console.log("TEMPLATE 2 CATEGORIES:", categoryData);

        // Fetch items for each category
        const itemsPromises = categoryData.map(async (category) => {
          const itemResponse = await fetch(`/api/item/${category.id}`);
          if (!itemResponse.ok) {
            throw new Error(
              `Failed to fetch items for category ${category.id}`
            );
          }

          const itemData: MenuItemType[] = await itemResponse.json();
          console.log("Fetched items:", {
            categoryId: category.id,
            items: itemData,
          });
          return { categoryId: category.id, items: itemData };
        });

        const itemsData = await Promise.all(itemsPromises);

        // Group items by category
        const groupedItems: Record<string, MenuItemType[]> = {};
        itemsData.forEach(({ categoryId, items }) => {
          groupedItems[categoryId] = items;
        });

        setItemsByCategory(groupedItems);
      } catch (error) {
        console.error("Error fetching categories or items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchCategoriesAndItems();
    }
  }, [restaurant?.restaurant_id, status]);

  const handleAddToCart = (itemName: string) => {
    toast.success(`${itemName} has been added to the cart`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleItemClick = (item: MenuItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div
        className={`${isModalOpen ? "blur-sm" : ""} transition duration-300`}
      >
        <Header
          rest_id={restaurant?.restaurant_id || ""}
          rest_name={restaurant?.name || ""}
        />

        {/* Menu Sections */}
        <section className="mt-8">
          {categories.map((category) => (
            <div key={category.id} className="mb-12">
              {/* Section Header */}
              <SectionHeader mainHeader={category.name} subHeader="" />

              {/* Items in the Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 mt-10 max-w-7xl mx-auto px-4">
                {itemsByCategory[category.id]?.map((item) => (
                  <MenuItem
                    key={item.id}
                    name={item.name}
                    desc={item.desc}
                    price={item.price}
                    onClick={() => handleItemClick(item)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Item Modal */}
      {isModalOpen && selectedItem && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <ItemModal
              item={selectedItem}
              onClose={closeModal}
              onAddToCart={handleAddToCart}
            />
          </div>
        </>
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
}
