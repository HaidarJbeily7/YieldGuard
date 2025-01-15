import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { motion } from "framer-motion";
import { Text, Group } from "@mantine/core";
import NeuConnectButton from "../buttons/NeuConnectButton";

export const Content = () => {
  return (
    <MaxWidthWrapper className="relative z-20 flex flex-col items-center justify-center pb-12 pt-24 md:pb-36 md:pt-36">
      <motion.div
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          ease: "easeInOut",
        }}
        className="relative"
      ></motion.div>
      <motion.h1
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.25,
          ease: "easeInOut",
        }}
        className="mb-3 text-center text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-8xl lg:leading-tight"
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
      </motion.h1>
      <motion.p
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.5,
          ease: "easeInOut",
        }}
        className="mb-9 max-w-2xl text-center text-base text-zinc-400 sm:text-lg md:text-xl"
      >
        Transform your DeFi experience with unparalleled security, insights, and
        AI-powered strategies.
      </motion.p>
      <motion.div
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.75,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-4 sm:flex-row"
      >
        <Group>
          <NeuConnectButton />

          {/* <Button
            size="xl"
            variant="outline"
            color="gray"
            className="transform transition-transform hover:scale-105"
          >
            Learn More
          </Button> */}
        </Group>
      </motion.div>
    </MaxWidthWrapper>
  );
};
