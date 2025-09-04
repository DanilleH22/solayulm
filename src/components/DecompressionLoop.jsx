import React from "react";
import { motion } from "framer-motion";

export default function DecompressionLoop() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full  rounded-2xl">
      {/* Text */}
      <motion.h4
        className="text-2xl font-light text-white/90 mb-6" // margin-bottom to separate from circle
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        Breathe...
      </motion.h4>

      {/* Circle */}
      <motion.div
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          margin: "25px",
          paddingTop: "15px",
          background:
            "radial-gradient(circle, rgba(79,172,254,0.8), rgba(186,85,211,0.6))",
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
