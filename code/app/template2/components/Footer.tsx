import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-6 border-t-2 border-gray-700 mt-20 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between pb-4 border-b border-gray-700 px-5">
        <div className="text-3xl font-bold mb-4 md:mb-0">Lezzetli</div>

        {/* Contact Information */}
        <div className="text-sm space-y-1 text-center md:text-left">
          <div>Phone no: 123-456-56</div>
          <div>Email: abc@gmail.com</div>
          <div>Address: G11, Basement, Al-Khair Arcade, G-11/1, Islamabad.</div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 pt-4">
        2024 © Powered by Shahid Farid
      </div>
    </footer>
  );
};

export default Footer;