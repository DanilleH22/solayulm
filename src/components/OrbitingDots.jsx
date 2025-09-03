import React from "react";
import { motion } from "framer-motion";

export function OrbitingDots() {
  const dots = 6;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-900">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {[...Array(dots)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white rounded-full shadow-lg"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 -120px", // orbit radius
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: (i * 12) / dots, // stagger
            }}
          />
        ))}
      </div>
    </div>
  );
}
