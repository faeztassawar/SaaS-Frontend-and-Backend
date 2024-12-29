import dynamic from "next/dynamic";

const getData = async (restaurant_id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurant_id}`
  );
  if (!res.ok) {
   // throw new Error("Failed!");
  }
  return res.json();
};

const loadTemplate = async (templateId: string) => {
  if (templateId === "1") return dynamic(() => import("@/app/template1/page"));
  if (templateId === "2") return dynamic(() => import("@/app/template2/page"));
  return dynamic(() => import("@/app/page"));
};

const page = async ({ params }: any) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getData(restaurant_id);
  console.log("OKOKOKOK", restaurant);
  // Dynamically load the template
  const Template = await loadTemplate(restaurant?.tempModel);

  // Pass the restaurant object to the template

  return <Template restaurant={restaurant} />;
};

export default page;
