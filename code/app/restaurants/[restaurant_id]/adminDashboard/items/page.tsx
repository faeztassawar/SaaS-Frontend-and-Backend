import { Category, Item } from "@prisma/client";
import dynamic from "next/dynamic";

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
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const getItems = async (category_id: string) => {
  const res = await fetch(`http://localhost:3000/api/items/${category_id}`);
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const loadTemplate = async (templateId: string) => {
  if (templateId === "1")
    return dynamic(() => import("@/app/template1/adminDashboard/items/page"));
  return dynamic(() => import("@/app/page"));
};

const page = async ({ params }: never) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getData(restaurant_id);
  const menu = await getMenu(restaurant_id);

  const cats = await getCategories(menu.id);
  console.log("CATS: ", cats);
  const Template = await loadTemplate(restaurant?.tempModel);

  let items: Item[] = cats.map((item: Category) => getItems(item.id));
  // Pass the restaurant object to the template
  return <Template items={items} />;
};

export default page;
