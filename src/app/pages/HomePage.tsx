import { Navigation } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}