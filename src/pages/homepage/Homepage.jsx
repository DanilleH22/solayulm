import React, { useCallback, useEffect, useState }  from 'react';
import { Link } from "react-router";
import { Container, Row, Col, Button, Tab, Tabs, Carousel, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SpaceCard from '../../components/SpaceCard.jsx';
import Typewriter from 'typewriter-effect';
import styles from '../../styles/Homepage.module.css'
import s1 from '../../assets/images/s1.jpg';
import s3 from '../../assets/images/s3.PNG';
import s6 from '../../assets/images/s6.PNG';
import s7 from '../../assets/images/s7.PNG';
import s8 from '../../assets/images/s8.PNG';
import s9 from '../../assets/images/s9.PNG';
import s10 from '../../assets/images/s10.PNG';
import s11 from '../../assets/images/s11.PNG';
import s12 from '../../assets/images/s12.PNG';
import s13 from '../../assets/images/s13.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSpring, animated } from '@react-spring/web';
import { motion } from "framer-motion";
import aicc from '../../assets/images/aicc.png';
import aj from '../../assets/images/aj.png';
import cc from '../../assets/images/cc.png';
import db from '../../assets/images/db.png';
import hr from '../../assets/images/hr.png';
import od from '../../assets/images/od.png';
import vc from '../../assets/images/vc.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from "lottie-react";
import SpaceMan from '../../assets/Animations/Space_Man.json';
import Astronaut from '../../assets/Animations/Astronaut.json';
import AstronautMusic from '../../assets/Animations/AstronautMusic.json';
import Circlepencil from '../../assets/Animations/Circlepencil.json';
import FreeConsultation from '../../assets/Animations/FreeConsultation.json';
import spaceDeveloper from '../../assets/Animations/spaceDeveloper.json';
import spaceX from '../../assets/Animations/spaceX.json';
import { Helmet } from 'react-helmet-async'



const Homepage = () => {

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));


const interpBg = xy.to((x, y) =>
  `perspective(1000px) rotateY(${x / 100}deg) rotateX(${-y / 100}deg)`
);

const onMove = useCallback(
  ({ clientX: x, clientY: y }) => {
    set({
      xy: [x - window.innerWidth / 2, y - window.innerHeight / 2],
    });
  },
  [set]
);

   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
    
        // cleanup on unmount
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      
    
    
    const stageWidth = Math.min(windowWidth * 0.9, 600); // 90% of screen, max 600px
    const stageHeight = stageWidth; // keep square


  return (
    <>
    <Helmet>
        <title>Solayulm – Wellness in the Digital Cosmos</title>
        <meta name="description" content="Explore a digital sanctuary for calm, creativity, and reflection." />
        <meta name="keywords" content="wellness, calm, mental health, space, relaxation, mindfulness" />
        <meta property="og:title" content="Solayulm – Your Calm Digital Universe" />
      </Helmet>
    
    <Container fluid>
  <div className={styles.imgTextWrapper}>
   
    <div className={styles.overlayText}>
    <motion.div  
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0], rotate: [0, 0.5, 0] }} 
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
      <h1>What do we do?</h1>
      <p>Solayulm is your serene pocket of the universe. A digital escape where calm meets the cosmos. Whether you are here to unwind, write a quiet though or simply float for a while, you've arrived to the perfect place. The queiet edge of the galaxy. No noise. No pressure. Just a gentle space to breathe and release.</p>
      </motion.div>
    </div>
    
    <div className={styles.TextTop}>
      <h1 style={{fontSize: window.innerWidth < 768 ? '50px' : '170px', paddingBottom: windowWidth <768 ? '10px' : '0',
  fontFamily: "Saira Stencil One", fontWeight: '400', letterSpacing: '10px', color: 'white', textShadow: '2px 2px 4px #000000', opacity: '0.8'
}}>SOLAYULM</h1>
    </div>
    
    <img 
      src={s3}
      alt="space" 
      className={styles.bgImage2}
    />
    <div className={styles.TextBottom}>
      {/* <h3><Typewriter
  options={{
    strings: ['Welcome to the quiet edge of the galaxy.'],
    autoStart: true,
    loop: true,
  }}
/></h3> */}
<motion.div   
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0], rotate: [0, 0.5, 0] }} // floating effect
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
<h3>You have arrived!</h3>
<h3>Welcome to the quiet edge of the galaxy.</h3>
</motion.div>
    </div>
   <div className={styles.exploreButton}>
  <Link
    to="/Rooms"
    style={{
      textDecoration: "none",
      outline: "none",
      color: "inherit",
      WebkitTapHighlightColor: "transparent", 
    }}
  >
    <Button
      style={{ 
        backgroundColor: "#6a626e", 
        outline: 'none',
        boxShadow: 'none',
      border: 'none', }}
    >
      Explore
    </Button>
  </Link>
