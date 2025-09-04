import React, { useState, useEffect } from "react";
import { SpiralLoop } from "./SpiralLoop";
import DecompressionLoop from "./DecompressionLoop.jsx";
import FlowerLifeLoop from "./FlowerLifeLoop.jsx"
import { easeInOut } from "framer-motion";

const visuals = [
  SpiralLoop,
  DecompressionLoop,
  FlowerLifeLoop,
];

export default function VisualSequence({ interval = 5000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % visuals.length);
    }, 20000);

    return () => clearInterval(timer);
  }, [interval]);

  const CurrentVisual = visuals[index];
  return <CurrentVisual transition={{ easeInOut }}/>;
}
