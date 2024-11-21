import React from "react";
import dynamic from "next/dynamic";

const getData = async (restaurant_id: String) => {
  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurant_id}`
  );
  console.log(restaurant_id, "in get data");
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const loadTemplate = async (restaurant_id: string) => {
  const restaurant = await getData(restaurant_id);
  if (restaurant?.templateId === "1")
    return dynamic(() => import("@/app/template1/page"));
  if (restaurant?.templateId === "2")
    return dynamic(() => import("@/app/template2/page"));
  return dynamic(() => import("@/app/page"));
};

const page = async ({ params }: any) => {
  const { restaurant_id } = params;
  const Template = await loadTemplate(restaurant_id);
  return <Template />;
};

export default page;
