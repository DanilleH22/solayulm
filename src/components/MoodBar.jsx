import React, { useState, useEffect, useRef } from "react";
import { Slider, Stack } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const MoodBar = () => {
  const [mood, setMood] = useState(30);
  const [currentSection, setCurrentSection] = useState("calm");
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const audioRef = useRef(null);

  // 🔊 Cloudflare R2 URLs
  const moodSounds = {
  calm: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/aromatic.mp3",  
  bright: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/ABeautifulGarden.mp3",
  intense: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/FallingIntoYou.mp3",
  fire: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/Face_The_Future.mp3",
};

  // Update current section based on mood
  useEffect(() => {
    let section = "";
    if (mood < 44) section = "calm";
    else if (mood < 72) section = "bright";
    else if (mood < 86) section = "intense";
    else section = "fire";

    setCurrentSection(section);
  }, [mood]);

  // Handle first user interaction (required for iOS)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleFirstInteraction = () => {
      setIsUserInteracted(true);
      if (isSoundOn) {
        audio.play().catch((err) => console.log("iOS play error:", err));
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isSoundOn]);

  // Play / pause audio when section changes or sound toggled
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Stop current audio
    audio.pause();

    // Set new source
    audio.src = moodSounds[currentSection];
    audio.load();

    // Only play if user has interacted and sound is on
    if (isSoundOn && isUserInteracted) {
      audio.play().catch((err) => console.log("Error playing audio:", err));
    }
  }, [currentSection, isSoundOn, isUserInteracted]);

  // Toggle mute
  const toggleMute = () => {
    setIsSoundOn(!isSoundOn);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = !isSoundOn ? 1 : 0;
    }
  };

  return (
    <section className="d-flex justify-content-center mt-4">
      <div style={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
        {/* 🔝 Mood Slider */}
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

        {/* ✨ Mood Text */}
        <div className="mt-3 mb-3">
          {mood < 44 && <h4>“Take a deep breath, you’re in balance.”</h4>}
          {mood >= 44 && mood < 72 && <h4>“Your energy is rising—time to focus!”</h4>}
          {mood >= 72 && mood < 86 && <h4>“Tap into your spark and imagination.”</h4>}
          {mood >= 86 && <h4>“Feel the fire—channel it wisely.”</h4>}
        </div>

        {/* 🔊 Mute Button */}
        <button
          onClick={toggleMute}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "28px",
          }}
        >
          <FontAwesomeIcon icon={isSoundOn ? faVolumeUp : faVolumeMute} />
        </button>

        {/* 🎵 Audio Element */}
        <audio ref={audioRef} loop preload="auto" />
      </div>
    </section>
  );
};

export default MoodBar;
