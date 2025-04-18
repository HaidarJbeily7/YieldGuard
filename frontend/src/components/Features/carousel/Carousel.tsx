import { CornerBlur } from "../../utils/CornerBlur";
import { SectionHeading } from "../../utils/SectionHeading";
import { SectionSubheading } from "../../utils/SectionSubheading";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiBox,
  FiPhone,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const Carousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (features.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section
      className="relative overflow-hidden border-b border-zinc-700 bg-zinc-900/30 py-12"
      ref={ref}
    >
      <div className="relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <SectionHeading>Dive into the specifics</SectionHeading>
              <SectionSubheading>
                Anything else you want to show off? What are you proud of? What
                makes you different? Show it off here!
              </SectionSubheading>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`rounded-lg border-[1px] border-zinc-700 bg-zinc-900 p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_LEFT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                <FiArrowLeft />
              </button>
              <button
                className={`rounded-lg border-[1px] border-zinc-700 bg-zinc-900 p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${features.length}, 1fr)`,
            }}
          >
            {features.map((post) => {
              return <Feature key={post.id} {...post} />;
            })}
          </motion.div>
        </div>
      </div>

      <CornerBlur />
    </section>
  );
};

const Feature = ({ title, description, Icon }: FeatureType) => {
  return (
    <div
      className="group relative shrink-0 mx-auto border border-zinc-700  overflow-hidden rounded-lg p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-main-light40/50"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
        height: 320,
      }}
    >
      <div
        className="relative z-10 flex flex-col items-start justify-center overflow-hidden rounded-[7px] bg-gradient-to-br from-zinc-950/50 to-zinc-900/80 p-8 transition-colors duration-500 group-hover:bg-[#0d0d10]/50"
        style={{
          width: CARD_WIDTH,
          height: 320,
        }}
      >
        <Icon className="relative z-10 mb-6 rounded-full border-2 border-main bg-main-light40/10 p-4 text-7xl text-main" />
        <h4 className="relative z-10 mb-2 text-xl font-bold text-slate-50">
          {title}
        </h4>
        <p className="relative z-10 text-sm text-slate-400">{description}</p>
      </div>
      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
};

export default Carousel;

type FeatureType = {
  id: number;
  title: string;
  description: string;
  Icon: IconType;
};

const features: FeatureType[] = [
  {
    id: 1,
    Icon: FiArrowUp,
    title: "Connect Your Wallet",
    description:
      "Securely link your crypto wallet to start receiving personalized insights.",
  },
  {
    id: 2,
    Icon: FiBox,
    title: "Analyze Your Trading Behavior",
    description:
      "Review your trading history to identify patterns and areas for improvement.",
  },
  {
    id: 3,
    Icon: FiPhone,
    title: "Receive Personalized Alerts and Advice",
    description:
      "Stay informed with real-time alerts and AI-driven recommendations tailored to your trading style.",
  },
  {
    id: 4,
    Icon: FiShield,
    title: "Unmatched Security Measures",
    description:
      "Protect your investments with advanced scam detection, wallet scoring, and protocol risk assessments powered by machine learning and a community-driven trust system.",
  },
  {
    id: 5,
    Icon: FiUsers,
    title: "AI-Powered Recommendations",
    description:
      "Benefit from AI-driven strategies tailored to your investment profile, developed by a platform built on cutting-edge technology and expertise in DeFi ecosystems.",
  },


];
