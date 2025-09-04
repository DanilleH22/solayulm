import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/DecompressionBay.module.css";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import DecompressionLoop from "../../components/DecompressionLoop.jsx"; 
import  FlowerOfLifeLoop  from "../../components/FlowerofLifeLoop.jsx";
import { SpiralLoop } from "../../components/SpiralLoop.jsx";
import { NebulaFlow } from "../../components/NebulaFlow.jsx";
import   JumpingDots  from "../../components/JumpingDots.jsx";
import { RotatingRings } from "../../components/RotatingRings.jsx";


const DecompressionBay = () => {
  const [duration, setDuration] = useState(300); 

function getAriaValueText(value) {
  return `${value}°C`;
}


  return (
    <Container fluid>
      <Row className="text-center my-5">
        <h1>Decompression Bay</h1>
        <p>Welcome to Decompression bay. more text about what to expect</p>
        <p>
          Soft lighting, calming sounds, and a tranquil atmosphere designed to
          help you unwind and relax.
        </p>
      </Row>
    
    <Row className="text-center my-5">
    {/* Left - Timer */}
    <Col md={5}>
    <h3>Choose your session length:</h3>
    <div className="text-center justify-content-center d-flex ">
        
        <Button onClick={() => setDuration(5 * 60)} className={styles.MinutesButton}>
          5 minutes
        </Button>
        
        <Button onClick={() => setDuration(10 * 60)} className={styles.MinutesButton}>
          10 minutes
        </Button>
        <Button onClick={() => setDuration(15 * 60)} className={styles.MinutesButton}>
          15 minutes
        </Button>
        <Button onClick={() => setDuration(20 * 60)} className={styles.MinutesButton}>
          20 minutes
        </Button>
        <Button onClick={() => setDuration(30 * 60)} className={styles.MinutesButton}>
          30 minutes
        </Button>
        <Button onClick={() => setDuration(45 * 60)} className={styles.MinutesButton}>
          45 minutes
        </Button>
        <Button onClick={() => setDuration(60 * 60)} className={styles.MinutesButton}>
          60 minutes
        </Button>
        
      </div>
      
      <CountdownTimer duration={duration} />
    </Col>

    

    {/* Right - I/mmersion Visuals */}
    <Col md={6} gap={3}>
      <h3>Immersion Visuals</h3>
       
        <FlowerOfLifeLoop />
        <SpiralLoop />
        <JumpingDots />
        <RotatingRings />
      <NebulaFlow />
    </Col>
  </Row>


     <Row className="text-center my-5 pb-5 h-75">
    
        {/* Left - Environment */}
    <Col md={4}>
      <h3>Environment Controls</h3>
      <Button>Ambient Sound</Button>
      <Button>Lighting</Button>
      <NebulaFlow />
    </Col>

    {/* Right - Stress Bar */}
    <Col md={8}>
    <h2 className="mb-3 mx-5">Well-being Huddle</h2>
      
      <Row className="mb-4 pb-5 ">
        <Col className="pr-5">
        <h3>Stress Levels</h3>
        <p>Adjust your current stress levels</p>
       <Stack sx={{  width: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Stress levels"
        orientation="horizontal"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
        sx={{
    '& .MuiSlider-valueLabel': {
      minWidth: 45,     
      height: 32,
      fontSize: 14,
    },
  }}
      />
      </Stack>
        </Col>
        <Col className="ml-5">
        <DecompressionLoop />
        </Col>

        <Col>
        <h3>Calm 'O' meter</h3>
        <p>Adjust your current calm levels</p>
       <Stack sx={{width: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Calm 'O' meter"
        orientation="horizontal"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
        sx={{
    '& .MuiSlider-valueLabel': {
      minWidth: 45,     
      height: 32,
      fontSize: 14,
    },
  }}
      />
      </Stack>
        </Col>
      </Row>

      <Row >
        <Col md={4}>
        <h3>Energy Guage</h3>
        <Stack sx={{  width: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Stress levels"
        orientation="horizontal"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
        sx={{
    '& .MuiSlider-valueLabel': {
      minWidth: 45,     
      height: 32,
      fontSize: 14,
    },
  }}
      />
      </Stack>
        </Col>

        <Col md={6}>
        <h3>Focus Dials</h3>
        </Col>
      </Row>
{/* mood spectrum section  */}
      <Row>
        <h3 className="mt-4 pt-5 text center">Mood Spectrum Bar</h3>
        <Col className="pt-2 d-flex justify-content-center">
        
            <Stack sx={{  width: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Stress levels"
        orientation="horizontal"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
        sx={{
    '& .MuiSlider-valueLabel': {
      minWidth: 45,     
      height: 32,
      fontSize: 14,
      justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
  }}
      />
      </Stack>
            </Col>
      </Row>

    </Col>

    
  </Row>



      

    </Container>
  );
};

export default DecompressionBay;
