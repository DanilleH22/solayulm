import React from "react";
import { motion } from "framer-motion";

export function SpiralLoop() {
  const dots = Array.from({ length: 20 });

  return (
    <div className="flex items-center justify-center h-screen bg-transparent overflow-hidden">
      <svg width="400" height="400" viewBox="-200 -200 400 400">
        {dots.map((_, i) => {
          const angle = (i / dots.length) * Math.PI * 6; // spiral angle
          const radius = i * 8; // spiral spacing
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill="rgba(187, 207, 246, 0.7)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
