import dynamic from "next/dynamic";
import type { Category } from "@prisma/client"

const getData = async (restaurant_id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurant_id}`
  );
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const getMenu = async (restaurant_id: string) => {
  const res = await fetch(`http://localhost:3000/api/menu/${restaurant_id}`);
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const getCategories = async (menu_id: string) => {
  const res = await fetch(`http://localhost:3000/api/categories/${menu_id}`);
  return res.json();
};

const loadTemplate = async (templateId: string) => {
  if (templateId === "1")
    return dynamic(
      () => import("@/app/template1/adminDashboard/categories/page")
    );
    if (templateId === "2")
      return dynamic(
        () => import("@/app/template2/adminDashboard/categories/page")
      );
  return dynamic(() => import("@/app/page"));
};

const Page = async ({ params }: { params: { restaurant_id: string } }) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getData(restaurant_id);
  const menu = await getMenu(restaurant_id);

  const cats = await getCategories(menu.id);
  console.log("CATS: ", cats);
  const Template = await loadTemplate(restaurant?.tempModel);

  // Pass the restaurant object to the template
  return <Template restaurantId={restaurant_id} menuId={menu.id} />;
};

export default Page;
