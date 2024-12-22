import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import { Item } from "@prisma/client";
import { useSession } from "next-auth/react";

type CategoryProps = {
  cat_id: string;
  cat_name: string;
};

const Category = ({ cat_id, cat_name }: CategoryProps) => {
  const { status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/item/${cat_id}`); // API endpoint for fetching items by category
        const jsonData: Item[] = await response.json();
        setItems(jsonData);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [cat_id, status]);

  return (
    <div className="mb-8">
      {/* Category Title */}
      <h1 className="text-4xl font-bold font-rose text-[#e5a23d] px-8 py-4">
        {cat_name}
      </h1>

      {/* Items List */}
      {loading ? (
        <p className="text-center text-white">Loading items...</p>
      ) : items.length > 0 ? (
        <div className="flex">
          {items.map((item) => (
            <MealCard
              key={item.id}
              name={item.name}
              desc={item.desc}
              price={item.price.toString()}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No items available in this category.</p>
      )}
    </div>
  );
};

export default Category;
