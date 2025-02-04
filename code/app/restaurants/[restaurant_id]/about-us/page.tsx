import dynamic from "next/dynamic"

const getRest = async (restaurant_id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  const res = await fetch(`${apiUrl}/api/restaurant/${restaurant_id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch restaurant data")
  }
  return res.json()
}

const loadTemplate = async (templateId: string) => {
  if (templateId === "1") return dynamic(() => import("@/app/template1/aboutUs/page"))
  else if (templateId === "2") return dynamic(() => import("@/app/template2/AboutUs/page"))
  return dynamic(() => import("@/app/page"))
}

export default async function AboutUsPage({ params }: { params: { restaurant_id: string } }) {
  const { restaurant_id } = params

  // Fetch restaurant data
  const restaurant = await getRest(restaurant_id)

  // Dynamically load the template
  const Template = await loadTemplate(restaurant?.tempModel)

  // Pass the restaurant object to the template
  return <Template restaurant_id={restaurant_id} name={restaurant.name} />
}

