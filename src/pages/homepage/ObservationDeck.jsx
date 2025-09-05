import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import galaxy from "../../assets/videos/galaxyVideo-OB.mp4";
import aurora from "../../assets/videos/auroraOB.mp4";
import greeng from "../../assets/videos/green-gas.mp4";
import purplegas from "../../assets/videos/green-purplegal.mp4";
import bluegas from "../../assets/videos/purple-blue-illum.mp4";
import goldSolar from "../../assets/videos/white-gold-solar.mp4";
import styles from "../../styles/ObservationDeck.module.css";

// media files
import s2 from "../../assets/images/s2.PNG";
import s3 from "../../assets/images/s3.PNG";
import s4 from "../../assets/images/s4.PNG";
import s5 from "../../assets/images/s5.PNG";
import s6 from "../../assets/images/s6.PNG";
import s7 from "../../assets/images/s7.PNG";

const NUM_DOTS = 30;

const ObservationDeck = () => {
  const [dots, setDots] = useState([]);
  const [activeMedia, setActiveMedia] = useState({
    src: galaxy,
    type: "aurora",
    label: "Nebula Drift",
  });

  useEffect(() => {
    const newDots = Array.from({ length: NUM_DOTS }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 5,
      message: `Message #${i + 1}`,
    }));
    setDots(newDots);
  }, []);

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

              {/* Overlay dots */}
              {dots.map((dot) => (
                <div
                  key={dot.id}
                  className={styles.orbitDot}
                  style={{
                    top: `${dot.y}%`,
                    left: `${dot.x}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                  onClick={() => alert(dot.message)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ObservationDeck;
