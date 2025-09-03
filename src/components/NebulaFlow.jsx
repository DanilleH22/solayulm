import React from "react";
import { motion } from "framer-motion";

export function NebulaFlow() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(79,172,254,0.5), transparent 70%), radial-gradient(circle at 70% 70%, rgba(186,85,211,0.5), transparent 70%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
