import { FeatureGrid } from "../components/Features/grid/FeatureGrid";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";

export function HomePage() {
  return (
    <section className="relative overflow-hidden ">
      <Header />
      <Hero />
      <FeatureGrid />
    </section>
  );
}
