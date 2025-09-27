import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from "../styles/OrbitingDots.module.css";
import Modal from 'react-bootstrap/Modal';

const NUM_DOTS = 40;

export default function OrbitingDots() {
 
  const [dots, setDots] = useState([]);
 const [show, setShow] = useState(false);
const [activeMessage, setActiveMessage] = useState("");

useEffect(() => {
  // initialize stars
  const newDots = Array.from({ length: NUM_DOTS }, (_, i) => ({
    id: i,
    x: Math.random() * 100,  
    y: Math.random() * 100,   
    speed: Math.random() * 0.2 + 0.05, // random fall speed
    message: messages[i % messages.length],
  }));
  setDots(newDots);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setDots((prevDots) =>
      prevDots.map((dot) => {
        let newY = dot.y + dot.speed;
        if (newY > 100) {
          // reset to top once it falls off
          newY = 0;
        }
        return { ...dot, y: newY };
      })
    );
  }, 50); // update every 50ms

  return () => clearInterval(interval);
}, []);


const messages = [
    "You are made of stardust; the universe flows within you.",
"You are strong, resilient, and infinitely capable.",
"Every breath you take grounds you deeper into peace.",
"You shine your own unique light, brighter than any star.",
"Growth is your nature, just like galaxies expanding.",
"You carry the universe’s creativity in your soul.",
"Calmness and clarity are always within your reach.",
"You are worthy of love, success, and joy.",
"Your potential is limitless, like the cosmos itself.",
"You are exactly where you need to be in your journey.",
"Even the darkest night ends with sunrise.",
"Stars can’t shine without darkness—neither can you.",
"Small steps today create galaxies of progress tomorrow.",
"You don’t need to rush; even stars take millions of years to form.",
"Keep moving forward—momentum creates miracles.",
"Like gravity, your determination pulls opportunities closer.",
"The universe rewards persistence and patience.",
"Energy flows where attention goes—focus wisely.",
"Trust the process; the cosmos has perfect timing.",
"Dreams are fuel for your rocket—never stop refueling.",
"You are literally made of stardust—most elements in your body were forged in stars.",
"The Milky Way has over 100 billion stars, and you’re part of it.",
"On a clear night, you can see about 2,500 stars with the naked eye.",
"The light from the Sun takes 8 minutes to reach Earth.",
"Neutron stars are so dense that a teaspoon of them would weigh 4 billion tons.",
"Saturn could float in water because it’s mostly gas.",
"The footprints on the Moon will stay for millions of years—no wind to erase them.",
"Jupiter’s Great Red Spot is a storm that has raged for centuries.",
"Some galaxies are 13 billion years old—almost as old as the universe.",
"Black holes warp space and time, creating cosmic mysteries we’re still uncovering.",
"You are a tiny universe experiencing itself.",
"Every star you see is a reminder of infinite possibility.",
"The universe is expanding—so can you.",
"Just like stars are born in chaos, so too can beauty rise from struggle.",
"Cosmic silence reminds us: peace is powerful.",
"Infinity lives in every moment; pause and feel it.",
"Stars are ancient storytellers—listen deeply to their light.",
"The cosmos has no hurry, yet everything unfolds perfectly.",
"Every ending is just a supernova making way for new beginnings.",
"You are both a traveler and a creator in this universe."
  ];

   return (
<div>
    {dots.map((dot) => (
      <div
        key={dot.id}
        className={styles.orbitDot}
        style={{
          position: "absolute",
          top: `${dot.y}%`,
          left: `${dot.x}%`,
          cursor: "pointer",
          pointerEvents: "auto", 
        }}
        onClick={() => {
  setActiveMessage(dot.message);
  setShow(true);
}}

      />
    ))}
    <Modal show={show} onHide={() => setShow(false)} size="lg" centered >
  <Modal.Header closeButton style={{backgroundColor: '#98b5f0ff;'}}>
    <Modal.Title></Modal.Title>
  </Modal.Header>
  <Modal.Body  style={{ fontSize: "1.25rem", textAlign: "center", color: 'black', backgroundColor: '#98b5f0;'  }}>
    {activeMessage}
  </Modal.Body>
</Modal>

    </div>  

   )

}
