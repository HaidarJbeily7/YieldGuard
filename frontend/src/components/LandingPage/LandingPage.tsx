import { FeaturesGrid } from "./FeaturesGrid/FeaturesGrid";

export function LandingPage() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <FeaturesGrid />
    </div>
  );
}
