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







// --- Channel Lists ---
const CHANNELS = {
  "Lofi Beats": [
    // { id: 1, name: "Lofi 1", src: "/LofiBeats/zelda1Lofi.mp4" },
    // { id: 2, name: "Lofi 2", src: "/LofiBeats/zelda2Lofi.mp4" },
    // { id: 3, name: "Lofi 3", src: "/LofiBeats/lofi3.mp4" },
  
    // { id: 5, name: "Lofi 5", src: "/LofiBeats/lofi5.mp4" },
    { id: 6, name: "Lofi 6", src: "/LofiBeats/lofi6.mp3" },
    { id: 7, name: "Lofi 7", src: "/LofiBeats/lofi7.mp3" },
    { id: 8, name: "Lofi 8", src: "/LofiBeats/lofi8.mp3" },
    { id: 9, name: "Lofi 9", src: "/LofiBeats/lofi9.mp3" },
    { id: 10, name: "Lofi 10", src: "/LofiBeats/lofi10.mp3" },
  ],
  "Affirmations": [
    { id: 1, name: "Abundance & Success", src: "/Affirmations/abu_suc.mp3" },
    { id: 2, name: "Adventure & Expansion", src: "/Affirmations/adv_exp.mp3" },
    { id: 3, name: "Calm & Stress Relief", src: "/Affirmations/calm_str.mp3" },
    { id: 4, name: "Creativity & Inspiration", src: "/Affirmations/cre_insp.mp3" },
    { id: 5, name: "Focus & Productivity", src: "/Affirmations/foc_pro.mp3" },
    { id: 6, name: "Healing & Self-Love", src: "/Affirmations/hea_sel.mp3" },
    { id: 7, name: "Relationships & Connection", src: "/Affirmations/rel_con.mp3" },
    { id: 8, name: "Self-Confidence & Empowerment", src: "/Affirmations/selfC_emp.mp3" },
    { id: 9, name: "Sleep & Rest", src: "/Affirmations/sle_res.mp3" },
    { id: 10, name: "Spiritual Growth & Intuition", src: "/Affirmations/spiG_int.mp3" },
   
  ],
  "Soothing Stories": [
    { id: 1, name: "The Lighthouse on the Edge of a Nebula", src: "/SoothingStories/lighthouse.mp3" },
    { id: 2, name: "The Library of Stars", src: "/SoothingStories/libraryS.mp3" },
    { id: 3, name: "The Glass Planet", src: "/SoothingStories/glassP.mp3" },
    { id: 4, name: "The Sleeping Comet ", src: "/SoothingStories/sleepingC.mp3" },
    { id: 5, name: "The Garden on Io ", src: "/SoothingStories/gardenL.mp3" },
    { id: 6, name: "The Lighthouse of Andromeda", src: "/SoothingStories/andromeda.mp3" },
    { id: 7, name: "The Bridge of Auroras", src: "/SoothingStories/bridgeAur.mp3" },
    { id: 8, name: "The Forgotten Moon", src: "/SoothingStories/forgottenM.mp3" },
    { id: 9, name: "The Star Garden", src: "/SoothingStories/starGard.mp3" },
    { id: 10, name: "The Celestial Caravan", src: "/SoothingStories/celestialCara.mp3" },
  ],
  

  "Ambient Noise": [
    { id: 1, name: "Ambiance 1", src: "/AmbientNoises/ambient1.mp3" },
    { id: 2, name: "Ambiance 2", src: "/AmbientNoises/ambient2.mp3" },
    { id: 3, name: "Ambiance 3", src: "/AmbientNoises/ambient3.mp3" },
    { id: 4, name: "Ambiance 4", src: "/AmbientNoises/ambient4.mp3" },
    { id: 5, name: "Ambiance 5", src: "/AmbientNoises/ambient5.mp3" },
    { id: 6, name: "Ambiance 6", src: "/AmbientNoises/ambient6.mp3" },
    { id: 7, name: "Ambiance 7", src: "/AmbientNoises/ambient7.mp3" },
    { id: 8, name: "Ambiance 8", src: "/AmbientNoises/ambient8.mp3" },
    { id: 9, name: "Ambiance 9", src: "/AmbientNoises/ambient9.mp3" },
    { id: 10, name: "Ambiance 10", src: "/AmbientNoises/ambient10.mp3" },
  ],
  // "Lost Signals": [
  //   { id: 1, name: "Lost Signal 1", src: "/MysterySignals/mystsignal1.mp3" },
  //   { id: 2, name: "Lost Signal 2", src: "/MysterySignals/mystsignal2.mp3" },
  //   { id: 3, name: "Lost Signal 3", src: "/MysterySignals/mystsignal3.mp3" },
  //   { id: 4, name: "Lost Signal 4", src: "/MysterySignals/mystsignal4.mp3" },
  //   { id: 5, name: "Lost Signal 5", src: "/MysterySignals/mystsignal5.mp3" },
  //   { id: 6, name: "Lost Signal 6", src: "/MysterySignals/mystsignal6.mp3" },
  //   { id: 7, name: "Lost Signal 7", src: "/MysterySignals/mystsignal7.mp3" },
  //   { id: 8, name: "Lost Signal 8", src: "/MysterySignals/mystsignal8.mp3" },

  // ] 
  // add later
};


