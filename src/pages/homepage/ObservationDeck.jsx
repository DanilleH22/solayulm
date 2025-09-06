import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import galaxy from "../../assets/videos/galaxyVideo-OB.mp4";
import aurora from "../../assets/videos/auroraOB.mp4";
import greeng from "../../assets/videos/green-gas.mp4";
import purplegas from "../../assets/videos/green-purplegal.mp4";
import bluegas from "../../assets/videos/purple-blue-illum.mp4";
import goldSolar from "../../assets/videos/white-gold-solar.mp4";
import styles from "../../styles/ObservationDeck.module.css";




const ObservationDeck = () => {
  const [dots, setDots] = useState([]);
  const [activeMedia, setActiveMedia] = useState({
    src: aurora,
    type: "aurora",
    label: "Nebula Drift",
  });

  

  // List of all media
  const mediaOptions = [
    { label: "Nebula Drift", src: aurora, type: "video" },
    { label: "Stellar Nursery", src: galaxy, type: "video" },
    { label: "Cosmic Dance", src: bluegas, type: "video" },
    { label: "Black Hole Horizon", src: purplegas, type: "video" },
    { label: "Aurora Expanse", src: greeng, type: "video" },
    { label: "Quantum Twilight", src: goldSolar, type: "video" },
  ];

  return (
    <div>
      {/* Heading */}
      <Row className="text-center my-5">
        <h1>Decompression Bay</h1>
        <p>Welcome to Decompression Bay. More text about what to expect.</p>
        <p>
          Soft lighting, calming sounds, and a tranquil atmosphere designed to
          help you unwind and relax.
        </p>
      </Row>

      {/* Horizontal Buttons */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center flex-wrap gap-2">
          {mediaOptions.map((item) => (
            <Button
              key={item.label}
              onClick={() => setActiveMedia(item)}
              className={styles.MinutesButton}
            >
              {item.label}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Main screen (video/image + dots) */}
      <div className={styles.observationDeck}>
        <Row>
          <Col>
            <div className={styles.videoContainer}>
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.src}
                  autoPlay
                  loop
                  muted
                  className={styles.deckVideo}
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.label}
                  className={styles.deckVideo}
                />
              )}

             
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ObservationDeck;
