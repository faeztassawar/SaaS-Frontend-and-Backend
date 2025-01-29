"use client"

import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionHeader from "../../components/SectionHeader";


const OrdersEach = () => {
    useEffect(() => {
        if(typeof window.console !== "undefined") {
            if (window.location.href.includes('clear-cart=1')) {
                // clearCart();
            }
        }
    }, []);

  return (
    <div className="min-h-screen">
      <Header isAdmin={true} />
      <div className="bg-gray-50 max-w-2xl text-center mx-auto mt-8">
            <SectionHeader mainHeader="Order" subHeader="YOUR" /> 
            <div className="my-4 bg-gray-50">
                <p>Thanks for your order.</p>
                <p>We will call you when your order will be on your way.</p>
            </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrdersEach;
