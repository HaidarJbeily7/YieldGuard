import { Card } from "../../utils/Card";
import { motion } from "framer-motion";
import { FiLink } from "react-icons/fi";
import { BubbleButton } from "../../buttons/BubbleButton";

export const MiniCard1 = () => {
  return (
    <div className="col-span-2 h-[375px] md:col-span-1">
      <Card>
        <div className="mx-auto w-fit"></div>
        <p className="mb-1.5 text-center text-2xl">
          AI-Powered Yield Recommendations
        </p>
        <p className="mb-6 text-center text-zinc-400">
          YieldGuard tailors strategies for maximum returns while minimizing
          risk, powered by advanced machine learning models.
        </p>
        <BubbleButton className="mx-auto">Get Started Now</BubbleButton>

        <Ping />
      </Card>
    </div>
  );
};

const LOOP_DURATION = 6;

const Ping = () => {
  return (
    <div className="absolute bottom-0 left-1/2 w-fit -translate-x-1/2 translate-y-1/2">
      <FiLink className="relative z-10 text-7xl text-blue-200" />
      <Band delay={0} />
      <Band delay={LOOP_DURATION * 0.25} />
      <Band delay={LOOP_DURATION * 0.5} />
      <Band delay={LOOP_DURATION * 0.75} />
    </div>
  );
};

const Band = ({ delay }: { delay: number }) => {
  return (
    <motion.span
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{
        opacity: 0,
        scale: 0.25,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: 1,
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.5, 0.75, 1],
        duration: LOOP_DURATION,
        ease: "linear",
        delay,
      }}
      className="absolute left-[50%] top-[50%] z-0 size-80 rounded-full border border-main bg-gradient-to-br from-main-dark10/50 to-main-dark40/20"
    />
  );
};
