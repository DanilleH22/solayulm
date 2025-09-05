import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/AirlockJournal.module.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Snowfall from 'react-snowfall';
import { gsap } from "gsap";


const AirlockJournal = () => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
   const textRef = useRef();
  const buttonRef = useRef();
   const timeoutRef = useRef(null);

  const resetSend = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setText("");       
    setSending(false);  
    gsap.set(textRef.current, { x: 0, y: 0, scale: 1, opacity: 0.5 });
    
  };

   const handleSend = () => {
     
    const buttonBox = buttonRef.current.getBoundingClientRect();
    gsap.to(textRef.current, {
      x: buttonBox.x - textRef.current.getBoundingClientRect().x,
      y: buttonBox.y - textRef.current.getBoundingClientRect().y,
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: "rough",
      onComplete: () => {
        timeoutRef.current = setTimeout(() => {
            resetSend()
        }, 1000)
      }
    })
    };



  

  return (
    <Container fluid className={styles.airlockJournal}>
   

      {/* Snow background */}
      <Snowfall
        color="#ffffff"
        snowflakeCount={150}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0
        }}
      />

      {/* Header */}
      <Row className="text-center mb-4">
        <Col>
          <h1>Airlock Journal</h1>
          <p>
            <strong>
              Write down your thoughts, worries, or reflections. When ready, release them into the black hole.
            </strong>
          </p>
        </Col>
      </Row>

      {/* Journal Input Area */}
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
        {/* <div className={styles.crinkle}> */}
          <textarea
            className={styles.textArea}
            placeholder="Type your thoughts here..."
            rows={20}
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textRef}
          />
          {/* </div> */}
        </Col>
      </Row>

      {/* Actions */}
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button className="save-btn" disabled>Save</Button>
        </Col>
        <Col xs="auto">
          <Button className={styles.sendBtn} ref={buttonRef} onClick={handleSend}>Send to Black Hole</Button>
        </Col>
      </Row>

      <div className={styles.blackhole} />

      {/* Optional Animation Area */}
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} className="text-center">
          {/* Placeholder for animation when sending to black hole */}
          {/* <BlackHoleAnimation show={animationActive} /> */}
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Link to="/Rooms" className='d-flex justify-content-center' style={{ background: 'none', textDecoration: 'none'}}>
            <Button className={styles.sendBtn} style={{display: 'flex', justifyContent: 'center', width: '10%'}}>Exit</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AirlockJournal;
