import prisma from "@/lib/connect";
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

const getUsers = async (restaurant_id: string) => {
  const res = await prisma.restaurantCustomer.findMany({
    where: {
      restaurant_id: restaurant_id,
    },
  });
  return res;
};

const loadTemplate = async (templateId: string) => {
  if (templateId === "1")
    return dynamic(() => import("@/app/template1/adminDashboard/users/page"));
  if (templateId === "2")
    return dynamic(() => import("@/app/template2/adminDashboard/users/page"));
  return dynamic(() => import("@/app/page"));
};

const page = async ({ params }: never) => {
  const { restaurant_id } = params;
  const restaurant = await getData(restaurant_id);

  const RestaurantUsers = await getUsers(restaurant_id);

  // Dynamically load the template
  const Template = await loadTemplate(restaurant?.tempModel);
  console.log("USers are: ", RestaurantUsers);
  // Pass the restaurant object to the template
  return <Template restaurantId={restaurant_id} users={RestaurantUsers} />;
};

export default page;
