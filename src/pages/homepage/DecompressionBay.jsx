import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/DecompressionBay.module.css";
import CustomCountdownTimer from "../../components/CustomCountdownTimer.jsx";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import DecompressionLoop from "../../components/DecompressionLoop.jsx"; 
import  FlowerLifeLoop  from "../../components/FlowerLifeLoop.jsx";
import { SpiralLoop } from "../../components/SpiralLoop.jsx";
import { NebulaFlow } from "../../components/NebulaFlow.jsx";
import   JumpingDots  from "../../components/JumpingDots.jsx";
import { RotatingRings } from "../../components/RotatingRings.jsx";
import  MoodBar  from "../../components/MoodBar.jsx";
import  FocusDial  from "../../components/FocusDial.jsx";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async"


// import React, { useState } from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router';
// import { Helmet } from 'react-helmet-async';

// import styles from '../../styles/DecompressionBay.module.css';
// import CustomCountdownTimer from '../../components/CustomCountdownTimer.jsx';
// import MoodBar from '../../components/MoodBar.jsx';
// import RotatingRings from '../../components/RotatingRings.jsx';

const mediaOptions = [
  {
    label: 'Nebula Drift',
    src: '/videos/auroraOB.mp4',
  },
  {
    label: 'Stellar Nursery',
    src: '/videos/galaxyVideo-OB.mp4',
  },
  {
    label: 'Cosmic Dance',
    src: '/videos/purple-blue-illum.mp4',
  },
  {
    label: 'Black Hole Horizon',
    src: '/videos/green-purplegal.mp4',
  },
  {
    label: 'Aurora Expanse',
    src: '/videos/green-gas.mp4',
  },
  {
    label: 'Quantum Twilight',
    src: '/videos/white-gold-solar.mp4',
  },
];

const reflectionOptions = {
  stress: {
    label: 'Stressed',
    questions: [
      'Am I safe in this moment, and what is the very next small step I can take right now?',
      'Is the thought that is stressing me a fact, or just a feeling — and how might I see it if I stepped back from it?',
      'If my best friend were feeling this way, what would I say to them — and why don’t I deserve the same kindness?',
      'What part of this situation is mine to carry, and what part can I gently release or trust time to handle?',
      'Where in my body am I holding this stress — and if I breathe into that space, what shift do I feel?',
    ],
  },

  calm: {
    label: 'Calm',
    questions: [
      'What is steady and unchanging in this moment that I can lean on, even briefly?',
      'Instead of “I can’t calm down,” could I see it as “I am learning what soothes me” — what could that be right now?',
      'If it is okay to be a work in progress, how might I treat myself more gently in this moment of restlessness?',
      'Which part of this tension belongs to me, and which part is simply not mine to hold?',
      'Where does calm already exist in me — perhaps in my breath, my heartbeat, or my stillness — and can I rest my awareness there?',
    ],
  },

  energy: {
    label: 'Energy',
    questions: [
      'What is one thing in my environment right now that sparks a little sense of aliveness?',
      'Instead of “I have no energy,” could it be “My energy is waiting for the right spark” — what could that spark be?',
      'If my body is asking me to rest before it rises, how can I honour that without judgment?',
      'What weight am I carrying today that drains me, and which of those can I lay down for now?',
      'What breath, stretch, or movement could invite a spark of energy into me right now?',
    ],
  },
};

const sessionOptions = [
  { label: '5 minutes', time: 5 },
  { label: '10 minutes', time: 10 },
  { label: '15 minutes', time: 15 },
  { label: '20 minutes', time: 20 },
  { label: '30 minutes', time: 30 },
  { label: '45 minutes', time: 45 },
  { label: '60 minutes', time: 60 },
];

