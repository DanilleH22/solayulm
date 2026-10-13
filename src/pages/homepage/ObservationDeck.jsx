
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faVolumeMute,
  faHeart,
  faWind,
  faWater,
  faFire,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import GalaxyShader from "../../components/GalaxyShader.jsx";
import RedGalaxyShader from "../../components/RedGalaxyShader.jsx";
import PurpleNebula from "../../components/PurpleNebula.jsx";
import styles from "../../styles/ObservationDeck.module.css";

import IncomingTransmission from "../../components/IncomingTransmission.jsx";

// =========================
// AMBIENT SOUNDS
// =========================

  
const ambientSounds = [
  {
    name: "Space Ambience",
    src: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/spaceSound.mp3",
  },
  {
    name: "Calming Waves",
    src: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/wavesSound.mp3",
  },
  {
    name: "Gentle Rain",
    src: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/gentleRain.mp3",
  },
  {
    name: "Forest Sounds",
    src: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/seasideSound.mp3",
  },
];

const shaders = [
  {
    id: "redGalaxy",
    name: "Red Galaxy",
    component: RedGalaxyShader,
  },
  {
    id: "purpleNebula",
    name: "Purple Nebula",
    component: PurpleNebula,
  },
];

const breathingPatterns = [
  { id: "box", name: "Box Breathing", pattern: [4, 4, 4, 4] },
  { id: "478", name: "4-7-8 Method", pattern: [4, 7, 8, 0] },
  { id: "coherent", name: "Coherent Breathing", pattern: [5, 5, 5, 5] },
];

const groundingExercises = [
  {
    number: 5,
    title: "5 Things You Can See",
    description: "Look around and notice five things you can see.",
  },
  {
    number: 4,
    title: "4 Things You Can Feel",
    description: "Notice four things you can touch or feel.",
  },
  {
    number: 3,
    title: "3 Things You Can Hear",
    description: "Listen for three distinct sounds.",
  },
  {
    number: 2,
    title: "2 Things You Can Smell",
    description: "Notice two things you can smell.",
  },
  {
    number: 1,
    title: "1 Thing You Can Taste",
    description: "Notice one thing you can taste.",
  },
];

