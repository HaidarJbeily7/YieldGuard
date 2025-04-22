import { EmotionalBehaviorAlertsCard } from "./cards/EmotionalBehaviorAlertsCard";
import { RegretIndexCard } from "./cards/RegretIndexCard";
import { SmartAlertsCard } from "./cards/SmartAlertsCard";
import { RiskProfilingCard } from "./cards/RiskProfilingCard";

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20  bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">
            Trading Intelligence Suite
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Powerful tools designed to give you deeper emotional insight,
            regret-driven signals, and smart risk-aligned strategies — all in
            one place.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <EmotionalBehaviorAlertsCard />
          <RegretIndexCard />
          <SmartAlertsCard />
          <RiskProfilingCard />
        </div>
      </div>
    </section>
  );
}
