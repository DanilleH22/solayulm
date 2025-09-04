import React from "react";
import { motion } from "framer-motion";

export default function FlowerOfLifeLoop() {
  // Positions for overlapping circles in a Flower of Life pattern
  const positions = [
    [0, 0], // center
    [50, 0],
    [-50, 0],
    [25, 43],
    [-25, 43],
    [25, -43],
    [-25, -43],
  ];

  return (
    <div className="relative flex items-center justify-center h-screen 
    w-full bg-gradient-to-br from-black via-indigo-950 to-purple-900 overflow-hidden"
        style={{   transform: 'translate( 10%, -20px)'  }}
    >
      <svg width="500" height="500" viewBox="-150 -150 300 300">
        {positions.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="50"
            stroke="rgba(186, 85, 211, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5, 
            }}
          />
          
        ))}
      </svg>

      

      <motion.h1
        className="absolute  text-xl text-white/70"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        Flow...
      </motion.h1>
    </div>



  );
}