const CommCenter = () => {
  const [currentChannel, setCurrentChannel] = useState("Lofi Beats");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
   const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  

  const playlist = CHANNELS[currentChannel];
  // const currentTrack = playlist[currentIndex];

// Add these states
const [currentTrack, setCurrentTrack] = useState(null);


// Proper initialization useEffect
useEffect(() => {
  if (!playlist || !playlist[currentIndex]) return;

  const track = playlist[currentIndex];
  setCurrentTrack(track);

  // Don't create Audio here - just set the track
}, [currentChannel, currentIndex]);

// Separate useEffect for audio handling
useEffect(() => {
  if (!currentTrack) return;

  const setupAudio = () => {
    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    // Create new Audio with the source
    audioRef.current = new Audio(currentTrack.src);
    
    // Set properties
    audioRef.current.volume = isMuted ? 0 : 0.5;
    audioRef.current.preload = 'auto';
    
    // Set up event handlers
    audioRef.current.addEventListener('ended', handleNext);
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio loading error:', e);
      console.error('Failed src:', currentTrack.src);
      setIsPlaying(false);
    });

    // Load the audio (important!)
    audioRef.current.load();
  };

  setupAudio();

  return () => {
    if (audioRef.current) {
      audioRef.current.removeEventListener('ended', handleNext);
      audioRef.current.pause();
    }
  };
}, [currentTrack, isMuted]);

// Fix the handlePlay function
const handlePlay = async () => {
  if (!audioRef.current || !audioRef.current.src) {
    console.error('No audio source available');
    
    // Re-initialize if needed
    if (currentTrack) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.volume = isMuted ? 0 : 0.5;
      audioRef.current.load();
    } else {
      return;
    }
  }

  try {
    await audioRef.current.play();
    setIsPlaying(true);
  } catch (error) {
    console.error('Play failed:', error);
    
    // Debug: Check what's in audioRef
    console.log('audioRef.current:', audioRef.current);
    console.log('audioRef.current.src:', audioRef.current?.src);
    console.log('currentTrack:', currentTrack);
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


// Add this effect to check audio sources
useEffect(() => {
  // Check all audio file URLs
  Object.keys(CHANNELS).forEach(channel => {
    CHANNELS[channel].forEach(track => {
      // Test if file exists
      fetch(track.src, { method: 'HEAD' })
        .then(res => {
          console.log(`${track.name}: ${res.ok ? '✅ Found' : '❌ Missing'}`);
        })
        .catch(() => {
          console.error(`❌ Cannot access: ${track.src}`);
        });
    });
  });
}, []);


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
