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

// --- Assets ---







// --- Channel Lists ---
const CHANNELS = {
  "Lofi Beats": [
    { id: 1, name: "Lofi 1", src: "LofiBeats/zelda1Lofi.mp4" },
    { id: 2, name: "Lofi 2", src: "LofiBeats/zelda2Lofi.mp4" },
    { id: 3, name: "Lofi 3", src: "LofiBeats/lofi3.mp4" },
    { id: 4, name: "Lofi 4", src: "LofiBeats/lofi4.mp4" },
    { id: 5, name: "Lofi 5", src: "LofiBeats/lofi5.mp4" },
  ],
  "Affirmations": [
    { id: 1, name: "Clarity", src: "Affirmations/clarityAff.mp4" },
    { id: 2, name: "Gratitude", src: "Affirmations/gratAff.mp4" },
    { id: 3, name: "Healing", src: "Affirmations/healingAff.mp4" },
    { id: 4, name: "Positivity", src: "Affirmations/posAff.mp4" },
    { id: 5, name: "Worthiness", src: "Affirmations/worthyAff.mp4" },
  ],
  "Soothing Stories": [
    { id: 1, name: "Dragon", src: "SoothingStories/dragonStory.mp4" },
    { id: 2, name: "Lamp", src: "SoothingStories/lampStory.mp4" },
    { id: 3, name: "Mind Journey", src: "SoothingStories/mindStory.mp4" },
    { id: 4, name: "Pirate", src: "SoothingStories/pirateStory.mp4" },
  ],

  "Ambient Noise": [], // add later
  "Mystery Signals": [] // add later
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
       <Row>
                <Col md={12}>
                <div className="flex justify-content-center align-items-center" >
                <Link to="/Rooms" style={{ textDecoration: 'none'}}>
                  <Button variant="outline-info"  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
          
          justifySelf: 'center',
          width: window.innerWidth < 768 ? '30%' : '10%',
         
          marginTop: '60px'}}>Exit</Button>
                  </Link>
                </div>
                </Col>
            </Row>
    </Container>
  );
};

export default CommCenter;
