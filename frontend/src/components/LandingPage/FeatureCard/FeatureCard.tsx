import { Card, Text, rem } from "@mantine/core";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Card
        padding="xl"
        radius="md"
        style={{
          height: "100%", // Makes all cards stretch to the same height
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(65, 215, 203, 0.2)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column", // Ensures vertical alignment
          justifyContent: "space-between", // Maintains spacing
        }}
      >
        <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.5 }}>
          <Icon
            size={40}
            strokeWidth={1.5}
            style={{
              color: "#41d7cb",
              marginBottom: rem(20),
            }}
          />
        </motion.div>
        <Text size="xl" fw={500} c="white" mb="sm">
          {title}
        </Text>
        <Text size="sm" c="gray.3" style={{ marginTop: "auto" }}>
          {description}
        </Text>
      </Card>
    </motion.div>
  );
}
