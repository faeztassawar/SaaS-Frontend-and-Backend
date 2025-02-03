import dynamic from "next/dynamic";

const getRest = async (restaurant_id: string) => {
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

const loadTemplate = async (templateId: string) => {
  if (templateId === "1")
    return dynamic(() => import("@/app/template1/categories/page"));
  if (templateId === "2")
    return dynamic(
      () => import("@/app/template2/adminDashboard/categories/page")
    );
  return dynamic(() => import("@/app/page"));
};

const page = async ({ params }: never) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getRest(restaurant_id);
  const menu = await getMenu(restaurant_id);

  // Dynamically load the template
  const Template = await loadTemplate(restaurant?.tempModel);

  // Pass the restaurant object to the template
  return (
    <Template
      id={menu.id}
      restaurantName={restaurant.name}
      restaurant_id={menu.restaurant_id}
    />
  );
};

export default page;
