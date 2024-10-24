"use client";
import React, { useRef } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import LogoTicker from "./components/LogoTicker";
import Features from "./components/Features";
import Template from "./components/Template";
import Faq from "./components/Faq";

const LandingPage = () => {
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="">
      <NavBar />
      <Hero
        scrollToBottom={() =>
          bottomSectionRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <LogoTicker />
      <Features />
      <Template ref={bottomSectionRef} />
      <Faq />
    </div>
  );
};

export default LandingPage;
