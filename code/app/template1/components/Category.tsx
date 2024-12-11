import React, { useEffect } from "react";
import MealCard from "./MealCard";
import food from "@/app/template1/images/Soup.png";
import { Item } from "@prisma/client";
import { useSession } from "next-auth/react";

type CategoryProps = {
  cat_id: string;
};

const Category = ({ cat_id }: CategoryProps) => {
  const { status } = useSession();

  let item: Item[] = [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/item/${cat_id}`);
      const jsonData = await response.json();
      console.log("Item DATA: ", jsonData);
      item = jsonData;
      console.log("ITEMS FETCHED: ", item);
    };

    fetchData();
  }, [status]);
  console.log("CATEGORY PAGE FETCHED");
  return (
    <div>
      <h1 className="text-6xl font-bol font-rose text-[#e5a23d] px-8 py-0"></h1>
      <MealCard
        img={food}
        name="Sandwich"
        desc="This creamy soup is comforting, with a rich flavor profile."
        price="4.6"
      />
    </div>
  );
};

export default Category;
