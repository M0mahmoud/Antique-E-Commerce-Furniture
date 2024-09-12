import Benefits from "@/components/(HomeSections)/Benefits";
import Offers from "@/components/(HomeSections)/OffersSection";
import ProductsSection from "@/components/(HomeSections)/ProductsSection";
import WhyUsSection from "@/components/(HomeSections)/WhyUsSection";

import Hero from "@/components/Hero";

import couch from "@/images/couch.png";

const HomePage = () => {
  return (
    <>
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
