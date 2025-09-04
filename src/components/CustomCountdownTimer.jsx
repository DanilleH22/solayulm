import React, { useState, useRef, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import styles from "../styles/DecompressionBay.module.css"; 
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DecompressionLoop from "./DecompressionLoop.jsx"; 
import  FlowerOfLifeLoop  from "./FlowerofLifeLoop.jsx";
import { SpiralLoop } from "./SpiralLoop.jsx";
import { NebulaFlow } from "./NebulaFlow.jsx";
import   JumpingDots  from "./JumpingDots.jsx";
import { RotatingRings } from "./RotatingRings.jsx";


export default function CustomCountdownTimer({ duration = 300 }) { // default 5 minutes
  const [num, setNum] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
    const [showVisuals, setShowVisuals] = useState(false);


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
    setShowVisuals(false);
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
  <Row className="d-flex justify-content-center align-items-center">
    <Col md={5} className="text-center">
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
  onClick={() => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
      setShowVisuals(true); 
    }
  }}
  className={styles.MinutesButton}
  style={{ width: '25%' }}
>
  {isRunning ? "Pause" : "Start"}
</Button>


    <Button
      onClick={resetTimer}
      className={styles.MinutesButton}
      style={{ width: '25%' }}
    >
      Reset
    </Button>
    </Col>
  <Col md={5} className="text-center">
    {showVisuals ? (
      <>
        <p>Visuals are ON</p>
        {/* <FlowerOfLifeLoop /> 
        <SpiralLoop />  */}
        <DecompressionLoop /> 
        {/* <NebulaFlow />  */}
      </>
    ) : (
      <>
      <p className="pb-5 mb-5 text-center">Visuals are hidden. Press Start to activate the flow.</p> 
      <JumpingDots /> 
      </>
    )}
    </Col>
  </Row>
);

}