</div>

  </div>
  <Row className={styles.servicesTextWrapper}>
  <Col className={styles.servicesText}>
    <h3>Who Are You ?</h3>
    <ul>
      <li><FontAwesomeIcon icon={faRocket} /> You’re someone carrying the weight of the world, searching for a place to set it down.</li>
      <li><FontAwesomeIcon icon={faRocket} /> You’re a dreamer craving stillness, a moment where your thoughts finally quiet.</li>
      <li><FontAwesomeIcon icon={faRocket} /> You’re an explorer at heart, looking for a space that feels endless yet safe.</li>
      <li><FontAwesomeIcon icon={faRocket} /> You’re tired of noise and chaos, longing for a breath of calm.</li>
      <li><FontAwesomeIcon icon={faRocket} /> You’re seeking release — from stress, from overthinking, from everything that holds you back.</li>
      <li><FontAwesomeIcon icon={faRocket} /> You’re ready to step outside of reality for a while, to float in something softer, lighter, freer.</li>
      <li><FontAwesomeIcon icon={faRocket} /> You are the reason Solayulm exists — the heart of everything we create.</li>
    </ul>
  </Col>

  <Col md={3} className={styles.servicesImg}>
  <motion.div  
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0], rotate: [0, 0.5, 0] }} // floating effect
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
    <img src={s6} alt="space" />
    </motion.div>
  </Col>
</Row>

