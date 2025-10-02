import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/DecompressionBay.module.css";
import CustomCountdownTimer from "../../components/CustomCountdownTimer.jsx";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import DecompressionLoop from "../../components/DecompressionLoop.jsx"; 
import  FlowerLifeLoop  from "../../components/FlowerLifeLoop.jsx";
import { SpiralLoop } from "../../components/SpiralLoop.jsx";
import { NebulaFlow } from "../../components/NebulaFlow.jsx";
import   JumpingDots  from "../../components/JumpingDots.jsx";
import { RotatingRings } from "../../components/RotatingRings.jsx";
import  MoodBar  from "../../components/MoodBar.jsx";
import  FocusDial  from "../../components/FocusDial.jsx";
import { Link } from "react-router";



const DecompressionBay = () => {
  const [duration, setDuration] = useState(300); 
  const [showVisuals, setShowVisuals] = useState(false);

function getAriaValueText(value) {
  return `${value}°C`;
}

const [dots, setDots] = useState([]);
const [activeMedia, setActiveMedia] = useState({
  src: "/videos/galaxyVideo-OB.mp4",
  type: "video",
  label: "Nebula Drift",
});


  // List of all media
 const mediaOptions = [
  { label: "Nebula Drift", src: "/videos/auroraOB.mp4", type: "video" },
  { label: "Stellar Nursery", src: "/videos/galaxyVideo-OB.mp4", type: "video" },
  { label: "Cosmic Dance", src: "/videos/purple-blue-illum.mp4", type: "video" },
  { label: "Black Hole Horizon", src: "/videos/green-purplegal.mp4", type: "video" },
  { label: "Aurora Expanse", src: "/videos/green-gas.mp4", type: "video" },
  { label: "Quantum Twilight", src: "/videos/white-gold-solar.mp4", type: "video" },
];



const [focus, setFocus] = useState(50);


  const [ShowStress, setShowStress] = useState(false);
  const [ShowCalm, setShowCalm] = useState(false);
  const [ShowEnergy, setShowEnergy] = useState(false);

 const toggleStress = () => {
    setShowStress((prev) => !prev); 
  };
   const toggleCalm = () => {
    setShowCalm((prev) => !prev); 
  };
const toggleEnergy = () => {
    setShowEnergy((prev) => !prev); 
  };



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

      {/* wellbeing huddle  */}
 <Row className="text-center my-2 pb-3 h-75">
      <Col md={12}>
        <h2 className="mb-3 ">Well-being Huddle</h2>
        <h4 className="mb-1 pb-1">Feel decompressed ? Let's do some reflection...</h4>
        <h6>Here are some questions for you to think about, whilst mediatting. </h6>
      </Col>
    </Row>

    
  


    <Row >
      <Col md={4} className="text-center mb-4">
       <Button className={styles.MinutesButton2} onClick={() => toggleStress(true)}>
        Stressed
      </Button>
      </Col>
      <Col md={4} className="text-center mb-4">
       <Button className={styles.MinutesButton2} onClick={() => toggleCalm(true)}>
        Calm
      </Button>
      </Col>
      <Col md={4} className="text-center mb-4">
       <Button className={styles.MinutesButton2} onClick={() => toggleEnergy(true)}>
        Energy
      </Button>
      </Col>
    </Row>

   

{ ShowStress && (
    <Row className="text-center my-5">
      
       <Col md={3}>
        <RotatingRings />
        </Col>
        <Col md={9} className="align-self-center">
    <Row>
      
      <Col>
      <h6>Am I safe in this moment, and what is the very next small step I can take right now? </h6>
      </Col>     
    </Row>
    <Row>
      <Col>
       <h6>Is the thought that’s stressing me a fact, or just a feeling — and how might I see it if I stepped back from it?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>If my best friend were feeling this way, what would I say to them — and why don’t I deserve the same kindness?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>What part of this situation is mine to carry, and what part can I gently release or trust time to handle?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>Where in my body am I holding this stress — and if I breathe into that space, what shift do I feel?</h6>
      </Col>
      </Row>
    </Col>
    </Row>
)}


     

{ ShowCalm && (
    <Row className="text-center my-5">
      <Col md={9} className="align-self-center">
    <Row>
      
      <Col>
      <h6>What is steady and unchanging in this moment that I can lean on, even briefly?</h6>
      </Col>     
    </Row>
    <Row>
      <Col>
       <h6>Instead of “I can’t calm down,” could I see it as “I am learning what soothes me” — what could that be right now?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>If it’s okay to be a work in progress, how might I treat myself more gently in this moment of restlessness?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>Which part of this tension belongs to me, and which part is simply not mine to hold?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>Where does calm already exist in me — perhaps in my breath, my heartbeat, or my stillness — and can I rest my awareness there?</h6>
      </Col>
      </Row>
    </Col>
    <Col md={3}>
        <RotatingRings />
        </Col>
    </Row>
)}



    
{ ShowEnergy && (
    <Row className="text-center my-5">
      <Col>
      <Row>
        <Col md={3}>
        <RotatingRings />
        </Col>
        <Col md={9} className="align-self-center">
        
    <Row >
      
      <Col >
      <h6>What is one thing in my environment right now that sparks a little sense of aliveness? </h6>
      </Col>     
    </Row>
    <Row>
      <Col>
       <h6>Instead of “I have no energy,” could it be “My energy is waiting for the right spark” — what could that spark be?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>If my body is asking me to rest before it rises, how can I honour that without judgment?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>What weight am I carrying today that drains me, and which of those can I lay down for now?</h6>
      </Col>
    </Row>
    <Row>
      <Col>
       <h6>What breath, stretch, or movement could invite a spark of energy into me right now?</h6>
      </Col>
      </Row>
    </Col>
    </Row>
    </Col>
      </Row>
)}



      {/* Meditation  */}
    
    <Row className="text-center my-5" style = {{ 
    alignItems: 'center',
    alignContent: window.innerWidth < 768 ? 'space-around' : 'row',}} >
    {/* Left - Timer */}
    <Col md={12}  >
    <h3>Choose your session length:</h3>
    <div className="text-center justify-content-center d-flex " 
//     style = {{ 
//     alignItems: 'center',
//      flexDirection: window.innerWidth < 768 ? 'column' : 'flex-row',
//  }}
 >
         <Row className="justify-content-center">
      {[
        { label: "5 minutes", time: 5 },
        { label: "10 minutes", time: 10 },
        { label: "15 minutes", time: 15 },
        { label: "20 minutes", time: 20 },
        { label: "30 minutes", time: 30 },
        { label: "45 minutes", time: 45 },
        { label: "60 minutes", time: 60 },
      ].map((btn, i) => (
        <Col
          key={i}
          xs={6}   
          md="auto" 
          className="d-flex justify-content-center mb-3"
        >
          <Button
            onClick={() => setDuration(btn.time * 60)}
            className={styles.MinutesButton2}
          >
            {btn.label}
          </Button>
        </Col>
      ))}
    </Row>
      </div>
         <Row className="mt-4 pt-5" style={{ marginLeft: window.innerWidth < 768 ? '10px' : '0', }}>
  <h3 className="text-center">Mood Spectrum Bar</h3>
  <Col xs={12} className="d-flex justify-content-center" >
    <div className="d-flex justify-content-center"> 
      <MoodBar />
    </div>
  </Col>
</Row>
        <a
        className="mt-3 pt-6"
        onClick={() => setShowVisuals((prev) => !prev)} 
        style={{ backgroundColor: 'transparent', color: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
      >
        <CustomCountdownTimer duration={duration} /> 
       
      </a>
    </Col>

    

  </Row>
<div>
  
   
  
  </div>


   

<Row>
    <Col md={12}>
    <div className="flex justify-content-center align-items-center" >
    <Link to="/Rooms" style={{ background: 'none', textDecoration: 'none'}}>
      <Button className={styles.MinutesButton} style={{display: 'flex', justifyContent: 'center'}}>Exit</Button>
      </Link>
    </div>
    </Col>
</Row>

      

    </Container>
  );
};

export default DecompressionBay;
