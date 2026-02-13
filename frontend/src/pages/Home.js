import React from "react";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import GeneratorSection from "@/components/GeneratorSection";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <Hero />
            <PricingSection />
            <GeneratorSection />
            <ContactSection />
        </div>
    );
};

export default Home;