const ObservationDeck = () => {
  // =========================
  // STATE
  // =========================
  const [showTransmission, setShowTransmission] = useState(false);
const navigate = useNavigate();

  const [isSoundOn, setIsSoundOn] = useState(false);
  const [activeShader, setActiveShader] = useState("redGalaxy");

  const [activeFeature, setActiveFeature] = useState("gratitude");
  const [gratitudeEntry, setGratitudeEntry] = useState("");
  const [gratitudeList, setGratitudeList] = useState([]);

  const [currentSound, setCurrentSound] = useState(0);
  const audioRef = useRef(null);

  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("in");
  const [breathProgress, setBreathProgress] = useState(0);
  const breathingTimerRef = useRef(null);

  const [breathingPattern, setBreathingPattern] = useState("box");

  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  // =========================
  // AUDIO
  // =========================

  useEffect(() => {
    const audio = new Audio(ambientSounds[currentSound].src);

    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [currentSound]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isSoundOn) {
      audio.play().catch((error) => {
        console.warn("Audio playback could not start:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isSoundOn, currentSound]);

  const handleSoundChange = (event) => {
    setCurrentSound(Number(event.target.value));
  };

  // =========================
  // BREATHING EXERCISE
  // =========================

  useEffect(() => {
    if (!isBreathingActive) {
      setBreathPhase("in");
      setBreathProgress(0);
      return;
    }

    const selectedPattern = breathingPatterns.find(
      (pattern) => pattern.id === breathingPattern
    );

    if (!selectedPattern) return;

    const steps = [
      { phase: "in", duration: selectedPattern.pattern[0] },
      { phase: "hold", duration: selectedPattern.pattern[1] },
      { phase: "out", duration: selectedPattern.pattern[2] },
      { phase: "hold-out", duration: selectedPattern.pattern[3] },
    ].filter((step) => step.duration > 0);

    const totalTime = steps.reduce(
      (total, step) => total + step.duration,
      0
    );

    const startTime = Date.now();

    const updateBreathing = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const cycleTime = elapsed % totalTime;

      let accumulated = 0;

      for (const step of steps) {
        const stepStart = accumulated;
        accumulated += step.duration;

        if (cycleTime < accumulated) {
          const progress =
            ((cycleTime - stepStart) / step.duration) * 100;

          setBreathPhase(step.phase);
          setBreathProgress(progress);
          break;
        }
      }
    };

    updateBreathing();

    breathingTimerRef.current = setInterval(updateBreathing, 100);

    return () => {
      if (breathingTimerRef.current) {
        clearInterval(breathingTimerRef.current);
        breathingTimerRef.current = null;
      }
    };
  }, [isBreathingActive, breathingPattern]);

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
  };

  const getBreathText = () => {
    switch (breathPhase) {
      case "in":
        return "Breathe In";
      case "hold":
      case "hold-out":
        return "Hold";
      case "out":
        return "Breathe Out";
      default:
        return "Breathe In";
    }
  };

  const getCircleSize = () => {
    if (breathPhase === "in") {
      return 80 + (breathProgress / 100) * 60;
    }

    if (breathPhase === "out") {
      return 140 - (breathProgress / 100) * 60;
    }

    return breathPhase === "hold" ? 140 : 80;
  };

  // =========================
  // GRATITUDE JOURNAL
  // =========================

  const addGratitudeItem = () => {
    const entry = gratitudeEntry.trim();

    if (!entry) return;

    setGratitudeList((previousList) => [...previousList, entry]);
    setGratitudeEntry("");
  };

  const handleSaveThoughts = () => {
    setText("");
    setShow(true);
  };

  // =========================
  // ACTIVE FEATURE CONTENT
  // =========================

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case "gratitude":
        return (
          <div>
            <h3 className={styles.featureTitle}>Gratitude Journal</h3>

            <p className={styles.featureText}>
              Take a moment to reflect on things you're grateful for today.
            </p>

            <div className={styles.gratitudeForm}>
              <input
                type="text"
                value={gratitudeEntry}
                onChange={(event) =>
                  setGratitudeEntry(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addGratitudeItem();
                  }
                }}
                placeholder="What are you grateful for today?"
                className={styles.gratitudeInput}
                aria-label="Gratitude entry"
              />

              <button
                type="button"
                onClick={addGratitudeItem}
                className={styles.actionButton}
              >
                Add
              </button>
            </div>

            {gratitudeList.length > 0 && (
              <div className={styles.gratitudeList}>
                <h4 className={styles.gratitudeListTitle}>
                  Your Gratitude List:
                </h4>

                <ul>
                  {gratitudeList.map((item, index) => (
                    <li key={`${index}-${item}`}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={styles.gratitudeHeart}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case "breathing":
        return (
          <div>
            <h3 className={styles.featureTitle}>
              Breathing Exercises
            </h3>

            <p className={styles.featureText}>
              Select a breathing pattern to help regulate your nervous system.
            </p>

            <div className={styles.buttonGroup}>
              {breathingPatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => setBreathingPattern(pattern.id)}
                  disabled={isBreathingActive}
                  className={`${styles.deckButton} ${
                    breathingPattern === pattern.id
                      ? styles.selectedButton
                      : ""
                  }`}
                  aria-pressed={breathingPattern === pattern.id}
                >
                  <span>
                    {pattern.name}
                    <br />
                    <small>
                      {pattern.pattern[0]}s in -{" "}
                      {pattern.pattern[1]}s hold -{" "}
                      {pattern.pattern[2]}s out
                      {pattern.pattern[3] > 0
                        ? ` - ${pattern.pattern[3]}s hold`
                        : ""}
                    </small>
                  </span>
                </button>
              ))}
            </div>

            <div
              className={styles.breathingCircle}
              style={{
                width: `${getCircleSize()}px`,
                height: `${getCircleSize()}px`,
                backgroundColor:
                  breathPhase === "hold" || breathPhase === "hold-out"
                    ? "rgba(169, 125, 203, 0.95)"
                    : "rgba(221, 176, 255, 0.95)",
              }}
              aria-live="polite"
            >
              <span>{getBreathText()}</span>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="Breathing phase progress"
              aria-valuenow={Math.round(breathProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.progressFill}
                style={{ width: `${breathProgress}%` }}
              />
            </div>

            <div className="d-flex justify-content-center">
              {!isBreathingActive ? (
                <button
                  type="button"
                  onClick={startBreathingExercise}
                  className={styles.actionButton}
                >
                  Start Breathing Exercise
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopBreathingExercise}
                  className={styles.actionButton}
                >
                  Stop Exercise
                </button>
              )}
            </div>
          </div>
        );

      case "senses":
        return (
          <div>
            <h3 className={styles.featureTitle}>
              5-4-3-2-1 Grounding Technique
            </h3>

            <p className={styles.featureText}>
              A simple exercise to help bring you into the present moment.
            </p>

            {groundingExercises.map((exercise) => (
              <div
                key={exercise.number}
                className={styles.groundingItem}
              >
                <h4>{exercise.title}</h4>
                <p>{exercise.description}</p>
              </div>
            ))}

            <div className="mt-4">
              <textarea
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                  setShow(false);
                }}
                placeholder="Type your thoughts here..."
                rows={6}
                className={styles.deckTextarea}
                aria-label="Your grounding reflections"
              />

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  onClick={handleSaveThoughts}
                  className={styles.actionButton}
                >
                  Save
                </button>
              </div>

              <Alert
                show={show}
                onClose={() => setShow(false)}
                dismissible
                className={styles.customAlert}
              >
                <p>Your response has been saved</p>
              </Alert>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // =========================
  // PAGE
  // =========================

  const ActiveShader =
    shaders.find((shader) => shader.id === activeShader)?.component ||
    GalaxyShader;

  return (
    <>
      <Helmet>
        <title>
          Observation Deck – Meditate &amp; Visualise Among the Stars |
          Solayulm
        </title>

        <meta
          name="description"
          content="Observe your thoughts and the cosmos on the Solayulm Observation Deck — meditate, express gratitude, and expand your awareness."
        />

        <meta
          property="og:title"
          content="Observation Deck | Solayulm"
        />

        <meta
          property="og:description"
          content="A cosmic space for mindfulness, music, and visual meditation."
        />
      </Helmet>

      <main className={styles.galaxyPage}>
        {/* HEADER */}

        <header className={styles.deckHeader}>
          <h1 className={styles.deckTitle}>Observation Deck</h1>

          <p className={styles.deckSubtitle}>
            Your sanctuary for relaxation and mindfulness
          </p>
        </header>

        <div className={styles.deckContent}>
          {/* SHADER DISPLAY */}

          <section
            className={styles.shaderFrame}
            aria-label="Cosmic visual experience"
          >
            <ActiveShader />
          </section>

          {/* CONTROL PANEL */}

          <section className={styles.controlPanel}>
            <Row className="g-3">
              {/* VISUAL EXPERIENCES */}

              <Col xs={12} md={4}>
                <div className={styles.controlSection}>
                  <h3 className={styles.sectionTitle}>
                    <FontAwesomeIcon
                      icon={faFire}
                      className="me-2"
                    />
                    Visual Experiences
                  </h3>

                  <div className={styles.buttonGroup}>
                    {shaders.map((shader) => (
                      <button
                        key={shader.id}
                        type="button"
                        onClick={() => setActiveShader(shader.id)}
                        className={`${styles.deckButton} ${
                          activeShader === shader.id
                            ? styles.selectedButton
                            : ""
                        }`}
                        aria-pressed={activeShader === shader.id}
                      >
                        {shader.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Col>

              {/* SOUNDSCAPE */}

              <Col xs={12} md={4}>
                <div className={styles.controlSection}>
                  <h3 className={styles.sectionTitle}>
                    <FontAwesomeIcon
                      icon={isSoundOn ? faVolumeUp : faVolumeMute}
                      className="me-2"
                    />
                    Soundscape
                  </h3>

                  <div className={styles.soundControls}>
                    <button
                      type="button"
                      onClick={() => setIsSoundOn((previous) => !previous)}
                      className={styles.soundToggle}
                      aria-label={
                        isSoundOn
                          ? "Mute ambient sound"
                          : "Play ambient sound"
                      }
                      aria-pressed={isSoundOn}
                    >
                      <FontAwesomeIcon
                        icon={isSoundOn ? faVolumeUp : faVolumeMute}
                      />
                    </button>

                    <select
                      value={currentSound}
                      onChange={handleSoundChange}
                      className={styles.soundSelect}
                      aria-label="Choose ambient sound"
                    >
                      {ambientSounds.map((sound, index) => (
                        <option key={sound.name} value={index}>
                          {sound.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Col>

              {/* RELAXATION TOOLS */}

              <Col xs={12} md={4}>
                <div className={styles.controlSection}>
                  <h3 className={styles.sectionTitle}>
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="me-2"
                    />
                    Relaxation Tools
                  </h3>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={() => setActiveFeature("gratitude")}
                      className={`${styles.toolButton} ${
                        activeFeature === "gratitude"
                          ? styles.selectedButton
                          : ""
                      }`}
                      aria-pressed={activeFeature === "gratitude"}
                    >
                      Gratitude
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveFeature("breathing")}
                      className={`${styles.toolButton} ${
                        activeFeature === "breathing"
                          ? styles.selectedButton
                          : ""
                      }`}
                      aria-pressed={activeFeature === "breathing"}
                    >
                      <FontAwesomeIcon
                        icon={faWind}
                        className="me-2"
                      />
                      Breathing
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveFeature("senses")}
                      className={`${styles.toolButton} ${
                        activeFeature === "senses"
                          ? styles.selectedButton
                          : ""
                      }`}
                      aria-pressed={activeFeature === "senses"}
                    >
                      <FontAwesomeIcon
                        icon={faWater}
                        className="me-2"
                      />
                      Senses
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </section>

          {/* ACTIVE FEATURE */}

          <section className={styles.featurePanel}>
            {renderActiveFeature()}
          </section>
        </div>

        {/* EXIT */}

        
<Row className={styles.exitSection}>
  <Col xs={12}>
    <button
      type="button"
      className={styles.customExitBtn}
      onClick={() => setShowTransmission(true)}
    >
      Return to rooms
    </button>
  </Col>
</Row>

<IncomingTransmission
  isOpen={showTransmission}
  onClose={() => setShowTransmission(false)}
  onContinue={() => navigate("/Rooms")}
/>

      </main>
    </>
  );
};

export default ObservationDeck;
