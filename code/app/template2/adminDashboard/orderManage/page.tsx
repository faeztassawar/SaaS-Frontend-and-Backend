"use client"
import Footer from "@/app/template2/components/Footer";
import Header from "@/app/template2/components/Header";
import UserTabs from "@/app/template2/components/UserTabs";
import OrderRequest from "@/app/template2/components/OrderRequest";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface OrderProps
{
  restaurant_id: string;
}

type Order = {
  id: string;
  name: string;
  email: string;
  city: string;
  phno: string;
  address: string;
  status: string;
  restaurantCustomerId: string;
  totalPrice?: string;
};

const OrderManage = ({restaurant_id}: OrderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const initialFetchDone = useRef(false);

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
          const response = await fetch(`/api/session/restaurant/${session.user.email}`);
          if (!response.ok) throw new Error("Failed to fetch restaurant ID");
          const data = await response.json();
          setRestaurantId(data.restaurant_id);
        } catch (error) {
          console.error("Error fetching user restaurant ID:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserRestaurantId();
    }
  }, [session, status]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (restaurantId && !initialFetchDone.current) {
        try {
          setIsLoading(true);
          const res = await fetch(`/api/Orders?restaurant_id=${restaurantId}`);
          if (!res.ok) throw new Error("Failed to fetch orders");
          const data = await res.json();
          setOrders(data);
          initialFetchDone.current = true;
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrders();
  }, [restaurantId]);

  const handleOrderUpdate = async (orderId: string, newStatus: string) => {
    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );

      let updatedOrder;
      
      if (newStatus === "CANCELLED") {
        const res = await fetch("/api/cancelOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId: orderId }),
        });
        if (!res.ok) throw new Error("Failed to cancel order");
        updatedOrder = await res.json();
      } else {
        const res = await fetch("/api/orders", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: orderId, status: newStatus }),
        });
        if (!res.ok) throw new Error(`Failed to update order status to ${newStatus}`);
        updatedOrder = await res.json();
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const acceptedOrders = orders.filter((order) => order.status === "ACCEPTED");
  const cancelledOrders = orders.filter((order) => order.status === "CANCELLED");
  const progressOrders = orders.filter((order) => order.status === "IN PROGRESS");

  return (
    <div>
      <Header rest_id={restaurant_id}/>
      <UserTabs restaurant_id={restaurant_id} />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <section>
              <h3 className="text-xl font-medium mb-2">Pending Orders</h3>
              {pendingOrders.map((order) => (
                <OrderRequest key={order.id} order={order} onUpdateStatus={handleOrderUpdate} />
              ))}
            </section>
            <section>
              <h3 className="text-xl font-medium mt-4 mb-2">Accepted Orders</h3>
              {acceptedOrders.map((order) => (
                <OrderRequest key={order.id} order={order} onUpdateStatus={handleOrderUpdate} />
              ))}
            </section>
            <section>
              <h3 className="text-xl font-medium mt-4 mb-2">Orders In Progress</h3>
              {progressOrders.map((order) => (
                <OrderRequest key={order.id} order={order} onUpdateStatus={handleOrderUpdate} />
              ))}
            </section>
            <section>
              <h3 className="text-xl font-medium mt-4 mb-2">Cancelled Orders</h3>
              {cancelledOrders.map((order) => (
                <OrderRequest key={order.id} order={order} onUpdateStatus={handleOrderUpdate} />
              ))}
            </section>
          </>
        )}
      </div>
      <Footer restaurant_id={restaurant_id} />
    </div>
  );
};

export default OrderManage;
