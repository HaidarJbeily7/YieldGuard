import { SimpleGrid, Container } from "@mantine/core";
import {
  Shield,
  Award,
  Activity,
  TrendingUp,
  Brain,
  LineChart,
} from "lucide-react";
import { FeatureCard } from "../FeatureCard/FeatureCard";
import { motion } from "framer-motion";

const features = [
  {
    icon: Activity,
    title: "Comprehensive Activity Reports",
    description:
      "Get detailed overviews of all your blockchain activities across the NEAR ecosystem, with consolidated transaction history and protocol engagements.",
  },
  {
    icon: Award,
    title: "Account Ranking System",
    description:
      "Gain insights into your accounts performance with an intelligent ranking system. Compare your standing within the ecosystem.",
  },
  {
    icon: Shield,
    title: "Advanced Risk Assessment",
    description:
      "AI-powered detection of suspicious activities and anomalies in your transactions, with real-time alerts and actionable insights.",
  },
  {
    icon: LineChart,
    title: "Yield Farming Protection",
    description:
      "Secure your yield farming process with robust scam detection and protection mechanisms for safer DeFi participation.",
  },
  {
    icon: Brain,
    title: "AI-Optimized Strategies",
    description:
      "Receive personalized recommendations for the best yield opportunities tailored to your risk appetite.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Monitoring",
    description:
      "Stay protected with 24/7 monitoring of DeFi protocols ensuring you follow the safest and most effective strategies.",
  },
];

export function FeaturesGrid() {
  return (
    <Container size="xl" py={50}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={30}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </SimpleGrid>
      </motion.div>
    </Container>
  );
}
