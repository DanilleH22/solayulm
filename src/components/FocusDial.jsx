// FocusDial.jsx
import React from "react";
import { motion } from "framer-motion";

export default function FocusDial({ value }) {
  // value = 0 → left (Distracted)
  // value = 50 → middle (Neutral)
  // value = 100 → right (Focused)

  // Calculate rotation
  const rotation = (value / 100) * 180 - 90; // converts 0-100 to -90° → 90°

    // Determine label based on value
  let label = "";
  if (value < 33) label = "Distracted";
  else if (value < 66) label = "Neutral";
  else label = "Focused";


  return (
    <div
      style={{
        width: 200,
        height: 100,
        borderTop: "4px solid #e1b6faff", // semi-circle base
        borderRadius: "100px 100px 0 0",
        position: "relative",
        margin: "0 auto",
      }}
    >
        
      <motion.div
        style={{
          width: 4,
          height: 80,
          backgroundColor: "#5f70ddff",
          position: "absolute",
          bottom: 0,
          left: "50%",
          transformOrigin: "bottom center", 
        }}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 120 }}
      />
       {/* Label text below dial */}
      <div style={{ textAlign: "center", marginTop: 8, fontWeight: "bold", color: "#fff" }}>
        {label}
      </div>
    </div>
  );
}
