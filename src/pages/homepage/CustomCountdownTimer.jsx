import React, { useState, useRef, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import styles from "../styles/DecompressionBay.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CustomCountdownTimer({ duration = 300 }) {
  const [num, setNum] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Reset when duration prop changes
  useEffect(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setNum(duration);
  }, [duration]);

  // Stop when countdown hits 0
  useEffect(() => {
    if (num === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [num, isRunning]);

  const startTimer = () => {
    if (isRunning) return;
    intervalRef.current = setInterval(() => {
      setNum((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setNum(duration);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const percentage = duration > 0 ? (num / duration) * 100 : 0;

  return (
    <Row className="d-flex justify-content-center align-items-center mt-5">
      <Col
        md={5}
        xs={12}
        className="text-center"
        style={{ marginLeft: window.innerWidth < 768 ? "50px" : "0" }}
      >
        <CircularProgressbar
          value={percentage}
          text={formatTime(num)}
          className="mb-5"
          styles={buildStyles({
            textColor: "white",
            pathColor: "#945ebaff",
            trailColor: "#222",
          })}
        />

        <Button
          onClick={() => (isRunning ? pauseTimer() : startTimer())}
          className={styles.MinutesButton3}
          style={{ width: "30%" }}
          variant="outline-info"
        >
          {isRunning ? "Pause" : "Start"}
        </Button>

        <Button
          onClick={resetTimer}
          className={styles.MinutesButton3}
          style={{ width: "30%" }}
          variant="outline-info"
        >
          Reset
        </Button>
      </Col>
    </Row>
  );
}