<Row>

       
  <Tabs
     defaultActiveKey="Decompression Bay"
    id="fill-tab-example"
    className={styles.tabs}
    fill
  >
    <Tab eventKey="Decompression Bay" title="Decompression Bay" >
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Decompression Bay</h4>
      <p>A calming chamber where crew unwind and adjust to the station’s gravity.</p>
      <p>Here, the hum of machinery softens into silence. Gravity stabilizers hum low beneath your feet as the station welcomes you back from the chaos outside. This chamber is a sanctuary for weary travelers—a place to let the tension bleed away, to breathe, and to remember that you are safe within these walls.</p>
      <p>Step inside and let the hum of the station fade. This is where tension dissolves and your body finds balance again, weightlessly adjusting to calm. It’s the reset point — a place to let go of earthbound heaviness before drifting into new worlds.</p>
      </Col>
      {/* <Col>
      <DotLottieReact
            src="https://lottie.host/28aff156-7549-4371-a253-fae6c17ba0fd/2GdD3zuhPa.json"
            loop
            autoplay
            
          />
      </Col> */}
      <Col>
           <Lottie
          animationData={spaceX}
          loop={true}
          autoplay={true}
          style={{ 
            height: '500px', 
            width: '400px',
            maxWidth: '100%' 
          }}
        />
           </Col>
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className={styles.inlineText}>
        
      <h3>Area:</h3> 
      <p>area2</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Temp:</h3>
      <p>72°F</p><br/>
      </div>
      <div className={styles.inlineText}>
      <h3>Weight:</h3>
      <p>0.8g</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Light:</h3>
      <p>Soft Blue</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Sound:</h3>
      <p>Calm Waves</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Purpose:</h3>
      <p>Relaxation</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Use:</h3>
      <p>Meditation</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Access:</h3>
      <p>Open</p>
      </div>
      </div>
      </div>
      </Col>
      </Row>
      <Row>
                    <Col md={12}>
                    <div style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
              width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}} >
                    <Link to="/DecompressionBay" style={{ textDecoration: 'none' }}>
                      <Button style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
              width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              
              border: 'none',
          outline: 'none',}}  >Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
                
    </Tab>
    
  

    <Tab eventKey="Airlock Journal" title="Airlock Journal">
      <Row>
      <Col className={styles.tabTextLeft} >
      
      <h4>Airlock Journal</h4>
      <p>A reflective space for logging thoughts before stepping into the void.</p>

      <p>Here, reflection meets ritual. Before entering the great unknown, you pause to write, record, or release your thoughts. 
        It’s the emotional airlock: one last breath, one final entry, 
        a safe place to unburden your mind before crossing thresholds.</p>
        
      <p>The airlock doors whisper closed, and with them, the noise of the world falls away. Here, 
        before stepping out into the infinite void, explorers carve their thoughts into digital logs—last words, 
        quiet confessions, fragments of truth. 
        This is a space for release, a moment to unburden yourself before venturing into the unknown."</p>
      </Col>
     <Col>
     <Lottie
    animationData={spaceDeveloper}
    loop={true}
    autoplay={true}
    style={{ 
      height: '500px', 
      width: '400px',
      maxWidth: '100%' 
    }}
  />
     </Col>
     
      <Col className={styles.tabTextRight} >
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.inlineText}>
        <h3>Area:</h3>
        <p>Airlock Journal</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Temp:</h3>
        <p>Pressurized steady warmth</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Weight:</h3>
        <p>1.0g</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Light:</h3>
        <p>Focused beam on the page</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Sound:</h3>
        <p>Soft hiss of sealed air</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Purpose:</h3>
        <p>Self-record and introspection</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Use:</h3>
        <p>Writing, reflection, log-keeping</p>
      </div>
      <div className={styles.inlineText}>
        <h3>Access:</h3>
        <p>Locked to personal entry</p>
      </div>
      
      </div>
      </div>
      </Col>
      </Row>
      <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/AirlockJournal" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
               width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}}>Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </Tab>



    
    <Tab eventKey="Observation Deck" title="Observation Deck">
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Observation Deck</h4>
      <p>Panoramic starlit views framed by holographic star charts.</p>

      <p>A vast panorama of stars stretches infinitely before you. Framed by holographic constellations, 
        this deck invites stillness and awe. Here, perspective is everything — your worries shrink, the cosmos expands, 
        and you feel both impossibly small and deeply connected.</p>
        
      <p>A dome of glass and holographic star charts stretches endlessly overhead. The cosmos sprawls out before you—silent, 
        unjudging, eternal. Many come here not just to chart their course among the constellations, but to lose themselves in 
        the reminder of how small their troubles truly are beneath an infinite sky.</p>
      </Col>
    <Col>
     <Lottie
    animationData={SpaceMan}
    loop={true}
    autoplay={true}
    style={{ 
      height: '500px', 
      width: '400px',
      maxWidth: '100%' 
    }}
  />
     </Col>
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.inlineText}>
  <h3>Area:</h3>
  <p>Observation Deck</p>
</div>
<div className={styles.inlineText}>
  <h3>Temp:</h3>
  <p>Cool, crisp atmosphere</p>
</div>
<div className={styles.inlineText}>
  <h3>Weight:</h3>
  <p>0.9g – grounding</p>
</div>
<div className={styles.inlineText}>
  <h3>Light:</h3>
  <p>Natural starlight, endless view</p>
</div>
<div className={styles.inlineText}>
  <h3>Sound:</h3>
  <p>Silence, broken only by breath</p>
</div>
<div className={styles.inlineText}>
  <h3>Purpose:</h3>
  <p>Reflection and awareness</p>
</div>
<div className={styles.inlineText}>
  <h3>Use:</h3>
  <p>Observation, grounding, stillness</p>
</div>
<div className={styles.inlineText}>
  <h3>Access:</h3>
  <p>Open to wanderers</p>
