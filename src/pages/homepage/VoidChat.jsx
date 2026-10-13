import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import ShootingStars from "../../components/ShootingStars.jsx";
import { Aurora } from "../../components/Aurora.jsx";
import styles from "../../styles/VoidChat.module.css";

import IncomingTransmission from "../../components/IncomingTransmission.jsx";



const journalPromptsArray = [
  "What is something you're grateful for today, no matter how small?",
  "What would you do if you weren't afraid of failing?",
  "What does your ideal day look like from start to finish?",
  "What's a limiting belief you hold about yourself that might not be true?",
  "What makes you feel most alive and energized?",
  "If you could give your younger self one piece of advice, what would it be?",
  "What boundaries do you need to set to protect your energy?",
  "What does 'enough' look like for you right now?",
  "What's something you've been avoiding that you need to address?",
  "How do you show compassion to yourself on difficult days?",
  "What relationships in your life need more attention or boundaries?",
  "What does your inner critic sound like, and how can you quiet it?",
  "What small step can you take today toward a bigger goal?",
  "What does rest truly mean to you, and how can you incorporate more of it?",
  "What are you currently learning about yourself?",
  "How have you grown in the past year that you're proud of?",
  "What would you do if you trusted that everything would work out?",
  "What needs to be released or let go of in your life right now?",
  "What brings you a sense of peace and calm?",
  "How can you be more present in your daily activities?",
  "What does authenticity mean to you, and how do you practice it?",
  "What moments from this week made you feel truly happy?",
  "How do you want to be remembered by the people you love?",
  "What's something you need to forgive yourself for?",
  "What does your body need from you right now?",
  "How can you create more space for joy in your life?",
  "What assumptions are you making that might not be true?",
  "What does 'success' mean to you personally?",
  "How do you recharge when you're feeling drained?",
  "What's one thing you can do today to practice self-care?",
];

const spaceItems = ["🌌", "🪐", "☄️", "⭐", "🛰️", "🌙"];
const MAX_MESSAGE_LENGTH = 1000;

const getRandomJournalPrompt = () =>
  journalPromptsArray[
    Math.floor(Math.random() * journalPromptsArray.length)
  ];

