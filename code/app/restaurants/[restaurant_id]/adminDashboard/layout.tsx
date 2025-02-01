import { Suspense } from "react";
import dynamic from "next/dynamic";

interface PageParams {
  children: React.ReactNode;
  params: { restaurant_id: string };
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

const getData = async (restaurant_id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/restaurant/${restaurant_id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch restaurant data");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    throw error;
  }
};

export default async function Layout({ children, params }: PageParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const restaurant_id = resolvedParams.restaurant_id;

    if (!restaurant_id) {
      return <ErrorFallback error={new Error("Restaurant ID is required")} />;
    }

    const restaurant = await getData(restaurant_id);
    console.log("Using Restaurant ID in Layout:", restaurant_id);

    const TemplateLayout = dynamic<{ children: React.ReactNode; restaurant_id: string }>(
      () => {
        if (restaurant?.tempModel === "1") {
          return import("@/app/template1/adminDashboard/layout").then(mod => mod.default);
        }
        return import("@/app/page").then(mod => mod.default);
      },
      {
        loading: () => <LoadingFallback />,
      }
    );

    return (
      <Suspense fallback={<LoadingFallback />}>
        <TemplateLayout restaurant_id={restaurant_id}>{children}</TemplateLayout>
      </Suspense>
    );
  } catch (error) {
    console.error("Layout error:", error);
    return <ErrorFallback error={error as Error} />;
  }
}