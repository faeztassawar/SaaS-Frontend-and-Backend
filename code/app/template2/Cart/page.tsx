import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CartItem from "../components/CartItem";
import UserForm from "../components/UserForm";

const Cart = () => {
  return (
    <div className="min-h-screen">
      <Header isAdmin={false} />
      <div className="text-center mt-8 mb-12 bg-gray-50">
        <SectionHeader mainHeader="Cart" subHeader="" />
      </div>

      {/* Grid with 2 columns */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column for Pizza Items */}
        <div className="px-4">
          <CartItem
            name="Malai Boti Pizza"
            price="$12"
            size="Medium"
            extras="Cheese $2"
          />

          <CartItem
            name="Crown Crust Pizza"
            price="$15"
            size="Large"
            extras="Sauce $1"
          />

          <CartItem
            name="Special Pizza"
            price="$20"
            size="Small"
            extras="Cheese $1"
          />

          <CartItem
            name="Chicken Tikka Pizza"
            price="$10"
            size="Medium"
            extras="Chicken $3"
          />
          <div className="py-2 text-right pr-12 flex justify-center mt-6 items-center">
            <span className="text-gray-500">Total:</span>
            <span className="font-bold text-lg pl-2">$50</span>
          </div>
        </div>

        {/* Right Column with form */}
        <div className="bg-gray-100 p-6 rounded-2xl mx-3 lg:mx-8 shadow-2xl">
          <UserForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
