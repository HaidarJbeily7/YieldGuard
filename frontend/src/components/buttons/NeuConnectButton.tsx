import React, { useContext, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};

const NeuConnectButton = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);
  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  const { modal, accountId } = useContext(WalletContext);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const needRedirection = localStorage.getItem("needRedirection");

  const handleConnectWallet = () => {
    if (accountId) {
      navigate("/dashboard");
    } else if (modal) {
      localStorage.setItem("needRedirection", "true");
      modal.show();
    }
  };

  useEffect(() => {
    if (isLoggedIn && needRedirection === "true") {
      localStorage.setItem("needRedirection", "false");
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate, needRedirection]);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!ref.current) return;
    const { height, width } = ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;
    const xPct = offsetX / width;
    const yPct = 1 - offsetY / height;
    const newY = 12 + yPct * 12;
    const newX = 12 + xPct * 12;
    x.set(newX);
    y.set(-newY);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24">
      <div className="mx-auto h-16 w-full max-w-72 bg-main-light40/30">
        <motion.button
          ref={ref}
          style={{ transform }}
          onMouseMove={handleMove}
          onMouseLeave={handleReset}
          onMouseDown={handleReset}
          onClick={handleConnectWallet}
          className="group flex h-full w-full items-center justify-between rounded-md text-white border-black bg-main px-8 text-xl font-semibold"
        >
          <Copy>{accountId ? "Go to Dashboard" : "Get Started"}</Copy>
          <Arrow />
        </motion.button>
      </div>
    </section>
  );
};

const Copy = ({ children }: { children: string }) => {
  return (
    <span className="relative overflow-hidden">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
};

const Arrow = () => (
  <div className="pointer-events-none flex h-6 w-6 overflow-hidden text-2xl">
    <FiArrowRight className="shrink-0 -translate-x-full text-white transition-transform duration-300 group-hover:translate-x-0" />
    <FiArrowRight className="shrink-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
  </div>
);

export default NeuConnectButton;
