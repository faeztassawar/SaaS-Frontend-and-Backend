import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserTabs from "../components/UserTabs";
import OrderRequest from "../components/OrderRequest";

const OrderManage = () => {
  return (
    <div className="min-h-screen">
      <Header isAdmin={true}  />
      <div className="mt-12">
        <UserTabs isAdmin={true} />
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
