"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UserTabs from "../components/UserTabs";
import OrdersRecord from "../components/OrdersRecord";


const Orders = () => {
  return (
    <div className="min-h-screen">
      <Header isAdmin={true} />
      <div className="mt-12">
        <UserTabs isAdmin={true} />
      </div>

      <div className="bg-gray-50 max-w-3xl mx-auto mt-10">
        <div className="mt-8">
          <OrdersRecord value="Paid" />
          <OrdersRecord value="Not Paid" />
          <OrdersRecord value="Not Paid" />
          <OrdersRecord value="Not Paid" />
          <OrdersRecord value="Paid" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
