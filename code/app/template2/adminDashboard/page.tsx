"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserTabs from "../components/UserTabs";

export default function UserPage() {
  const [] = useState(true);
  const [restaurant_id, setRestaurantId] = useState(""); // Ensure it's a string

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserRestaurantId = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(
            `/api/session/restaurant/${session.user.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch restaurant ID");
          }
          const data = await response.json();
          if (data?.restaurant_id) {
            setRestaurantId(data.restaurant_id);
          }
        } catch (error) {
          console.error("Error fetching user restaurant ID:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserRestaurantId();
    }
  }, [session, status]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass only when restaurant_id is available */}
      {restaurant_id && <Header rest_id={restaurant_id} rest_name="Admin Dashboard" />}
      
      <div className="text-center mt-8 mb-12">
        <UserTabs restaurant_id={restaurant_id} />
      </div>

      <Footer />
    </div>
  );
}