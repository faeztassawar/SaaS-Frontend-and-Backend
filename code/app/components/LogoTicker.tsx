"use client";
import React from "react";
import { motion } from "framer-motion";

const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl opacity-70">Trusted by many Companies</h1>
        <motion.div
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
          initial={{ translateX: 0 }}
          animate={{ translateX: "-25%" }}
          className="flex items-center pr-10 opacity-70 gap-16 sm:gap-32 overflow-hidden mt-10 "
        >
          <h1 className="text-5xl font-chillax">lezzetli.</h1>
          <h1 className="text-5xl font-rose">Antique</h1>
          <h1 className="text-5xl font-Orbitron">Monique</h1>
          <h1 className="text-5xl">Floral</h1>
          <h1 className="text-5xl font-chillax">lezzetli.</h1>
          <h1 className="text-5xl font-rose">Antique</h1>
          <h1 className="text-5xl font-Orbitron">Monique</h1>
          <h1 className="text-5xl">Floral</h1>
          <h1 className="text-5xl font-chillax">lezzetli.</h1>
          <h1 className="text-5xl font-rose">Antique</h1>
          <h1 className="text-5xl font-Orbitron">Monique</h1>
          <h1 className="text-5xl">Floral</h1>
          <h1 className="text-5xl font-chillax">lezzetli.</h1>
          <h1 className="text-5xl font-rose">Antique</h1>
          <h1 className="text-5xl font-Orbitron">Monique</h1>
          <h1 className="text-5xl">Floral</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoTicker;
