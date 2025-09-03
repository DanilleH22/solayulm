import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/DecompressionBay.module.css";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import DecompressionLoop from "../../components/DecompressionLoop.jsx"; 


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

      <div className="text-center">
        <h3>Choose your session length</h3>
        <p>Select a duration that fits your schedule and needs.</p>
      </div>

      <Row md={6} className="text-center my-5">
        <Button onClick={() => setDuration(5 * 60)} className="m-3">
          5 minutes
        </Button>
        <Button onClick={() => setDuration(10 * 60)} className="m-3">
          10 minutes
        </Button>
        <Button onClick={() => setDuration(15 * 60)} className="m-3">
          15 minutes
        </Button>
        <Button onClick={() => setDuration(20 * 60)} className="m-3">
          20 minutes
        </Button>
        <Button onClick={() => setDuration(30 * 60)} className="m-3">
          30 minutes
        </Button>
        <Button onClick={() => setDuration(45 * 60)} className="m-3">
          45 minutes
        </Button>
        <Button onClick={() => setDuration(60 * 60)} className="m-3">
          60 minutes
        </Button>
      </Row>
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col xs="auto" className="text-center my-5">
        <div className={styles.systemChecksLeft}>
          <CountdownTimer duration={duration}  />
          </div>
        </Col>
        </Row>

      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col xs="auto" className="text-center my-5">
        {/* <div className={styles.systemChecksCenter}  > */}
            <div >
          <h3>middle row</h3>
          <p>Stress levels bar</p>
          <p>Timer</p>
           <Stack sx={{ height: 300, width: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Temperature"
        orientation="vertical"
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

          {/* Pass duration prop */}
          
          </div>
        </Col>
        </Row>
      <Row >
        <Col xs="auto" >
        <div className={styles.systemChecksRight}>
        <h3>right row</h3>
        <p>Ambient sound controls</p>
        <p>Lighting controls</p>
        <DecompressionLoop />
        <Button variant="success" className={styles.controlButton}>Adjust</Button>
        </div>
        </Col>
      </Row>


    </Container>
  );
};

export default DecompressionBay;
