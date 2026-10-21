
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import WavesBackground from "../../components/WavesBackground.jsx";
import styles from "../../styles/CommCenter.module.css";
import IncomingTransmission from "../../components/IncomingTransmission.jsx";
// ==========================================
// AUDIO CHANNELS
// ==========================================

const CHANNELS = {
  "Lofi Beats": [
    {
      id: 5,
      name: "Lofi 5",
      src: "https://pub-530ef92d28424cfd8d38db7199081ada.r2.dev/lofi5.mp4",
    },
    {
      id: 6,
      name: "Lofi 6",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi6.mp3",
    },
    {
      id: 7,
      name: "Lofi 7",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi7.mp3",
    },
    {
      id: 8,
      name: "Lofi 8",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi8.mp3",
    },
    {
      id: 9,
      name: "Lofi 9",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi9.mp3",
    },
    {
      id: 10,
      name: "Lofi 10",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi10.mp3",
    },
     {
      id: 11,
      name: "Lofi 11",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi11.mp3",
    },
     {
      id: 12,
      name: "Lofi 12",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi12.mp3",
    },
     {
      id: 13,
      name: "Lofi 13",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi13.mp3",
    },
     {
      id: 14,
      name: "Lofi 14",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi14.mp3",
    },
     {
      id: 15,
      name: "Lofi 15",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi15.mp3",
    },
     {
      id: 16,
      name: "Lofi 16",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi16.mp3",
    },
     {
      id: 17,
      name: "Lofi 17",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi17.mp3",
    },
     {
      id: 18,
      name: "Lofi 18",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/lofi-beats/lofi18.mp3",
    },
  ],

  Affirmations: [
    {
      id: 1,
      name: "Abundance & Success",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Abundance%26Success.mp3",
    },
    {
      id: 2,
      name: "Adventure & Expansion",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Adventure%26Expansion.mp3",
    },
    {
      id: 3,
      name: "Calm & Stress Relief",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Calm%26StressRelief.mp3",
    },
    {
      id: 4,
      name: "Creativity & Inspiration",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Creativity%26Inspiration.mp3",
    },
    {
      id: 5,
      name: "Focus & Productivity",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Focus%26Productivity.mp3",
    },
    {
      id: 6,
      name: "Healing & Self-Love",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Healing%26Self-Love.mp3",
    },
    {
      id: 7,
      name: "Relationships & Connection",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Relationships%26Connection.mp3",
    },
    {
      id: 8,
      name: "Self-Confidence & Empowerment",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Self-Confidence%26Empowerment.mp3",
    },
    {
      id: 9,
      name: "Sleep & Rest",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/Sleep%26Rest.mp3",
    },
    {
      id: 10,
      name: "Spiritual Growth & Intuition",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/SpiritualGrowth%26Intuition.mp3",
    },
  ],

  "Soothing Stories": [
    {
      id: 1,
      name: "The Lighthouse on the Edge of a Nebula",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/lighthouse.mp3",
    },
    {
      id: 2,
      name: "The Library of Stars",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/libraryS.mp3",
    },
    {
      id: 3,
      name: "The Glass Planet",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/glassP.mp3",
    },
    // {
    //   id: 4,
    //   name: "The Sleeping Comet",
    //   src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/sleepingC.mp3",
    // },
    // {
    //   id: 5,
    //   name: "The Garden on Io",
    //   src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/gardenL.mp3",
    // },
    {
      id: 6,
      name: "The Lighthouse of Andromeda",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/andromeda.mp3",
    },
    {
      id: 7,
      name: "The Bridge of Auroras",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/bridgeAur.mp3",
    },
    // {
    //   id: 8,
    //   name: "The Forgotten Moon",
    //   src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/forgottenM.mp3",
    // },
    // {
    //   id: 9,
    //   name: "The Star Garden",
    //   src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/starGard.mp3",
    // },
    {
      id: 10,
      name: "The Celestial Caravan",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/celestialCara.mp3",
    },
    {
      id: 11,
      name: "The Planet That Felt Nothing",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/Planet_That_felt_nothing.MP3",
    },
    {
      id: 12,
      name: "The Signal That Never Came Back",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/signal_never_came_back.mp3",
    },
    {
      id: 13,
      name: "The Doorway at the Edge of Space",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/doorway_at_the_edge.mp3",
    },
    {
      id: 14,
      name: "The Star That Thought It Was Ordinary",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/star_not_ordinary.mp3",
    },
    {
      id: 15,
      name: "The Things We Leave in Orbit",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/things_in_the_orbit.mp3",
    },
    {
      id: 16,
      name: "The Morning That Arrived Slowly",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/morning_arrived_slowly.mp3",
    },
    {
      id: 17,
      name: "Permission to Come Home",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/permission_to_come.mp3",
    },
    {
      id: 18,
      name: "Enjoy The Journey",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/Enjoy_the_journey.mp3",
    },
  ],

  "Ambient Noise": [
    {
      id: 1,
      name: "Ambiance 1",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient1.mp3",
    },
    {
      id: 2,
      name: "Ambiance 2",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient2.mp3",
    },
    {
      id: 3,
      name: "Ambiance 3",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient3.mp3",
    },
    {
      id: 4,
      name: "Ambiance 4",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient4.mp3",
    },
    {
      id: 5,
      name: "Ambiance 5",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient5.mp3",
    },
    {
      id: 6,
      name: "Ambiance 6",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient6.mp3",
    },
    {
      id: 7,
      name: "Ambiance 7",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient7.mp3",
    },
    {
      id: 8,
      name: "Ambiance 8",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient8.mp3",
    },
    {
      id: 9,
      name: "Ambiance 9",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient9.mp3",
    },
    {
      id: 10,
      name: "Ambiance 10",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient10.mp3",
    },
    {
      id: 11,
      name: "Ambiance 11",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient11.mp3",
    },
    {
      id: 12,
      name: "Ambiance 12",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient12.mp3",
    },
    {
      id: 13,
      name: "Ambiance 13",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient13.mp3",
    },
    {
      id: 14,
      name: "Ambiance 14",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient14.mp3",
    },
    {
      id: 15,
      name: "Ambiance 15",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient15.mp3",
    },
    {
      id: 16,
      name: "Ambiance 16",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/ambient-noise/ambient16.mp3",
    },
  ],
};

