"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFFF1]">
      {/* Header Component */}
      <Header isAdmin={false} />

      {/* Main Content */}
      <main className="flex-grow">
       
        <div className="text-center mt-8 sm:mt-10 lg:my-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-4">Our Story</h2>
          <div className="text-[#333333] max-w-md sm:max-w-xl lg:max-w-4xl mx-auto px-4 lg:px-0 flex flex-col gap-6">
            <p className="text-sm sm:text-base leading-relaxed">
              Welcome to our restaurant, where passion meets flavor. Our journey began...
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              From the first dish we served to the countless memories...
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-10 sm:mt-20 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-4">Contact Us</h2>
          <p className="text-sm sm:text-base text-[#333333] max-w-lg mx-auto mb-4">
            Have questions or want to learn more? We would love to hear from you!
          </p>
          <a className="text-1xl sm:text-2xl lg:text-2xl text-[#333333]" href="tel:+923332760526">
            +92 4543545346
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}