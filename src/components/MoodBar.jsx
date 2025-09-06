import React, { useState, useEffect, useRef } from "react";
import { Slider, Stack } from "@mui/material";
import aromatic from "../assets/music/aromatic.mp3";
import ABeautifulGarden from "../assets/music/ABeautifulGarden.mp3";
import FallingIntoYou from "../assets/music/FallingIntoYou.mp3";
import future from "../assets/music/Face_The_Future.mp3";

const MoodBar = () => {
  const [mood, setMood] = useState(30);
  const [currentSection, setCurrentSection] = useState("calm");
  const audioRef = useRef(null);

  const moodSounds = {
    calm: aromatic,
    bright: ABeautifulGarden,
    intense: FallingIntoYou,
    fire: future,
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

  // Play audio on section change — after user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = moodSounds[currentSection];
    audio.load();

    const playAudio = () => {
      audio.play().catch(() => {
        // may fail if user hasn't interacted
        console.log("Click somewhere to start audio");
      });
      // remove listener after first play
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    // Trigger play on first user gesture
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("keydown", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
  }, [currentSection]);

  return (
    <Stack sx={{ width: "100%", maxWidth: "800px" }}>
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

      <div className="text-center mb-3">
        {mood < 44 && <h4 className="text-blue-400">“Take a deep breath, you’re in balance.”</h4>}
        {mood >= 44 && mood < 72 && <h4 className="text-yellow-400">“Your energy is rising—time to focus!”</h4>}
        {mood >= 72 && mood < 86 && <h4 className="text-orange-400">“Tap into your spark and imagination.”</h4>}
        {mood >= 86 && <h4 className="text-red-400">“Feel the fire—channel it wisely.”</h4>}
      </div>

      <audio ref={audioRef} loop />
    </Stack>
  );
};

export default MoodBar;
