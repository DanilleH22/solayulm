import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function DecompressionLoop() {
  return (
    <Container fluid className="py-3 ">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="d-flex justify-content-center">
    <div className="flex  items-center justify-center h-100 w-full  rounded-2xl">
      {/* Text */}
      <motion.h1
        className="text-2xl font-light text-white/90 mb-6 py-10 text-center flex justify-around items-center" 
        style={{   transform: 'translate( 30%, -30px)'  }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        Breathe...
      </motion.h1>

      {/* Circle */}
      <motion.div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          marginLeft: "25px",
          paddingTop: "15px",
          paddingLeft: "40px",
          background:
            "radial-gradient(circle, rgba(79,172,254,0.8), rgba(186,85,211,0.6))",
        bottom: "100%",
            
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    </Col>
    </Row>
    </Container>
  );
}
