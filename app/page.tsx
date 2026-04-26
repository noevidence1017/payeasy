import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Stellar from "@/components/landing/Stellar";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main aria-label="Landing Page">
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <Stellar />
      <div className="section-divider" />
      <CTA />
      <Footer />
    </main>
  );
}
