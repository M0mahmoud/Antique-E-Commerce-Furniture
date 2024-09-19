import Benefits from "@/components/(HomeSections)/Benefits";
import Gallery from "@/components/(HomeSections)/Gallery";
import Offers from "@/components/(HomeSections)/OffersSection";
import ProductsSection from "@/components/(HomeSections)/ProductsSection";
import WhyUsSection from "@/components/(HomeSections)/WhyUsSection";

import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <>
      <Hero langKey="Hero.Home" id="HeroSection" />
      <Benefits />
      <WhyUsSection />
      <ProductsSection />
      <Offers />
      <Gallery />
    </>
  );
};

export default HomePage;
