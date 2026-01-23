import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/CommCenter.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, faVolumeUp, faVolumeMute, faPause,
  faForward, faBackward
} from '@fortawesome/free-solid-svg-icons';
import WavesBackground from "../../components/WavesBackground.jsx";
import { Link } from "react-router";
import {Helmet} from "react-helmet-async"

// --- Assets ---






const baseUrl = process.env.PUBLIC_URL || '';
// --- Channel Lists ---
const CHANNELS = {
  "Lofi Beats": [
    { id: 1, name: "Lofi 1", src: `${baseUrl}/LofiBeats/zelda1Lofi.mp4` },
    { id: 2, name: "Lofi 2", src: `${baseUrl}/LofiBeats/zelda2Lofi.mp4` },
    { id: 3, name: "Lofi 3", src: `${baseUrl}/LofiBeats/lofi3.mp4` },
    { id: 4, name: "Lofi 4", src: `${baseUrl}/LofiBeats/lofi4.mp4` },
    { id: 5, name: "Lofi 5", src: `${baseUrl}/LofiBeats/lofi5.mp4` },
    { id: 6, name: "Lofi 6", src: `${baseUrl}/LofiBeats/lofi6.mp3` },
    { id: 7, name: "Lofi 7", src: `${baseUrl}/LofiBeats/lofi7.mp3` },
    { id: 8, name: "Lofi 8", src: `${baseUrl}/LofiBeats/lofi8.mp3` },
    { id: 9, name: "Lofi 9", src: `${baseUrl}/LofiBeats/lofi9.mp3` },
    { id: 10, name: "Lofi 10", src: `${baseUrl}/LofiBeats/lofi10.mp3` },
  ],
  "Affirmations": [
    { id: 1, name: "Abundance & Success", src: `${baseUrl}/Affirmations/abu&suc.mp3` },
    { id: 2, name: "Adventure & Expansion", src: `${baseUrl}/Affirmations/adv&exp.mp3` },
    { id: 3, name: "Calm & Stress Relief", src: `${baseUrl}/Affirmations/calm&str.mp3` },
    { id: 4, name: "Creativity & Inspiration", src: `${baseUrl}/Affirmations/cre&insp.mp3` },
    { id: 5, name: "Focus & Productivity", src: `${baseUrl}/Affirmations/foc&pro.mp3` },
    { id: 6, name: "Healing & Self-Love", src: `${baseUrl}/Affirmations/hea&sel.mp3` },
    { id: 7, name: "Relationships & Connection", src: `${baseUrl}/Affirmations/rel&con.mp3` },
    { id: 8, name: "Self-Confidence & Empowerment", src: `${baseUrl}/Affirmations/selfC&emp.mp3` },
    { id: 9, name: "Sleep & Rest", src: `${baseUrl}/Affirmations/sle&res.mp3` },
    { id: 10, name: "Spiritual Growth & Intuition", src: `${baseUrl}/Affirmations/spiG&int.mp3` },
   
  ],
  "Soothing Stories": [
    { id: 1, name: "The Lighthouse on the Edge of a Nebula", src: `${baseUrl}/SoothingStories/lighthouse.mp3` },
    { id: 2, name: "The Library of Stars", src: `${baseUrl}/SoothingStories/libraryS.mp3` },
    { id: 3, name: "The Glass Planet", src: `${baseUrl}/SoothingStories/glassP.mp3` },
    { id: 4, name: "The Sleeping Comet ", src: `${baseUrl}/SoothingStories/sleepingC.mp3` },
    { id: 5, name: "The Garden on Io ", src: `${baseUrl}/SoothingStories/gardenL.mp3` },
    { id: 6, name: "The Lighthouse of Andromeda", src: `${baseUrl}/SoothingStories/andromeda.mp3` },
    { id: 7, name: "The Bridge of Auroras", src: `${baseUrl}/SoothingStories/bridgeAur.mp3` },
    { id: 8, name: "The Forgotten Moon", src: `${baseUrl}/SoothingStories/forgottenM.mp3` },
    { id: 9, name: "The Star Garden", src: `${baseUrl}/SoothingStories/starGard.mp3` },
    { id: 10, name: "The Celestial Caravan", src: `${baseUrl}/SoothingStories/celestialCara.mp3` },
  ],
  

  "Ambient Noise": [
    { id: 1, name: "Ambiance 1", src: `${baseUrl}/AmbientNoises/ambient1.mp3` },
    { id: 2, name: "Ambiance 2", src: `${baseUrl}/AmbientNoises/ambient2.mp3` },
    { id: 3, name: "Ambiance 3", src: `${baseUrl}/AmbientNoises/ambient3.mp3` },
    { id: 4, name: "Ambiance 4", src: `${baseUrl}/AmbientNoises/ambient4.mp3` },
    { id: 5, name: "Ambiance 5", src: `${baseUrl}/AmbientNoises/ambient5.mp3` },
    { id: 6, name: "Ambiance 6", src: `${baseUrl}/AmbientNoises/ambient6.mp3` },
    { id: 7, name: "Ambiance 7", src: `${baseUrl}/AmbientNoises/ambient7.mp3` },
    { id: 8, name: "Ambiance 8", src: `${baseUrl}/AmbientNoises/ambient8.mp3` },
    { id: 9, name: "Ambiance 9", src: `${baseUrl}/AmbientNoises/ambient9.mp3` },
    { id: 10, name: "Ambiance 10", src: `${baseUrl}/AmbientNoises/ambient10.mp3` },
  ],
  "Lost Signals": [
    { id: 1, name: "Lost Signal 1", src: `${baseUrl}/MysterySignals/mystsignal1.mp3` },
    { id: 2, name: "Lost Signal 2", src: `${baseUrl}/MysterySignals/mystsignal2.mp3` },
    { id: 3, name: "Lost Signal 3", src: `${baseUrl}/MysterySignals/mystsignal3.mp3` },
    { id: 4, name: "Lost Signal 4", src: `${baseUrl}/MysterySignals/mystsignal4.mp3` },
    { id: 5, name: "Lost Signal 5", src: `${baseUrl}/MysterySignals/mystsignal5.mp3` },
    { id: 6, name: "Lost Signal 6", src: `${baseUrl}/MysterySignals/mystsignal6.mp3` },
    { id: 7, name: "Lost Signal 7", src: `${baseUrl}/MysterySignals/mystsignal7.mp3` },
    { id: 8, name: "Lost Signal 8", src: `${baseUrl}/MysterySignals/mystsignal8.mp3` },

  ] // add later
};


