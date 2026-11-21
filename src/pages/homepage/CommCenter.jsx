
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
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/ABUNDANCE_SUCCESS.mp4",
    },
    {
      id: 2,
      name: "Adventure & Expansion",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/ADVENTURE_EXPANSION.mp4",
    },
    {
      id: 3,
      name: "Calm & Stress Relief",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/CALM_STRESS_RELIEF.mp4",
    },
    {
      id: 4,
      name: "Creativity & Inspiration",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/CREATIVITY_INSPIRATION.mp4",
    },
    {
      id: 5,
      name: "Focus & Productivity",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/FOCUS_PRODUCTIVITY.mp4",
    },
    {
      id: 6,
      name: "Healing & Self-Love",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/HEALING_SELF_LOVE.mp4",
    },
    {
      id: 7,
      name: "Relationships & Connection",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/RELATIONSHIPS_CONNECTION.mp4",
    },
    {
      id: 8,
      name: "Self-Confidence & Empowerment",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmationsSELF_CONFIDENCE_EMPOWERMENT.mp4",
    },
    {
      id: 9,
      name: "Sleep & Rest",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/SLEEP_REST.mp4",
    },
    {
      id: 10,
      name: "Spiritual Growth & Intuition",
      src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/affirmations/SPIRITUAL_GROWTH_INTUITION.mp4",
    },
  ],

  "Soothing Stories": [
  {
    id: 1,
    name: "THE_MUSEUM_OF_UNLIVED_LIVES",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_MUSEUM_OF_UNLIVED_LIVES.mp4",
  },
  {
    id: 2,
    name: "THE_PLANET_THAT_NEVER_SAID_NO",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_PLANET_THAT_NEVER_SAID_NO.mp4",
  },
  {
    id: 3,
    name: "THE_SHIP_THAT_WAS_ALWAYS_RUNNING_LATE",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_SHIP_THAT_WAS_ALWAYS_RUNNING_LATE.mp4",
  },
  {
    id: 4,
    name: "THE_GARDEN_BEHIND_THE_LOCKED_DOOR",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_GARDEN_BEHIND_THE_LOCKED_DOOR.mp4",
  },
  {
    id: 5,
    name: "THE_GIRL_WHO_COLLECTED_OTHER_PEOPLES_STARS",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_GIRL_WHO_COLLECTED_OTHER_PEOPLES_STARS.mp4",
  },
  {
    id: 6,
    name: "THE_OCEAN_THAT_REMEMBERED_EVERYTHING",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_OCEAN_THAT_REMEMBERED_EVERYTHING.mp4",
  },
  {
    id: 7,
    name: "THE_WEIGHT_OF_INVISIBLE_THINGS",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_WEIGHT_OF_INVISIBLE_THINGS.mp4",
  },
  {
    id: 8,
    name: "THE_LAST_LIGHT_ON_PLANET_ELEVEN",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_LAST_LIGHT_ON_PLANET_ELEVEN.mp4",
  },
  {
    id: 9,
    name: "THE_LANGUAGE_BETWEEN_TWO_STARS",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_LANGUAGE_BETWEEN_TWO_STARS.mp4",
  },
  {
    id: 10,
    name: "THE_VERSION_OF_YOU_WAITING_AT_THE_END",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_VERSION_OF_YOU_WAITING_AT_THE_END.mp4",
  },
  {
    id: 11,
    name: "THE_ASTRONAUT_WHO_FORGOT_TO_LOOK_UP",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_ASTRONAUT_WHO_FORGOT_TO_LOOK_UP.mp4",
  },
  {
    id: 12,
    name: "THE_PLANET_THAT_FELT_NOTHING",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_PLANET_THAT_FELT_NOTHING.mp4",
  },
  {
    id: 13,
    name: "THE_SIGNAL_THAT_NEVER_CAME_BACK",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_SIGNAL_THAT_NEVER_CAME_BACK.mp4",
  },
  {
    id: 14,
    name: "THE_DOORWAY_AT_THE_EDGE_OF_SPACE",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_DOORWAY_AT_THE_EDGE_OF_SPACE.mp4",
  },
  {
    id: 15,
    name: "PERMISSION_TO_COME_HOME",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/PERMISSION_TO_COME_HOME.mp4",
  },
  {
    id: 16,
    name: "THE_STAR_THAT_THOUGHT_IT_WAS_ORDINARY",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_STAR_THAT_THOUGHT_IT_WAS_ORDINARY.mp4",
  },
  {
    id: 17,
    name: "THE_THINGS_WE_LEAVE_IN_ORBIT",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_THINGS_WE_LEAVE_IN_ORBIT.mp4",
  },
  {
    id: 18,
    name: "A_QUIET_PLACE_BETWEEN_STARS",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/A_QUIET_PLACE_BETWEEN_STARS.mp4",
  },
  {
    id: 19,
    name: "THE_MORNING_THAT_ARRIVED_SLOWLY",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/soothing-stories/THE_MORNING_THAT_ARRIVED_SLOWLY.mp4",
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
  "littleReminders" : [
  {
    id: 1,
    name: "WHEN EVERYTHING FEELS OVERWHELMING",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/little-reminders/WHEN_EVERYTHING_FEELS_OVERWHELMING.mp4"
  },
  {
    id: 2,
    name: "WHEN YOU FEEL LOST",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/little-reminders/WHEN_YOU_FEEL_LOST.mp4"
  },
  {
    id: 3,
    name: "WHEN YOU FEEL ALONE",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/little-reminders/WHEN_YOU_FEEL_ALONE.mp4"
  },
  {
    id: 4,
    name: "WHEN YOU ARE STRUGGLING WITH SELF-WORTH",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/little-reminders/WHEN_YOU_ARE_STRUGGLING_WITH_SELF-WORTH.mp4"
  },
  {
    id: 5,
    name: "WHEN YOU NEED TO LET GO",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/little-reminders/WHEN_YOU_NEED_TO_LET_GO.mp4"
  },
  {
    id: 6,
    name: "WHEN YOU NEED A LITTLE HOPE",
    src: "https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/little-reminders/WHEN_YOU_NEED_A_LITTLE_HOPE.mp4"
  }
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