// ==========================================
// COMM CENTER
// ==========================================

const CommCenter = () => {
  const [showTransmission, setShowTransmission] = useState(false);
  const navigate = useNavigate();
  const [currentChannel, setCurrentChannel] = useState("Lofi Beats");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState("");

  const audioRef = useRef(null);

  const playlist = CHANNELS[currentChannel] || [];
  const currentTrack = playlist[currentIndex] || null;

  // Create a new audio player whenever the track changes.
  useEffect(() => {
    if (!currentTrack) return;

    const audio = new Audio(currentTrack.src);

    audio.preload = "metadata";
    audio.volume = 0.5;
    audio.muted = isMuted;

    audioRef.current = audio;
    setAudioError("");

    const handleEnded = () => {
      setCurrentIndex((previousIndex) =>
        previousIndex >= playlist.length - 1 ? 0 : previousIndex + 1
      );
    };

    const handleError = () => {
      setIsPlaying(false);
      setAudioError(
        "This transmission could not be loaded. Please try another track."
      );
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [currentTrack?.src, playlist.length]);

  // Keep the audio volume and mute state in sync.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 0.5;
    }
  }, [isMuted, currentTrack]);

  // Play or pause the current track when the state changes.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Unable to play audio:", error);
        setIsPlaying(false);
        setAudioError(
          "Playback was unavailable. Please try pressing play again."
        );
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const handlePlay = () => {
    setAudioError("");
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (!playlist.length) return;

    setCurrentIndex((previousIndex) =>
      previousIndex >= playlist.length - 1 ? 0 : previousIndex + 1
    );
    setAudioError("");
  };

  const handlePrev = () => {
    if (!playlist.length) return;

    setCurrentIndex((previousIndex) =>
      previousIndex <= 0 ? playlist.length - 1 : previousIndex - 1
    );
    setAudioError("");
  };

  const handleVolumeToggle = () => {
    setIsMuted((previousMuted) => !previousMuted);
  };

  const handleChannelChange = (channel) => {
    setIsPlaying(false);
    setCurrentChannel(channel);
    setCurrentIndex(0);
    setAudioError("");
  };

  return (
    <>
      <Helmet>
        <title>Comm Center Radio | Solayulm</title>
        <meta
          name="description"
          content="Tune into Solayulm's Comm Center for calming music, affirmations, ambient sounds and soothing stories."
        />
      </Helmet>

      <main className={styles.commCenterPage}>
        <Container>
          {/* Page introduction */}
          <Row className="text-center mb-5">
            <Col>
              <h1>Comm Center</h1>
              <p className={styles.introText}>
                Tune into calming transmissions. Find a sound that meets you
                where you are, and give yourself a moment to simply listen.
              </p>
            </Col>
          </Row>

          {/* Disclaimer */}
          <Row className="mb-4">
            <Col>
              <section className={styles.disclaimer}>
                <h2>
                  <strong>A little note before you tune in</strong>
                </h2>

                <p>
                  The Comm Center is designed without visuals on purpose. In a
                  world where we are constantly stimulated by screens, this
                  space invites you to step away from visual overload and
                  focus on sound.
                </p>

                <p>
                  If it feels comfortable, close your eyes and settle into the
                  transmission. Whether you choose calming beats, affirmations
                  or a soothing story, there is no right way to experience
                  this moment.
                </p>
              </section>
            </Col>
          </Row>

          {/* Audio player */}
          <section className={styles.wrapper} aria-label="Audio player">
            <div className={styles.borderWrapper}>
              <div className={styles.gradientBox}>
                {/* Current transmission */}
                <Row className="my-3">
                  <Col className={styles.trackInfo}>
                    <h3>Current Channel: {currentChannel}</h3>

                    <p>
                      {currentTrack
                        ? `Now selected: ${currentTrack.name}`
                        : "No transmission available"}
                    </p>
                  </Col>
                </Row>

                {/* Player controls and wave visual */}
                <Row className={styles.playerRow}>
                  <Col xs={12} md={6} className={styles.playerControls}>
                    <div
                      className={styles.controlGroup}
                      aria-label="Playback controls"
                    >
                      <Button
                        type="button"
                        className={styles.controlButton}
                        onClick={handlePlay}
                        disabled={!currentTrack || isPlaying}
                        aria-label="Play audio"
                        title="Play"
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </Button>

                      <Button
                        type="button"
                        className={styles.controlButton}
                        onClick={handlePause}
                        disabled={!currentTrack || !isPlaying}
                        aria-label="Pause audio"
                        title="Pause"
                      >
                        <FontAwesomeIcon icon={faPause} />
                      </Button>

                      <Button
                        type="button"
                        className={styles.controlButton}
                        onClick={handleVolumeToggle}
                        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        aria-pressed={isMuted}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        <FontAwesomeIcon
                          icon={isMuted ? faVolumeMute : faVolumeUp}
                        />
                      </Button>
                    </div>

                    <div
                      className={styles.controlGroup}
                      aria-label="Track navigation"
                    >
                      <Button
                        type="button"
                        className={styles.controlButton}
                        onClick={handlePrev}
                        disabled={playlist.length < 2}
                        aria-label="Previous track"
                        title="Previous track"
                      >
                        <FontAwesomeIcon icon={faBackward} />
                      </Button>

                      <Button
                        type="button"
                        className={styles.controlButton}
                        onClick={handleNext}
                        disabled={playlist.length < 2}
                        aria-label="Next track"
                        title="Next track"
                      >
                        <FontAwesomeIcon icon={faForward} />
                      </Button>
                    </div>

                    {audioError && (
                      <p className={styles.audioError} role="alert">
                        {audioError}
                      </p>
                    )}
                  </Col>

                  {/* Decorative sound waves */}
                  <Col xs={12} md={6} className={styles.visualColumn}>
                    <div
                      className={styles.circleBorder}
                      aria-hidden="true"
                    >
                      <WavesBackground />
                    </div>
                  </Col>
                </Row>

                {/* Channel selector */}
                <section
                  className={styles.channelSection}
                  aria-label="Choose an audio channel"
                >
                  <h3 className={styles.channelHeading}>
                    Choose Your Transmission
                  </h3>

                  <div className={styles.channelList}>
                    {Object.keys(CHANNELS).map((channel) => {
                      const isActive = channel === currentChannel;

                      return (
                        <Button
                          key={channel}
                          type="button"
                          className={`${styles.channelButton} ${
                            isActive ? styles.activeChannel : ""
                          }`}
                          aria-pressed={isActive}
                          onClick={() => handleChannelChange(channel)}
                        >
                          {channel}
                        </Button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </section>

          {/* Exit */}
          {/* <div className={styles.exitSection}>
            <Link to="/Rooms" aria-label="Return to the rooms">
              <Button
                type="button"
                className={styles.exitButton}
              >
                Exit 
              </Button>
            </Link>
          </div> */}

          <div className={styles.exitSection}>
            <button
              type="button"
              className={styles.exitButton}
              onClick={() => setShowTransmission(true)}
            >
              Return to rooms
            </button>
          </div>
          
          <IncomingTransmission
            isOpen={showTransmission}
            onClose={() => setShowTransmission(false)}
            onContinue={() => navigate("/Rooms")}
          />
        </Container>
      </main>
    </>
  );
};

export default CommCenter;
