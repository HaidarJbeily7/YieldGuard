import { motion } from "framer-motion";
import { ConnectWalletButton } from "../ConnectWalletButton/ConnectWalletButton";

const CommingSoon = () => {
  return (
    <div className="relative overflow-hidden">
      <ExampleContent />
      <FuzzyOverlay />
    </div>
  );
};

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: 'url("/img/black-noise.png")',
        // backgroundImage: 'url("/noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};

const ExampleContent = () => {
  return (
    <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-8">
      <p className="text-center text-6xl font-black text-neutral-50">
        Comming Soon!
      </p>
      <p className="text-center text-neutral-400">
        We're still working on that.
      </p>
      <div className="flex justify-center">
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default CommingSoon;