const DecompressionBay = () => {
  const [duration, setDuration] = useState(300);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showVisuals, setShowVisuals] = useState(false);
  const [activeMedia, setActiveMedia] = useState(mediaOptions[1]);
  const [selectedDuration, setSelectedDuration] = useState(5);

  const handleDurationChange = (minutes) => {
    setSelectedDuration(minutes);
    setDuration(minutes * 60);
  };

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <>
      <Helmet>
        <title>
          Decompression Bay – Visual Meditation & Emotional Release | Solayulm
        </title>

        <meta
          name="description"
          content="Unwind in the Decompression Bay — an immersive visual experience designed to help you let go, reflect and reset."
        />

        <meta
          property="og:title"
          content="Decompression Bay | Solayulm"
        />

        <meta
          property="og:description"
          content="Breathe. Watch. Release. A meditative digital space to soothe your mind."
        />
      </Helmet>

      <Container fluid className={styles.page}>
        {/* Welcome section */}

        <header className={styles.hero}>
          <p>YOUR QUIET SPACE IN THE COSMOS</p>

          <h1>Decompression Bay</h1>

          <p>
            A moment away from the noise. Take a breath, settle into
            the present, and give yourself room to reset.
          </p>
        </header>

        {/* Reflection section */}

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>
            Check in with yourself
          </h2>

          <p className={styles.sectionIntro}>
            There is no right or wrong way to feel.
            Choose what feels closest to you right now.
          </p>

          <div className={styles.moodChoices}>
            <button
              type="button"
              className={`${styles.moodChoice} ${
                selectedMood === 'stress' ? styles.active : ''
              }`}
              aria-pressed={selectedMood === 'stress'}
              onClick={() => handleMoodChange('stress')}
            >
              <span aria-hidden="true">☁</span>
              <br />
              Stressed
            </button>

            <button
              type="button"
              className={`${styles.moodChoice} ${
                selectedMood === 'calm' ? styles.active : ''
              }`}
              aria-pressed={selectedMood === 'calm'}
              onClick={() => handleMoodChange('calm')}
            >
              <span aria-hidden="true">☾</span>
              <br />
              Calm
            </button>

            <button
              type="button"
              className={`${styles.moodChoice} ${
                selectedMood === 'energy' ? styles.active : ''
              }`}
              aria-pressed={selectedMood === 'energy'}
              onClick={() => handleMoodChange('energy')}
            >
              <span aria-hidden="true">✧</span>
              <br />
              Energy
            </button>
          </div>

          {selectedMood && (
            <div className={styles.reflectionPanel}>
              <div>
                <RotatingRings />
              </div>

              <div className={styles.reflectionQuestions}>
                <h3 className={styles.sectionHeading}>
                  A moment to reflect
                </h3>

                <p className={styles.sectionIntro}>
                  {selectedMood === 'stress' &&
                    'You do not have to solve everything at once.'}

                  {selectedMood === 'calm' &&
                    'Give yourself permission to notice the quiet.'}

                  {selectedMood === 'energy' &&
                    'Small sparks count, even on slower days.'}
                </p>

                {reflectionOptions[selectedMood].questions.map(
                  (question, index) => (
                    <p
                      key={`${selectedMood}-${index}`}
                      className={styles.reflectionQuestion}
                    >
                      {question}
                    </p>
                  )
                )}
              </div>
            </div>
          )}
        </section>

        {/* Meditation session */}

        <section className={styles.section}>
          <div className={styles.sessionPanel}>
            <h2 className={styles.sectionHeading}>
              Settle into your own rhythm
            </h2>

            <p className={styles.sectionIntro}>
              Choose how long you would like to pause.
              This time is yours.
            </p>

            {/* Session duration */}

            <h3>Choose your session length</h3>

            <div className={styles.durationChoices}>
              {sessionOptions.map((option) => (
                <Button
                  key={option.time}
                  type="button"
                  className={styles.MinutesButton2}
                  variant="outline-info"
                  aria-pressed={selectedDuration === option.time}
                  onClick={() => handleDurationChange(option.time)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Countdown timer */}

            <div className={styles.timerArea}>
              <p className={styles.sectionIntro}>
                Let everything else wait for a moment.
              </p>

              <CustomCountdownTimer duration={duration} />
            </div>

            {/* Galaxy visuals

            <div className={styles.spectrumSection}>
              <h3 className={styles.sectionHeading}>
                Choose your cosmic view
              </h3>

              <p className={styles.sectionIntro}>
                Find a visual that feels right for your moment.
              </p>

              <div className={styles.durationChoices}>
                {mediaOptions.map((media) => (
                  <Button
                    key={media.src}
                    type="button"
                    className={styles.MinutesButton2}
                    variant="outline-info"
                    aria-pressed={activeMedia.src === media.src}
                    onClick={() => {
                      setActiveMedia(media);
                      setShowVisuals(true);
                    }}
                  >
                    {media.label}
                  </Button>
                ))}
              </div>

              <Button
                type="button"
                className={styles.MinutesButton2}
                variant="outline-info"
                onClick={() => setShowVisuals((previous) => !previous)}
                aria-expanded={showVisuals}
              >
                {showVisuals ? 'Hide visuals' : 'Enter visual meditation'}
              </Button>

              {showVisuals && (
                <div
                  style={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: '28px auto 0',
                    overflow: 'hidden',
                    border: '1px solid rgba(221, 176, 255, 0.4)',
                    borderRadius: '18px',
                    backgroundColor: '#100d19',
                  }}
                >
                  <video
                    key={activeMedia.src}
                    src={activeMedia.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    aria-label={activeMedia.label}
                    style={{
                      display: 'block',
                      width: '100%',
                      maxHeight: '450px',
                      objectFit: 'cover',
                    }}
                  >
                    Your browser does not support embedded videos.
                  </video>

                  <p
                    style={{
                      margin: '0',
                      padding: '14px',
                      color: '#ddb0ff',
                      textAlign: 'center',
                    }}
                  >
                    {activeMedia.label}
                  </p>
                </div>
              )}
            </div> */}

            {/* Mood Spectrum */}

            <div className={styles.spectrumSection}>
              <h3 className={styles.sectionHeading}>
                Mood Spectrum
              </h3>

              <p className={styles.sectionIntro}>
                Notice how you feel, without judging where you are.
              </p>

              <MoodBar />
            </div>
          </div>
        </section>

        {/* Return to rooms */}

        <footer className={styles.exitArea}>
          <Link to="/Rooms" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
            <Button
              type="button"
              className={styles.MinutesButton}
              variant="outline-info"
            >
              Return to Rooms
            </Button>
          </Link>
        </footer>
      </Container>
    </>
  );
};

export default DecompressionBay;
