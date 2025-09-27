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
import galaxy from "../../assets/videos/galaxyVideo-OB.mp4";
import aurora from "../../assets/videos/auroraOB.mp4";
import greeng from "../../assets/videos/green-gas.mp4";
import purplegas from "../../assets/videos/green-purplegal.mp4";
import bluegas from "../../assets/videos/purple-blue-illum.mp4";
import goldSolar from "../../assets/videos/white-gold-solar.mp4";



const DecompressionBay = () => {
  const [duration, setDuration] = useState(300); 
  const [showVisuals, setShowVisuals] = useState(false);

function getAriaValueText(value) {
  return `${value}°C`;
}

const [dots, setDots] = useState([]);
  const [activeMedia, setActiveMedia] = useState({
    src: galaxy,
    type: "aurora",
    label: "Nebula Drift",
  });


  // List of all media
  const mediaOptions = [
    { label: "Nebula Drift", src: aurora, type: "video" },
    { label: "Stellar Nursery", src: galaxy, type: "video" },
    { label: "Cosmic Dance", src: bluegas, type: "video" },
    { label: "Black Hole Horizon", src: purplegas, type: "video" },
    { label: "Aurora Expanse", src: greeng, type: "video" },
    { label: "Quantum Twilight", src: goldSolar, type: "video" },
  ];


const [focus, setFocus] = useState(50);




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
    <Col md={12}>
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
         <Row className="mt-4 pt-5">
  <h3 className="text-center">Mood Spectrum Bar</h3>
  <Col xs={12} className="d-flex justify-content-center">
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
  
    <Row className="mb-4">
            <Col className="d-flex justify-content-center flex-wrap gap-2">
              {mediaOptions.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => setActiveMedia(item)}
                  className={styles.MinutesButton}
                >
                  {item.label}
                </Button>
              ))}
            </Col>
          </Row>
    
  <Row>
    <Col>
    <p>section to have animated visuals of universe - can click a button and will load next one. 
        4 options to cover mood.
        </p>
        <div className={styles.videoContainer}>
                      {activeMedia.type === "video" ? (
                        <video
                          src={activeMedia.src}
                          autoPlay
                          loop
                          muted
                          className={styles.deckVideo}
                        />
                      ) : (
                        <img
                          src={activeMedia.src}
                          alt={activeMedia.label}
                          className={styles.deckVideo}
                        />
                      )}
                    </div>  
    </Col>
  </Row>
  
  </div>


     <Row className="text-center my-5 pb-5 h-75">
    
        

    
    <Col md={12}>
    <h2 className="mb-3 mx-5">Well-being Huddle</h2>
    <h4 className="mb-4 pb-4">Feel decompressed ? Let's do some reflection...</h4>
      
      <Row>
    <Col md={4}>
        <h3>Stress Levels</h3>
        <p>Adjust your current stress levels</p>
    </Col>
    <Col md={4}>
    <h3>Calm 'O' meter</h3>
        <p>Adjust your current calm levels</p>
    </Col>
</Row>

        <Row>
  <Col className="d-flex justify-content-center pt-4 "
  md={4}
  style={{   transform: 'translate( 45%, -20px)'  }}>
    {/* Stress levels */}
    <Stack sx={{ height: 250 }}>
      <Slider 
      valueLabelDisplay="auto"
      orientation="vertical" 
      defaultValue={80}  
      sx={{
    
    '& .MuiSlider-rail': {
      opacity: 1, 
      backgroundImage: 'linear-gradient(90deg, #FF0000)',
      borderRadius: 6,
      width: 10
    },
    '& .MuiSlider-track': {
      backgroundColor: ' #e39f9fff', 
       border: 'none',
    },
    '& .MuiSlider-thumb': {
      width: 30,
      height: 30,
      backgroundColor: '#fff',
      border: '2px solid #000',
    },
 '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0, 
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0', 
        backgroundColor: '#e39f9fff',
        transformOrigin: 'left center',
        transform: 'translate(120%, -80%) rotate(-145deg) scale(0)',

        '&::before': { display: 'none' },

        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(60%, -50%) rotate(-120deg) scale(1)',
        },

        '& > *': {
          transform: 'rotate(45deg)', 
        },
      },
  }}/>
    </Stack>
  </Col>
  <Col className="d-flex justify-content-center pt-4"
  md={4}
  style={{   transform: 'translate( 45%, -20px)'  }}>
    {/* Calm o meter */}
    <Stack sx={{ height: 250 }}>
  <Slider
    valueLabelDisplay="auto"
    orientation="vertical"
    defaultValue={50}
    sx={{
      '& .MuiSlider-rail': {
        opacity: 1,
        backgroundImage: 'linear-gradient(90deg, #475fe8ff)',
        borderRadius: 6,
        width: 10,
      },
      '& .MuiSlider-track': {
        backgroundColor: '#a8b2ebff',
        border: 'none',
      },
      '& .MuiSlider-thumb': {
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 'none',
        '&:hover, &.Mui-focusVisible, &.Mui-active': {
          boxShadow: 'none',
        },
      },
      '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0, 
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0', 
        backgroundColor: '#a8b2ebff',
        transformOrigin: 'left center',
        transform: 'translate(120%, -80%) rotate(-145deg) scale(0)',

        '&::before': { display: 'none' },

        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(60%, -50%) rotate(-120deg) scale(1)',
        },

        '& > *': {
          transform: 'rotate(45deg)', 
        },
      },
    }}
  />
</Stack>

  </Col>
   <Col className="ml-5"style={{   transform: 'translate( -5%, -80px)'  }}  >
        < RotatingRings />
        </Col>

</Row>

      <Row >
        <Col md={6}>
        <h3>Energy Guage</h3>
        </Col>
        <Col md={6}>
        <h3>Focus Dials</h3>
        </Col>
        </Row>
        <Row>
        <Col md={6}
        className="d-flex justify-content-center pt-4"
        >
        
        <Stack sx={{  width: 400 }} spacing={1} direction="row">
      <Slider
        aria-label="Stress levels"
        orientation="horizontal"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
        className=""
        style={{top: '70%'}}
        sx={{

            '& .MuiSlider-rail': {
        opacity: 1,
          backgroundImage: 'linear-gradient(90deg, #dd5f5fff, #5f70ddff)',
                
        borderRadius: 6,
       
      },
      '& .MuiSlider-track': {
        backgroundColor: 'transparent',
        border: 'none',
      },
      '& .MuiSlider-thumb': {
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 'none',
       
      },
    
    '& .MuiSlider-valueLabel': {
      minWidth: 45,     
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    }, }
  }}
      />
      </Stack>
        </Col>




        <Col md={6}>
        <div>
    <FocusDial value={focus} />
    <Slider
      value={focus}
      onChange={(e, val) => setFocus(val)}
      orientation="horizontal"
      sx={
        {
             '& .MuiSlider-rail': {
        opacity: 1,
          backgroundImage: 'linear-gradient(90deg, #e1b6faff )',
                
        borderRadius: 6,
       
      },
      '& .MuiSlider-track': {
        backgroundColor: 'transparent',
        border: 'none',
      },
            
        }
      }
    />
  </div>
        </Col>
      </Row>
{/* mood spectrum section  */}
     

    </Col>

    
  </Row>

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
