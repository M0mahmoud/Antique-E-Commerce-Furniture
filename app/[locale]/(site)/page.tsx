import Benefits from "@/components/(HomeSections)/Benefits";
import { TopCategories } from "@/components/(HomeSections)/Categories";
import Gallery from "@/components/(HomeSections)/Gallery";
import Offers from "@/components/(HomeSections)/OffersSection";
import ProductsSection from "@/components/(HomeSections)/ProductsSection";
import Testimonials from "@/components/(HomeSections)/Testimonials";
import WhyUsSection from "@/components/(HomeSections)/WhyUsSection";

import Hero from "@/components/Hero";

export default function HomePage() {
    return (
        <>
            <Hero langKey="Hero.Home" id="HeroSection" />
            <Benefits />
            <WhyUsSection />
            <TopCategories />
            <ProductsSection />
            <Offers />
            <Testimonials />
            <Gallery />
        </>
    );
}
