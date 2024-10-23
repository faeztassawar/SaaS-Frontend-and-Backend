import React from "react";
import MealCard from "./MealCard";
import food from "@/app/template1/images/Soup.png";

type CategoryProps = {
  cat: string;
};

const Category = ({ cat }: CategoryProps) => {
  return (
    <div>
      <h1 className="text-6xl font-bol font-rose text-[#e5a23d] px-8 py-0">
        {cat}
      </h1>
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