const CommCenter = () => {
  const [currentChannel, setCurrentChannel] = useState("Lofi Beats");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
   const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  

  const playlist = CHANNELS[currentChannel];
  const currentTrack = playlist[currentIndex];

  // Load track when channel/index changes
  useEffect(() => {
    if (!currentTrack) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(currentTrack.src);
    audioRef.current.loop = false; // auto-advance instead
    audioRef.current.volume = 0.5;

    if (isPlaying) {
      audioRef.current.play().catch(err => console.log("Play blocked:", err));
    }

    // Auto-advance when ended
    audioRef.current.onended = () => {
      handleNext();
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentChannel, currentIndex]);

  // Controls
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop back to start
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(playlist.length - 1); // loop to last
    }
  };



const handleVolumeToggle = () => {
  if (audioRef.current) {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  }
};


  return (
    <>
    <Helmet>
  <title>Comm Center Radio – Listen, Unwind & Drift | Solayulm</title>
  <meta name="description" content="Tune in to Solayulm’s Comm Center — soothing sounds and spoken reflections to calm your mind and elevate your mood." />
  <meta property="og:title" content="Comm Center Radio | Solayulm" />
  <meta property="og:description" content="A peaceful digital radio transmitting serenity across your inner space." />
</Helmet>
    <Container>
      <Row className="text-center my-5">
        <Col>
          <h1>Comm Center (Audio Room)</h1>
          <p>Tune into calming transmissions</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2><strong>Disclaimer!</strong></h2>
          <p>The Comm Center is designed without visuals on purpose. In a world where we’re constantly stimulated by screens, this space invites you to disconnect from the visual overload and focus entirely on sound. </p>
          <p>By closing your eyes and tuning into the transmissions, you allow your mind and body to rest, reset, and experience the audio more deeply—whether that’s affirmations, calming beats, or soothing stories.</p>
        </Col>
      </Row>

      <div className={styles.wrapper}>
        <div className={styles.borderWrapper}>
          <div className={styles.gradientBox}>

            <Row className="my-4">
              <Col>
                <h3>
                  Current Channel: {currentChannel}
                </h3>
                <p>
                  {currentTrack ? `Station Playing: ${currentTrack.name}` : "No track available"}
                </p>
              </Col>
            </Row>

            <Row className="g-0 " style={{ height: "300px" }}>
              <Col md={6} sm={4} className="d-flex flex-column justify-content-center">
                <Row className="justify-content-center mb-3">
                  <Col xs="auto" >
                    <Button variant="outline-info" onClick={handlePlay} className="w-100">
                      <FontAwesomeIcon icon={faPlay} />
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-info" onClick={handlePause} className="w-100">
                      <FontAwesomeIcon icon={faPause} />
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-info" onClick={handleVolumeToggle} className="w-100">
                      <FontAwesomeIcon  icon={isMuted ? faVolumeMute : faVolumeUp}  />
                    </Button>
                  </Col>
                </Row>

                <Row className="justify-content-center" style={{ marginBottom: window.innerWidth < 768 ? '10px' : '30px' }}>
                  <Col xs="auto">
                    <Button variant="outline-info" onClick={handlePrev} className="w-100">
                      <FontAwesomeIcon icon={faBackward} />
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-info" onClick={handleNext} className="w-100">
                      <FontAwesomeIcon icon={faForward} />
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col md={6} className="d-flex justify-content-center align-items-center">
                <div className={styles.CircleBorder}>
                  <WavesBackground />
                </div>
              </Col>
            </Row>

            <Row className="mt-4 ">
              <Col className="d-flex justify-content-center flex-wrap gap-2 ">
              <h3 className="d-flex justify-content-center" style={{ marginTop: window.innerWidth < 768 ? '100px' : '30px' }}>Channel's</h3>
                {Object.keys(CHANNELS).map(channel => (
                  <Button
                    key={channel}
                    variant={channel === currentChannel ? "info" : "outline-info"}
                    onClick={() => {
                      setCurrentChannel(channel);
                      setCurrentIndex(0); 
                      setIsPlaying(false); 
                    }}
                  >
                    {channel}
                  </Button>
                ))}
              </Col>
            </Row>

          </div>
        </div>
      </div>
       

            <Row className="justify-content-center">
              <Col xs={12} className="text-center">
                <Link to="/Rooms" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outline-info"
                    className="mobile-responsive-btn"
                    style={{
                      fontSize: window.innerWidth < 768 ? '18px' : '20px',
                      color: 'white',
                      cursor: 'pointer',
                      marginTop: '60px',
                      marginBottom: '10px',
                      padding: window.innerWidth < 768 ? '8px 24px' : '10px 30px',
                      minWidth: window.innerWidth < 768 ? '100px' : '120px'
                    }}
                  >
                    Exit
                  </Button>
                </Link>
              </Col>
            </Row>
    </Container>
    </>
  );
};

export default CommCenter;
