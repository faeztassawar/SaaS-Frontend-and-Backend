import React from "react";
import NavBar from "../components/NavBar";

const aboutUsSaas = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <div className="p-10 bg-[linear-gradient(to_bottom,#000,#200d42_34%,#4f21a1_65%,#a46edb_100%)] text-white min-h-screen flex flex-col items-center">
        {/* About Us Section */}
        <div className="max-w-4xl text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-6 animate-slide-in">About Us</h1>
          <p className="text-lg leading-relaxed animate-fade-in-delayed">
            Welcome to DineDesign, your trusted SaaS platform designed to
            empower restaurants with personalized, modern websites. We aim to
            simplify the digital transformation for restaurant owners by
            offering intuitive tools, beautiful templates, and seamless
            management of menus, reservations, and orders. Our mission is to
            help your restaurant stand out in a competitive market by delivering
            an exceptional online presence.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="max-w-2xl text-center mt-16 animate-fade-in">
          <h2 className="text-3xl font-semibold mb-4 animate-slide-in">
            Contact Us
          </h2>
          <p className="text-lg leading-relaxed mb-2 animate-fade-in-delayed">
            Email: dinedesign.4@gmail.com
          </p>
          <p className="text-lg leading-relaxed mb-2 animate-fade-in-delayed">
            Phone: +92 (333) 2760526
          </p>
          <p className="text-lg leading-relaxed animate-fade-in-delayed">
            Address: PUCIT New Campus, Samsani Road, Lahore.
          </p>
        </div>

        {/* Animation Section */}
        <div className="mt-20 animate-bounce">
          <p className="text-3xl font-semibold">
            Crafting Digital Excellence for Restaurants
          </p>
        </div>
      </div>
    </div>
  );
};

export default aboutUsSaas;
