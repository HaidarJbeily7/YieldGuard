import { CTA } from "../components/Cta/CTA";
import Carousel from "../components/Features/carousel/Carousel";
import { FeatureGrid } from "../components/Features/grid/FeatureGrid";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";

export function HomePage() {
  return (
    <section className="relative overflow-hidden ">
      <Header />
      <Hero />
      <FeatureGrid />
      <Carousel />
      <CTA />
      <Footer />
    </section>
  );
}
