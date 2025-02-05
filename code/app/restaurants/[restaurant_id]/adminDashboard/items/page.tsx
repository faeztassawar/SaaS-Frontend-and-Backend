import { Category } from "@prisma/client";
import dynamic from "next/dynamic";

const getData = async (restaurant_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/restaurant/${restaurant_id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch restaurant data: ${res.status}`);
    }
    const data = await res.json();
    console.log("Restaurant data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    throw error;
  }
};

const getMenu = async (restaurant_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/menu/${restaurant_id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch menu data: ${res.status}`);
    }
    const data = await res.json();
    console.log("Menu data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error;
  }
};

const getCategories = async (menu_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/categories/${menu_id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch categories data: ${res.status}`);
    }
    const data = await res.json();
    console.log("Categories data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories data:", error);
    throw error;
  }
};

const getItems = async (category_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/items/${category_id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch items data: ${res.status}`);
    }
    const data = await res.json();
    console.log("Items data fetched for category", category_id, ":", data);
    return data;
  } catch (error) {
    console.error("Error fetching items data for category", category_id, ":", error);
    throw error;
  }
};

const loadTemplate = async (templateId: string) => {
  console.log("Loading template with ID:", templateId);
  
  if (!templateId) {
    console.error("No template ID provided");
    throw new Error("Template ID is required");
  }

  if (templateId === "1") {
    console.log("Loading template 1");
    return dynamic(() => import("@/app/template1/adminDashboard/items/page"));
  }
  if (templateId === "2") {
    console.log("Loading template 2");
    return dynamic(() => import("@/app/template2/adminDashboard/menu-item/page"));
  }
  
  console.error("Invalid template ID:", templateId);
  throw new Error(`Invalid template ID: ${templateId}`);
};

const Page = async ({ params }: { params: { restaurant_id: string } }) => {
  const { restaurant_id } = params;
  console.log("Restaurant ID:", restaurant_id);

  try {
    // Fetch restaurant data
    const restaurant = await getData(restaurant_id);
    console.log("Restaurant template model:", restaurant?.tempModel);
    
    if (!restaurant?.tempModel) {
      throw new Error("No template model found for restaurant");
    }

    const menu = await getMenu(restaurant_id);
    if (!menu?.id) {
      throw new Error("No menu found for restaurant");
    }

    const cats = await getCategories(menu.id);
    if (!Array.isArray(cats)) {
      throw new Error("Invalid categories data received");
    }

    const Template = await loadTemplate(restaurant.tempModel);
    
    const itemsPromises = cats.map(async (cat: Category) => {
      const items = await getItems(cat.id);
      return items;
    });
    
    const items = (await Promise.all(itemsPromises)).flat();
    console.log("Total items loaded:", items.length);

    return (
      <Template 
        restaurantId={restaurant_id} 
        menuId={menu.id} 
        categories={cats} 
        items={items}
      />
    );
  } catch (error) {
    console.error("Error in page component:", error);
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-gray-700">
          {error instanceof Error ? error.message : "An unexpected error occurred"}
        </p>
      </div>
    );
  }
};

export default Page;