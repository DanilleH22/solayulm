import React from "react";
import { motion } from "framer-motion";

export function RotatingRings() {
  const rings = [80, 120, 160];

  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <svg width="400" height="400" viewBox="-200 -200 400 400">
        {rings.map((r, i) => (
          <motion.circle
  cx="0"
  cy="0"
  r={r}
  stroke="rgba(79,172,254,0.6)"
  strokeWidth="3"
  fill="none"
  strokeDasharray="500"
  strokeDashoffset="500"
  animate={{ strokeDashoffset: [500, 0, 500] }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

        ))}
      </svg>
    </div>
  );
}
