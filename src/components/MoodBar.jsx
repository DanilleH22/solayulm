import React, { useState, useEffect, useRef } from "react";
import { Slider, Stack } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVolumeUp, 
  faVolumeMute, 
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const MoodBar = () => {
  const [mood, setMood] = useState(30);
  const [currentSection, setCurrentSection] = useState("calm");
  const audioRef = useRef(null);
  const [isSoundOn, setIsSoundOn] = useState(true); // Changed to true by default
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  
  
  const moodSounds = {
  calm: "/music/aromatic.mp3",  
  bright: "/music/ABeautifulGarden.mp3",
  intense: "/music/FallingIntoYou.mp3",
  fire: "/music/Face_The_Future.mp3",
};

  // Update section whenever mood changes
  useEffect(() => {
    let section = "";
    if (mood < 44) section = "calm";
    else if (mood < 72) section = "bright";
    else if (mood < 86) section = "intense";
    else section = "fire";

    setCurrentSection(section);
  }, [mood]);

  // Handle mute/unmute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isSoundOn) {
      audio.volume = 1; // Full volume when on
    } else {
      audio.volume = 0; // Mute when off
    }
  }, [isSoundOn]);

  // Play audio on section change — after user interaction
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;

  //   // Only change src if it's different from current
  //   if (audio.src !== moodSounds[currentSection]) {
  //     audio.src = moodSounds[currentSection];
  //     audio.load();
  //   }

  //   const playAudio = () => {
  //     if (isSoundOn) {
  //       audio.play().catch((err) => {
  //         console.log("Error playing audio:", err);
  //       });
  //     }
  //     setIsUserInteracted(true);
  //   };

  //   // Only add listeners if not already interacted
  //   if (!isUserInteracted) {
  //     window.addEventListener("click", playAudio);
  //     window.addEventListener("touchstart", playAudio);
  //     window.addEventListener("keydown", playAudio);

  //     return () => {
  //       window.removeEventListener("click", playAudio);
  //       window.removeEventListener("touchstart", playAudio);
  //       window.removeEventListener("keydown", playAudio);
  //     };
  //   }
  // }, [currentSection, isSoundOn, isUserInteracted]);


  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  // stop current audio safely
  audio.pause();

  // set new source
  audio.src = moodSounds[currentSection];

  // only play if allowed
  if (isSoundOn && isUserInteracted) {
    audio.play().catch((err) => {
      console.log("Error playing audio:", err);
    });
  }
}, [currentSection, isSoundOn, isUserInteracted]);


useEffect(() => {
  const handleFirstInteraction = () => {
    setIsUserInteracted(true);

    const audio = audioRef.current;
    if (audio && isSoundOn) {
      audio.play().catch(console.log);
    }

    window.removeEventListener("click", handleFirstInteraction);
  };

  window.addEventListener("click", handleFirstInteraction);

  return () => {
    window.removeEventListener("click", handleFirstInteraction);
  };
}, []);



  // Handle playing when sound is turned on
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isSoundOn && isUserInteracted) {
      audio.play().catch((err) => {
        console.log("Error playing audio:", err);
      });
    } else if (!isSoundOn && audio) {
      audio.pause();
    }
  }, [isSoundOn, isUserInteracted]);

  // Toggle mute function
  const toggleMute = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
  <section className="d-flex justify-content-center">
    <div style={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
      
      {/* 🔝 Mood Bar */}
      <Stack sx={{ width: "100%" }}>
        <Slider
          value={mood}
          onChange={(e, val) => setMood(val)}
          defaultValue={30}
          aria-label="Mood Spectrum"
          valueLabelDisplay="auto"
          sx={{
            height: 18,
            "& .MuiSlider-rail": {
              opacity: 1,
              backgroundImage:
                "linear-gradient(90deg, #0000FF, #00FF11, #FFFF00, #FFB300, #FF0000)",
              borderRadius: 6,
            },
            "& .MuiSlider-track": { backgroundColor: "transparent" },
            "& .MuiSlider-thumb": {
              width: 40,
              height: 40,
              backgroundColor: "#fff",
              border: "2px solid #000",
              boxShadow: `0 0 20px ${
                mood < 44
                  ? "blue"
                  : mood < 72
                  ? "yellow"
                  : mood < 86
                  ? "orange"
                  : "red"
              }`,
              transition: "box-shadow 0.3s ease",
            },
          }}
        />
      </Stack>

      {/* ✨ Text */}
      <div className="mt-3 mb-3">
        {mood < 44 && <h4>“Take a deep breath, you’re in balance.”</h4>}
        {mood >= 44 && mood < 72 && <h4>“Your energy is rising—time to focus!”</h4>}
        {mood >= 72 && mood < 86 && <h4>“Tap into your spark and imagination.”</h4>}
        {mood >= 86 && <h4>“Feel the fire—channel it wisely.”</h4>}
      </div>

      {/* 🔊 Mute Button UNDERNEATH */}
      <button
        onClick={toggleMute}
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        <FontAwesomeIcon icon={isSoundOn ? faVolumeUp : faVolumeMute} />
      </button>

      {/* 🎵 Audio */}
      <audio ref={audioRef} loop />
    </div>
  </section>
)};


export default MoodBar;