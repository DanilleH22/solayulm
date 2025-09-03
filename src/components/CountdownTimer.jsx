import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/DecompressionBay.module.css"; 
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CountdownTimer({ duration = 300 }) { // default 5 minutes
  const [num, setNum] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);


  // Reset timer if duration changes
  useEffect(() => {
    setNum(duration);
    clearInterval(intervalRef.current);
    setIsRunning(false);
    resetTimer();
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

   const percentage = (num / duration) * 100;


  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={formatTime(num)} 
        className="mb-5"
        styles={buildStyles({
          textColor: "white",
          pathColor: "#945ebaff",
          trailColor: "#222",
          boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)'
        })}
      />
      
      {!isRunning ? (
        <Button onClick={startTimer} className={styles.MinutesButton} style={{ width: '25%' }}>Start</Button>
      ) : (
        <Button onClick={pauseTimer} className={styles.MinutesButton} style={{ width: '25%' }}>Pause</Button>
      )}
      <Button onClick={resetTimer} className={styles.MinutesButton} style={{ width: '25%' }}>
        Reset
      </Button>
    </div>
  );
}