const VoidChat = () => {
  const [showTransmission, setShowTransmission] = useState(false);
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(
    getRandomJournalPrompt
  );
  const [speechSupported, setSpeechSupported] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const messageTimersRef = useRef([]);

  // Set up speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const spokenText = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += spokenText;
        } else {
          interimTranscript += spokenText;
        }
      }

      finalTranscriptRef.current = finalTranscript;

      setTranscript(
        (finalTranscript + interimTranscript).slice(0, MAX_MESSAGE_LENGTH)
      );
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        setStatusMessage(
          "Microphone access was blocked. Check your browser permissions."
        );
      } else if (event.error !== "no-speech" && event.error !== "aborted") {
        setStatusMessage("Voice input stopped. You can type your thoughts instead.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;

      try {
        recognition.stop();
      } catch {
        // Recognition may already have stopped.
      }

      messageTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current || isListening) return;

    finalTranscriptRef.current = transcript;
    setStatusMessage("");

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setStatusMessage(
        "Voice input could not start. Please try again or type your thoughts."
      );
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Recognition may already have stopped.
      }
    }

    setIsListening(false);
  };

  const resetTranscript = () => {
    stopListening();
    finalTranscriptRef.current = "";
    setTranscript("");
    setStatusMessage("Your message has been cleared.");
  };

  const handleGeneratePrompt = () => {
    let nextPrompt = getRandomJournalPrompt();

    // Avoid repeating the current prompt when possible.
    while (
      journalPromptsArray.length > 1 &&
      nextPrompt === currentPrompt
    ) {
      nextPrompt = getRandomJournalPrompt();
    }

    setCurrentPrompt(nextPrompt);
  };

  const handleSend = () => {
    const textToSend = transcript.trim();

    if (!textToSend) {
      setStatusMessage("Write or speak something before releasing it.");
      return;
    }

    stopListening();

    const randomItem =
      spaceItems[Math.floor(Math.random() * spaceItems.length)];

    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: textToSend.slice(0, MAX_MESSAGE_LENGTH),
      icon: randomItem,
      x: Math.random() * 140 - 70,
      y: -(140 + Math.random() * 100),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setTranscript("");
    finalTranscriptRef.current = "";
    setStatusMessage("Released. Take a breath and let it go.");

    const timer = setTimeout(() => {
      setMessages((previousMessages) =>
        previousMessages.filter((message) => message.id !== newMessage.id)
      );

      messageTimersRef.current = messageTimersRef.current.filter(
        (existingTimer) => existingTimer !== timer
      );
    }, 6500);

    messageTimersRef.current.push(timer);
  };

  const handleTranscriptChange = (event) => {
    const nextValue = event.target.value.slice(0, MAX_MESSAGE_LENGTH);

    setTranscript(nextValue);
    finalTranscriptRef.current = nextValue;
    setStatusMessage("");
  };

  const handleKeyDown = (event) => {
    // Enter sends the message; Shift + Enter creates a new line.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Helmet>
        <title>Void Chat – Speak & Release Your Thoughts | Solayulm</title>
        <meta
          name="description"
          content="Let it all go in Void Chat — a quiet space to speak your thoughts, explore prompts, and release what you are carrying."
        />
        <meta property="og:title" content="Void Chat | Solayulm" />
        <meta
          property="og:description"
          content="Speak your mind. Let go. The void listens without judgment."
        />
      </Helmet>

      <main className={styles.voidPage}>
        <div className={styles.starBackground} aria-hidden="true">
          <ShootingStars />
        </div>

        <div className={styles.pageContent}>
          {/* Page heading */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Void Chat</h1>

            <p className={styles.pageSubtitle}>
              Some thoughts don't need an answer. They just need somewhere
              to go.
            </p>
          </header>

          {/* How it works */}
          <section className={styles.infoPanel}>
            <h2 className={styles.panelTitle}>How it works</h2>

            <p className={styles.panelText}>
              Speak your thoughts for as long or as little as you like,
              then send them into the void.
            </p>

            <p className={styles.panelText}>
              There is no need to organise your feelings or find the
              perfect words. Let them come as they are.
            </p>

            <p className={styles.panelText}>
              Once your message is released, give yourself a moment to
              breathe. Nothing needs to be solved right now.
            </p>
          </section>

          {/* Journal prompt */}
          <section className={styles.promptPanel}>
            <h2 className={styles.panelTitle}>Not sure where to begin?</h2>

            <p className={styles.promptIntro}>
              Let a small question help you find the words.
            </p>

            <blockquote className={styles.promptQuote}>
              {currentPrompt}
            </blockquote>

            <div className={styles.promptActions}>
              <button
                type="button"
                className={styles.promptButton}
                onClick={handleGeneratePrompt}
              >
                Generate prompt
              </button>
            </div>
          </section>

          {/* Void chat and release space */}
          <section
            className={styles.chatShell}
            aria-label="Void Chat release space"
          >
            <div className={styles.releaseStage}>
              <div className={styles.releaseHint}>
                <h2 className={styles.releaseHintTitle}>
                  Let it leave your orbit
                </h2>

                <p className={styles.releaseHintText}>
                  Write it. Speak it. Release it.
                </p>
              </div>

              <div aria-hidden="true">
                <Aurora />
              </div>

              {/* Floating messages */}
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={styles.floatingMessage}
                    initial={{
                      opacity: 0,
                      y: 15,
                      x: 0,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [15, 0, message.y * 0.55, message.y],
                      x: message.x,
                      scale: [0.85, 1, 1, 0.85],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 6,
                      ease: "easeOut",
                      times: [0, 0.12, 0.72, 1],
                    }}
                  >
                    <div className={styles.AnimatedText}>
                      <span className={styles.messageIcon}>
                        {message.icon}
                      </span>

                      <p className={styles.messageText}>
                        {message.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input dock */}
            <div className={styles.inputDock}>
              <div
                className={styles.controlGroup}
                aria-label="Voice input controls"
              >
                <button
                  type="button"
                  className={`${styles.controlButton} ${
                    isListening ? styles.listeningButton : ""
                  }`}
                  onClick={startListening}
                  disabled={!speechSupported || isListening}
                >
                  🎙 {isListening ? "Listening…" : "Start speaking"}
                </button>

                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={stopListening}
                  disabled={!isListening}
                >
                  ⏸ Stop
                </button>

                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={resetTranscript}
                >
                  ↻ Reset
                </button>
              </div>

              {!speechSupported && (
                <p className={styles.statusMessage}>
                  Voice input isn't supported in this browser. You can
                  still type your message below.
                </p>
              )}

              <label htmlFor="void-message" className={styles.panelTitle}>
                What would you like to release?
              </label>

              <textarea
                id="void-message"
                className={styles.textInput}
                value={transcript}
                onChange={handleTranscriptChange}
                onKeyDown={handleKeyDown}
                rows={4}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Speak or type into the void…"
              />

              <div className={styles.inputFooter}>
                <div>
                  <p className={styles.inputHelp}>
                    Your message will float away. There is no reply to wait for.
                  </p>

                  <p className={styles.inputHelp}>
                    {transcript.length}/{MAX_MESSAGE_LENGTH} characters
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.sendButton}
                  onClick={handleSend}
                  disabled={!transcript.trim()}
                >
                  Release to the void ✦
                </button>
              </div>

              {statusMessage && (
                <p className={styles.statusMessage} role="status">
                  {statusMessage}
                </p>
              )}
            </div>
          </section>

          {/* Exit */}
          {/* <div className={styles.exitSection}>
            <Link to="/Rooms" className={styles.exitButton}>
              Exit Void Chat
            </Link>
          </div> */}

          <div className={styles.exitSection}>
            <button
              type="button"
              className={styles.exitButton}
              onClick={() => setShowTransmission(true)}
            >
              Return to Rooms
            </button>
          </div>
          
          <IncomingTransmission
            isOpen={showTransmission}
            onClose={() => setShowTransmission(false)}
            onContinue={() => navigate("/Rooms")}
          />
        </div>
        
      </main>
    </>
  );
};

export default VoidChat;