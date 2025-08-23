import React from "react";
import { motion } from "framer-motion";
import "../styles/SpaceCard.css"; // Ensure this path is correct
import Card from 'react-bootstrap/Card';

const SpaceCard = ({ title, description }) => {
  return (
    <motion.div
      className="space-card"
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0], rotate: [0, 0.5, 0] }} // floating effect
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Card
        className="space-card-bg"
        
      >
        <div className="light-sweep"></div>
        <div className="space-card-content">
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default SpaceCard;
