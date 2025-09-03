import React from "react";
import { motion } from "framer-motion";

export default function DecompressionLoop() {
  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-br from-black via-indigo-900 to-purple-900">
      {/* Background Nebula Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(100, 149, 237, 0.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(186, 85, 211, 0.4), transparent 60%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsating Breathing Circle */}
      <motion.div
        className="w-64 h-64 rounded-full shadow-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(79,172,254,0.7), rgba(186,85,211,0.6))",
        }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Optional text cue */}
      <motion.p
        className="absolute bottom-20 text-xl text-white/80"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        Breathe...
      </motion.p>
    </div>
  );
}
