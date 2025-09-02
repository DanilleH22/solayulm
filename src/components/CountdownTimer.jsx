import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/CountdownTimer.module.css"; 

export default function CountdownTimer({ duration = 300 }) { // default 5 minutes
  const [num, setNum] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Reset timer if duration changes
  useEffect(() => {
    setNum(duration);
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }, [duration]);

  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setNum((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setNum(duration);
    setIsRunning(false);
  };

  // Convert seconds → MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2 className={styles.timerButton}>{formatTime(num)}</h2>
      {!isRunning ? (
        <Button onClick={startTimer}>Start</Button>
      ) : (
        <Button onClick={pauseTimer}>Pause</Button>
      )}
      <Button onClick={resetTimer} className="ms-2">
        Reset
      </Button>
    </div>
  );
}
