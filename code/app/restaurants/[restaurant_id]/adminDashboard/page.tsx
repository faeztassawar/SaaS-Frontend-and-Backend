import dynamic from "next/dynamic";

// Define the props interface for dynamically loaded components
interface TemplateProps {
  restaurant_id: string;
}

// Function to fetch restaurant data
const getData = async (restaurant_id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurant_id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch restaurant data!");
  }
  return res.json();
};

// Function to dynamically load the appropriate template
const loadTemplate = async (templateId: string) => {
  if (templateId === "1") {
    return dynamic<TemplateProps>(() =>
      import("@/app/template1/adminDashboard/page").then((mod) => mod.default)
    );
  }
  return dynamic<TemplateProps>(() =>
    import("@/app/template2/adminDashboard/users/page").then((mod) => mod.default)
  );
};

// Main page component
const Page = async ({ params }: { params: { restaurant_id: string } }) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getData(restaurant_id);

  // Dynamically load the correct template
  const Template = await loadTemplate(restaurant?.tempModel);

  // Pass restaurant_id as a prop to the template
  return <Template restaurant_id={restaurant_id} />;
};

export default Page;
