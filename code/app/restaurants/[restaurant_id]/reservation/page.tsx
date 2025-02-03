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

const getReservations = async (restaurant_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/reservations/${restaurant_id}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return null;
  }
};

const loadTemplate = async (templateId: string) => {
  if (templateId === "1")
    return dynamic(() => import("@/app/template1/reservation/page"));
  return dynamic(() => import("@/app/page"));
};

const page = async ({ params }: never) => {
  const { restaurant_id } = params;

  // Fetch restaurant data
  const restaurant = await getRest(restaurant_id);
  const reservations = await getReservations(restaurant_id);

  // Dynamically load the template
  const Template = await loadTemplate(restaurant?.tempModel);

  // Pass the restaurant object to the template
  return (
    <Template
      id={reservations.id}
      name={restaurant.name}
      restaurant_id={reservations.restaurant_id}
    />
  );
};

export default page;
