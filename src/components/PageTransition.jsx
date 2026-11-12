import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import { useNavigate } from "react-router-dom";
import "./PageTransition.css";

const PageTransitionContext = createContext(null);

export const usePageTransition = () => {
  return useContext(PageTransitionContext);
};

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("idle");
  const [destination, setDestination] = useState("");
  const [progress, setProgress] = useState(0);

  const timers = useRef([]);
  const transitioning = useRef(false);
  const startTime = useRef(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const navigateWithTransition = useCallback((path, roomName) => {
    if (transitioning.current) return;

    transitioning.current = true;
    clearTimers();

    startTime.current = Date.now();

    setDestination(roomName);
    setProgress(0);
    setPhase("engaging");

    // Load the destination underneath the transition.
    timers.current.push(
      setTimeout(() => {
        navigate(path);
      }, 2000)
    );

    // Begin the arrival sequence.
    timers.current.push(
      setTimeout(() => {
        setPhase("arriving");
      }, 3000)
    );

    // Reveal the destination.
    timers.current.push(
      setTimeout(() => {
        setPhase("idle");
        setProgress(0);
        transitioning.current = false;
      }, 3000)
    );
  }, [navigate]);

  // Keep the percentage synchronised with the full transition.
  useEffect(() => {
    if (phase === "idle" || !startTime.current) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const percentage = Math.min((elapsed / 4000) * 100, 100);

      setProgress(percentage);
    }, 30);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{ navigateWithTransition }}
    >
      {children}

      {phase !== "idle" && (
        <div
          className={`hyperspace-overlay ${phase}`}
          aria-live="polite"
          aria-label={`Travelling to ${destination}`}
        >
          {/* Starfield and warp effect */}
          <div className="hyperspace-stars">
            {Array.from({ length: 110 }, (_, i) => {
              const x = (i * 37) % 100;
              const y = (i * 61) % 100;

              const dx = (x - 50) * 15;
              const dy = (y - 50) * 15;
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);

              return (
                <span
                  key={i}
                  className="hyperspace-star"
                  style={{
                    "--x": `${x}%`,
                    "--y": `${y}%`,
                    "--dx": `${dx}px`,
                    "--dy": `${dy}px`,
                    "--angle": `${angle}deg`,
                    "--delay": `${(i % 15) * -0.08}s`
                  }}
                />
              );
            })}
          </div>

          {/* Central warp rings */}
          {/* <div className="hyperspace-rings">
            <div className="hyperspace-ring ring-one" />
            <div className="hyperspace-ring ring-two" />
            <div className="hyperspace-ring ring-three" />
          </div> */}

          {/* Destination navigation interface */}
          <div className="hyperspace-interface">
            <div className="hyperspace-system">
              SOLAYULM <span>//</span> NAVIGATION SYSTEM
            </div>

            <div className="hyperspace-divider">
              <span />
              FLIGHT SEQUENCE
              <span />
            </div>

            <div className="hyperspace-heading">
              {phase === "engaging"
                ? "HYPERSPACE JUMP"
                : "DESTINATION APPROACHING"}
            </div>

            <div className="hyperspace-destination">
              {destination}
            </div>

            <div className="hyperspace-status">
              {phase === "engaging"
                ? "Engaging engines. Preparing for departure..."
                : "Coordinates synchronised. Preparing arrival..."}
            </div>

            <div className="hyperspace-progress">
              <div
                className="hyperspace-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="hyperspace-progress-label">
              <span>
                {phase === "engaging"
                  ? "HYPERSPACE DRIVE"
                  : "ARRIVAL SEQUENCE"}
              </span>

              <span className="hyperspace-percentage">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="hyperspace-footer">
              <span className="hyperspace-status-light" />
              SYSTEMS ONLINE
              <span className="hyperspace-footer-separator">|</span>
              TRAVEL MODE ACTIVE
            </div>
          </div>

          {/* Arrival flash */}
          <div className="hyperspace-flash" />
        </div>
      )}
    </PageTransitionContext.Provider>
  );
};