import Hero from "@/components/Hero";
import PayMob from "@/components/PayMob";
import couch from "@/images/couch.png";
import React from "react";
import Benefits from "../(HomeSections)/Benefits";
import Offers from "../(HomeSections)/OffersSection";
import ProductsSection from "../(HomeSections)/ProductsSection";
import WeHelpSection from "../(HomeSections)/WeHelpSection";
import WhyUsSection from "../(HomeSections)/WhyUsSection";
const HomePage = () => {
  return (
    <>
      <PayMob />
      <Hero langKey="Hero.Home" img={couch.src} id="HeroSection" />
      <Benefits />
      <WhyUsSection />
      <ProductsSection />
      <Offers />
      {/* <WeHelpSection /> */}
    </>
  );
};

export default HomePage;
