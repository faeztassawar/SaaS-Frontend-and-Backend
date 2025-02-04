import dynamic from "next/dynamic";
import { ComponentType } from "react";

const getData = async (restaurant_id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurant_id}`
  );
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

// Define the expected prop type for templates
interface TemplateProps {
  restaurant_id: string;
}

// Use `ComponentType<TemplateProps>` to ensure correct prop inference
const loadTemplate = async (templateId: string): Promise<ComponentType<TemplateProps>> => {
  if (templateId === "1") return (await import("@/app/template1/editProfile/page")).default;
  if (templateId === "2") return (await import("@/app/template2/editProfile/page")).default;
  return (await import("@/app/page")).default;
};

const Page = async ({ params }: { params: { restaurant_id: string } }) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getData(restaurant_id);
  console.log("RESTAURANT DATA", restaurant);

  // Dynamically load the template
  const Template = await loadTemplate(restaurant?.tempModel);

  return <Template restaurant_id={restaurant_id} />;
};

export default Page;
