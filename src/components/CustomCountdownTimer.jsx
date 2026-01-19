import React, { useState, useRef, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import styles from "../styles/DecompressionBay.module.css"; 
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DecompressionLoop from "./DecompressionLoop.jsx"; 
import  FlowerOfLifeLoop  from "./FlowerLifeLoop.jsx";
import { SpiralLoop } from "./SpiralLoop.jsx";
import { NebulaFlow } from "./NebulaFlow.jsx";
import   JumpingDots  from "./JumpingDots.jsx";
import { RotatingRings } from "./RotatingRings.jsx";
import VisualSequence  from "./VisualSequence.jsx";


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

  useEffect(() => {
  if (num === 0) {
    EndSequence();
  }
}, [num]);


  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setNum((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setIsRunning(true);
    } 
  };

const EndSequence = () => {
  clearInterval(intervalRef.current); // stop the countdown
  setIsRunning(false);
  setShowVisuals(false); // hide visuals
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
    EndSequence()
  };

  // Convert seconds → MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

   const percentage = (num / duration) * 100;


  return (
  <Row className="d-flex justify-content-center align-items-center mt-5">
    <Col md={5} xs={12} className="text-center" style={{ marginLeft: window.innerWidth < 768 ? '50px': '0',  }}>
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
  className={styles.MinutesButton3}
  style={{ width: '25%' }}
>
  {isRunning ? "Pause" : "Start"}
</Button>


    <Button
      onClick={resetTimer}
      className={styles.MinutesButton3}
      style={{ width: '25%' }}
    >
      Reset
    </Button>
    </Col>
  <Col md={5} xs={12} className="text-center" style={{ marginTop: window.innerWidth < 768 ? '100px': '0', marginLeft: window.innerWidth < 768 ? '50px': '0',  }}>
    {showVisuals ? (
      <>
        <h5 style={{   transform: 'translate( 10%, -30px)',  }}>Visuals are ON</h5>
        {/* <FlowerOfLifeLoop /> 
        <SpiralLoop />  */}
        {/* <DecompressionLoop />  */}
        <VisualSequence style={{ marginRight: window.innerWidth < 768 ? '100px': '0'}} />
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




