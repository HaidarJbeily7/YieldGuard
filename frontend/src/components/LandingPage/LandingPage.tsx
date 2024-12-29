import { HeroSection } from "./HeroSection/HeroSection";
import { FeaturesGrid } from "./FeaturesGrid/FeaturesGrid";
import { AnimatedBackground } from "./AnimatedBackground/AnimatedBackground";

export function LandingPage() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <AnimatedBackground />
      <HeroSection />
      <FeaturesGrid />
    </div>
  );
}
