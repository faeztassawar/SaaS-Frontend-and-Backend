import React from "react";
import Banner from "../components/Banner";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import LogoTicker from "../components/LogoTicker";
import Features from "../components/Features";
import Template from "../components/Template";
import Faq from "../components/Faq";

const LandingPage = () => {
  return (
    <div className="">
      <NavBar />
      <Hero />
      <LogoTicker />
      <Features />
      <Template />
      <Faq />
    </div>
  );
};

export default LandingPage;
