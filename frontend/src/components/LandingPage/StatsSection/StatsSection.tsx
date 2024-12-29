import { Container, Group, Paper, Text, ThemeIcon, rem } from "@mantine/core";
import { Users, Shield, Wallet } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Active Users",
    value: "10,000+",
  },
  {
    icon: Shield,
    label: "Protected Assets",
    value: "$500M+",
  },
  {
    icon: Wallet,
    label: "Protocols Supported",
    value: "50+",
  },
];

export function StatsSection() {
  return (
    <Container size="xl" py={50}>
      <Group justify="center" grow>
        {stats.map((stat, index) => (
          <Paper
            key={index}
            p="md"
            radius="md"
            className="transform transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(65, 215, 203, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Group>
              <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ from: "#41d7cb", to: "#2c9690" }}
              >
                <stat.icon size={rem(24)} />
              </ThemeIcon>

              <div>
                <Text c="gray.3" size="sm" fw={500}>
                  {stat.label}
                </Text>
                <Text size="xl" fw={700} c="white">
                  {stat.value}
                </Text>
              </div>
            </Group>
          </Paper>
        ))}
      </Group>
    </Container>
  );
}