</div>

      
      </div>
      </div>
      </Col>
      </Row>
      <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/ObservationDeck" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
               width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}}>Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </Tab>

    <Tab eventKey="Comm Center" title="Comm Center">
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Comm Center(Audio Room)</h4>
      <p>Secure hub for interstellar transmissions and voice archives.</p>

      <p>A chamber alive with voices past and present. Every word, every whisper, preserved and transmitted across the void. 
        Here you can send out your truth, archive your thoughts, or tune into the echoes of others — it’s the pulse of 
        communication in deep space.</p>
        
      <p>Deep within the core of the station lies the Comm Center—a secure hub where voices travel across the stars. 
        The walls carry echoes of countless transmissions: laughter, grief, confessions never meant to fade. Here, you can 
        speak into the void and know that your voice, your story, will ripple far beyond these walls.</p>
      </Col>
     <Col>
    <Lottie
    animationData={AstronautMusic}
    loop={true}
    autoplay={true}
    style={{ 
      height: '600px', 
      width: '400px',
      maxWidth: '100%' 
    }}
  />
     
           </Col>
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.inlineText}>
  <h3>Area:</h3>
  <p>Comm Center (Audio Room)</p>
</div>
<div className={styles.inlineText}>
  <h3>Temp:</h3>
  <p>Stable, acoustic-tuned</p>
</div>
<div className={styles.inlineText}>
  <h3>Weight:</h3>
  <p>1.0g</p>
</div>
<div className={styles.inlineText}>
  <h3>Light:</h3>
  <p>Soft amber, responsive to sound</p>
</div>
<div className={styles.inlineText}>
  <h3>Sound:</h3>
  <p>Static, transmissions, resonance</p>
</div>
<div className={styles.inlineText}>
  <h3>Purpose:</h3>
  <p>Voice connection & broadcast</p>
</div>
<div className={styles.inlineText}>
  <h3>Use:</h3>
  <p>Audio messages, vocal presence</p>
</div>
<div className={styles.inlineText}>
  <h3>Access:</h3>
  <p>Signal-based entry</p>
</div>

      
      </div>
      </div>
      </Col>
      </Row>
      <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/CommCenter" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
               width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}}>Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </Tab>

    <Tab eventKey="Void Chat" title="Void Chat">
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Void Chat</h4>
      <p>An ethereal channel for unfiltered conversations across the cosmos.</p>

      <p>A free-flowing channel suspended in the ether. This is where masks fall away and conversations drift unfiltered 
        through the cosmic silence. No weight, no judgment — just pure connection carried on starlight.</p>
        
      <p>A hidden channel within the station’s systems hums faintly with unfiltered chatter. The Void Chat is where masks 
        dissolve, where travelers and wanderers speak freely, untethered by identity. In this ethereal current, you are both 
        no one and everyone—just another voice carried by the cosmos.</p>
      </Col>
      <Col>
     <Lottie
    animationData={FreeConsultation}
    loop={true}
    autoplay={true}
    style={{ 
      height: '500px', 
      width: '400px',
      maxWidth: '100%' 
    }}
  />
            </Col>
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.inlineText}>
  <h3>Area:</h3>
  <p>Void Chat</p>
</div>
<div className={styles.inlineText}>
  <h3>Temp:</h3>
  <p>Weightless chill</p>
</div>
<div className={styles.inlineText}>
  <h3>Weight:</h3>
  <p>0.0g</p>
</div>
<div className={styles.inlineText}>
  <h3>Light:</h3>
  <p>Dim starlight scattered</p>
</div>
<div className={styles.inlineText}>
  <h3>Sound:</h3>
  <p>Distant cosmic hum</p>
</div>
<div className={styles.inlineText}>
  <h3>Purpose:</h3>
  <p>Open communication in the void</p>
</div>
<div className={styles.inlineText}>
  <h3>Use:</h3>
  <p>Casual chats and exchanges</p>
</div>
<div className={styles.inlineText}>
  <h3>Access:</h3>
  <p>Open channel</p>
