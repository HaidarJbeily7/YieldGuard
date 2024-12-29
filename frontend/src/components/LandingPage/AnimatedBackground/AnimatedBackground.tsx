import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  position: { x: number; y: number };
  duration: number;
}

export function AnimatedBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateBubbles = () => {
      return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 400 + 100,
        position: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        duration: Math.random() * 20 + 15,
      }));
    };

    setBubbles(generateBubbles());

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: `${bubble.position.x}%`,
            y: `${bubble.position.y}%`,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 30% 30%,
              rgba(65, 215, 203, 0.15) 0%,
              rgba(65, 215, 203, 0.05) 45%,
              rgba(65, 215, 203, 0) 70%
            )`,
            filter: "blur(50px)",
          }}
          whileHover={{ scale: 1.1 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
        />
      ))} */}

      {/* <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
      rgba(0, 0, 0, 0.4) 0%, 
      rgba(0, 0, 0, 0.2) 70%, 
      transparent 100%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      /> */}
    </div>
  );
}
