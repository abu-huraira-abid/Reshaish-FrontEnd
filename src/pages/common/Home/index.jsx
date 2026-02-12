import React from "react";
import Footer from "../../../components/common/Footer.jsx";
import LandingNavbar from "./components/LandingNavbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import FeaturedProperties from "./components/FeaturedProperties.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import FlatmatePromo from "./components/FlatmatePromo.jsx";
import CTASection from "./components/CTASection.jsx";

export default function Home() {
  return (
    <div className="page-shell">
      <LandingNavbar />
      <main className="page-content landing-content">
        <HeroSection />
        <FeaturedProperties />
        <HowItWorks />
        <WhyChoose />
        <FlatmatePromo />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
