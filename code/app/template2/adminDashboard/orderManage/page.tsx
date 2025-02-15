import React from "react";
import Footer from "@/app/template2/components/Footer";
import Header from "@/app/template2/components/Header";
import UserTabs from "@/app/template2/components/UserTabs";
import OrderRequest from "@/app/template2/components/OrderRequest";

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


const OrderManage = () => {
  return (
    <div className="min-h-screen">
      <Header isAdmin={true}  />
      <div className="mt-12">
      <UserTabs restaurant_id="" isAdmin={true} />
      </div>

      <div className="bg-gray-50 max-w-3xl mx-auto mt-10">
        <div className="mt-8">
          <OrderRequest />
          <OrderRequest />
          <OrderRequest />
          <OrderRequest />
          <OrderRequest />
          <OrderRequest />
          <OrderRequest />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderManage;
