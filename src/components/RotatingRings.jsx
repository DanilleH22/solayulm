import React from "react";
import { motion } from "framer-motion";

export function RotatingRings() {
  const rings = [80, 120, 160];

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <svg width="400" height="400" viewBox="-200 -200 400 400">
        {rings.map((r, i) => (
          <motion.circle
            key={i}
            cx="0"
            cy="0"
            r={r}
            stroke="rgba(79,172,254,0.6)"
            strokeWidth="3"
            fill="none"
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 40 - i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