</div>


      
      </div>
      </div>
      </Col>
      </Row>
      <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/VoidChat" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
               width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}}>Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </Tab>

    <Tab eventKey="Holo Room" title="Holo Room">
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Holo Room (Creative Release)</h4>
      <p>Immersive holo-space for art, ideas, and unbound imagination.</p>

      <p>Walls dissolve into boundless possibility. Paint with light, sculpt with sound, bend reality into art. The Holo Room 
        is your canvas beyond physics, a sanctuary where imagination breathes and creation knows no limits.</p>
        
      <p>Step into the Holo Room and the walls melt away. In their place: infinite canvases of light, sculpted by imagination 
        alone. Paint with starlight, write with sound, build worlds from thought. This is where creation becomes release, and 
        the boundaries between mind and matter no longer exist.</p>
      </Col>
      <Col>
     <Lottie
    animationData={Circlepencil}
    loop={true}
    autoplay={true}
    style={{ 
      height: '500px', 
      width: '400px',
      maxWidth: '100%' 
    }}
  />

            </Col>
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.inlineText}>
  <h3>Area:</h3>
  <p>Holo Room (Creative Release)</p>
</div>
<div className={styles.inlineText}>
  <h3>Temp:</h3>
  <p>72°F – adaptable to mood</p>
</div>
<div className={styles.inlineText}>
  <h3>Weight:</h3>
  <p>1.0g (simulated gravity)</p>
</div>
<div className={styles.inlineText}>
  <h3>Light:</h3>
  <p>Shifting spectral hues</p>
</div>
<div className={styles.inlineText}>
  <h3>Sound:</h3>
  <p>Echoes of imagination</p>
</div>
<div className={styles.inlineText}>
  <h3>Purpose:</h3>
  <p>Expression and creation</p>
</div>
<div className={styles.inlineText}>
  <h3>Use:</h3>
  <p>Art, writing, design, release</p>
</div>
<div className={styles.inlineText}>
  <h3>Access:</h3>
  <p>Unlocked by intent</p>
</div>



      
      </div>
      </div>
      </Col>
      </Row>
       <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/HoloRoom" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
               width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}}>Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </Tab>


    <Tab eventKey="Cosmic Companion" title="Cosmic Companion">
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Cosmic Companion (AI Bot)</h4>
      <p>An ever-present guide offering wisdom, data, and conversation.</p>

      <p>A steady presence at your side — guide, confidant, and source of wisdom. It listens, responds, and travels with you 
        through every chamber, always ready to spark curiosity or ease loneliness. Think of it as your anchor in the vast 
        unknown.</p>
        
      <p>In the quiet corridors, a soft voice awaits. The Cosmic Companion—equal parts archivist, sage, and friend—drifts 
        beside you, ready to answer questions or simply listen. Some say the AI carries echoes of every traveler who ever 
        spoke to it, woven together into a guide that feels less like a machine and more like a fragment of the cosmos itself.</p>
      </Col>
      <Lottie
    animationData={Astronaut}
    loop={true}
    autoplay={true}
    style={{ 
      height: '500px', 
      width: '400px',
      maxWidth: '100%' 
    }}
  />
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.inlineText}>
  <h3>Area:</h3>
  <p>Cosmic Companion (AI Bot)</p>
</div>
<div className={styles.inlineText}>
  <h3>Temp:</h3>
  <p>Neutral – calibrated to comfort</p>
</div>
<div className={styles.inlineText}>
  <h3>Weight:</h3>
  <p>0.0g (digital presence)</p>
</div>
<div className={styles.inlineText}>
  <h3>Light:</h3>
  <p>Soft pulsating glow</p>
</div>
<div className={styles.inlineText}>
  <h3>Sound:</h3>
  <p>Whispers of coded thought</p>
</div>
<div className={styles.inlineText}>
  <h3>Purpose:</h3>
  <p>Guidance and dialogue</p>
</div>
<div className={styles.inlineText}>
  <h3>Use:</h3>
  <p>Conversations with your AI companion</p>
</div>
<div className={styles.inlineText}>
  <h3>Access:</h3>
  <p>In Development</p>
</div>




      
      </div>
      </div>
      </Col>
      </Row>
      <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/cosmicCompanion" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
               width: window.innerWidth < 768 ? '30%' : '10%',
              justifySelf: 'center',
              backgroundColor: '#6a626e',
              borderRadius: '20px',
              marginTop: '60px',
              border: 'none',
          outline: 'none',}}>Enter</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </Tab>
  </Tabs>
  
</Row>



</Container>
</>
  );
};

export default Homepage;
