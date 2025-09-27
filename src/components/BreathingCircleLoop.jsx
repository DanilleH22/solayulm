import React from "react";
import { motion } from "framer-motion";

export default function DecompressionLoop() {
  return (
    <div className="relative flex items-center justify-center h-[400px] w-full bg-black rounded-2xl">
      {/* Breathing Circle */}
      <motion.div
        className="z-10"
        style={{
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,172,254,0.8), rgba(186,85,211,0.6))",
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
