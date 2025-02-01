import dynamic from "next/dynamic";

const getData = async (restaurant_id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurant_id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch restaurant data!");
  }
  return res.json();
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurant_id: string };
}) {
  const { restaurant_id } = params;

  const restaurant = await getData(restaurant_id);

  const TemplateLayout = dynamic(() => {
    if (restaurant.tempModel === "1") {
      return import("@/app/template1/adminDashboard/layout");
    }
    return import("@/app/page");
  });

  // Wrap children with the dynamic layout
  return (
    <TemplateLayout restaurant_id={restaurant_id}>{children}</TemplateLayout>
  );
}
