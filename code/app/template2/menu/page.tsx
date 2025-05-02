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
  image: string;
}

interface MenuProps {
  id: string;
  restaurant_id: string;
}

const getImageUrl = (
  img: Uint8Array | { type: "Buffer"; data: number[] } | string
) => {
  if (typeof img === "object" && img !== null) {
    if (!("type" in img)) {
      const byteArray = Object.values(img);
      return `data:image/jpeg;base64,${Buffer.from(byteArray).toString(
        "base64"
      )}`;
    }

    if (img.type === "Buffer") {
      return `data:image/jpeg;base64,${Buffer.from(img.data).toString(
        "base64"
      )}`;
    }
  }
  if (img instanceof Uint8Array) {
    return `data:image/jpeg;base64,${Buffer.from(img).toString("base64")}`;
  }
  return typeof img === "string" ? img : null;
};

export default function MenuPage({ id, restaurant_id }: MenuProps) {
  const { data, status } = useSession();
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
        const categoryResponse = await fetch(`/api/categories/${id}`);
        if (!categoryResponse.ok) throw new Error("Failed to fetch categories");

        const categoryData: Category[] = await categoryResponse.json();
        setCategories(categoryData);
        // Fetch items for each category
        const itemsPromises = categoryData.map(async (category) => {
          const itemResponse = await fetch(
            `/api/items/category/${category.id}`
          );
          if (!itemResponse.ok) {
            throw new Error(
              `Failed to fetch items for category ${category.id}`
            );
          }
          const itemData: MenuItemType[] = await itemResponse.json();
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
  }, [id, status]);

  const handleAddToCart = async (item: MenuItemType) => {
    const addToCart = await fetch(`/api/cart/${data?.user?.email}`, {
      method: "post",
      body: JSON.stringify({
        item_id: item.id,
      }),
    });
    if (addToCart.ok) {
      toast.success(`${item.name} has been added to the cart`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleItemClick = (item: MenuItemType) => {
    let image = item.image;

    if (image && typeof image === "object" && !("type" in image)) {
      const byteArray = new Uint8Array(Object.values(image) as number[]);
      image = `data:image/jpeg;base64,${Buffer.from(byteArray).toString(
        "base64"
      )}`;

      setSelectedItem({ ...item, image });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div
        className={`${isModalOpen ? "blur-sm" : ""} transition duration-300`}
      >
        <Header rest_id={restaurant_id} rest_name="Menu" />

        {/* Menu Sections */}
        <section className="mt-8">
          {categories.map((category) =>
            !category.isArchive ? (
              <div key={category.id} className="mb-12">
                {/* Centered Category Name */}
                <div className="text-center mb-6">
                  <SectionHeader mainHeader={category.name} subHeader="" />
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 max-w-7xl mx-auto px-4">
                  {itemsByCategory[category.id]?.map((item) => (
                    <MenuItem
                      key={item.id}
                      name={item.name}
                      desc={item.desc}
                      price={item.price}
                      img={item.image}
                      onClick={() => handleItemClick(item)}
                      onAddToCart={async () => {
                        await handleAddToCart(item);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
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
              onAddToCart={async () => {
                await handleAddToCart(selectedItem);
              }}
            />
          </div>
        </>
      )}

      <ToastContainer />
      <Footer restaurant_id={restaurant_id} />
    </div>
  );
}
