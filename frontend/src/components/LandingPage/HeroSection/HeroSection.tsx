import { Title, Text, Group, Stack, Container } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import { ConnectWalletButton } from "../../ConnectWalletButton/ConnectWalletButton";

export function HeroSection() {
  return (
    <Container size="xl" py={100} pos="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#41d7cb] rounded-full blur-[150px] opacity-20 top-[10px] -left-[250px]" />
        <div className="absolute w-[300px] h-[300px] bg-[#41d7cb] rounded-full blur-[150px] opacity-10 -bottom-[150px] -right-[150px]" />
      </div>

      <Stack align="center" gap={30} style={{ position: "relative" }}>
        <Title
          order={1}
          size={60}
          c="white"
          ta="center"
          style={{ maxWidth: 800 }}
        >
          Secure Your DeFi Journey with{" "}
          <Text
            inherit
            span
            variant="gradient"
            gradient={{ from: "#41d7cb", to: "#2c9690" }}
          >
            YieldGuard AI
          </Text>
        </Title>

        <Text c="gray.3" size="xl" ta="center" style={{ maxWidth: 600 }}>
          Transform your DeFi experience with unparalleled security, insights,
          and AI-powered strategies.
        </Text>

        <Group>
          <ConnectWalletButton
            text="Get Started"
            size="xl"
            style={{
              transform: "scale(1)",
              transition: "transform 0.2s ease-in-out",
            }}
            className="hover:scale-105"
            gradient={{ from: "#41d7cb", to: "#2c9690" }}
            rightSection={<ArrowRight size={20} />}
          />

          {/* <Button
            size="xl"
            variant="outline"
            color="gray"
            className="transform transition-transform hover:scale-105"
          >
            Learn More
          </Button> */}
        </Group>
      </Stack>
    </Container>
  );
}
