import React, { useCallback }  from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col, Button,  Tabs, Carousel, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Rooms.module.css'
import s7 from '../../assets/images/s7.PNG';
import s8 from '../../assets/images/s8.PNG';
import s9 from '../../assets/images/s9.PNG';
import s10 from '../../assets/images/s10.PNG';
import s11 from '../../assets/images/s11.PNG';
import s12 from '../../assets/images/s12.PNG';
import s13 from '../../assets/images/s13.PNG';
import img_3212 from '../../assets/images/IMG_3212.jpeg';
import ScrollAnimation from '../../components/ScrollAnimation.jsx';
import { useSpring, animated } from '@react-spring/web';

const Rooms = () => {
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

  return (
    <Container fluid>
    <ScrollAnimation animationVariants={{
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }
  }}>
    <Row className={styles.servicesTextWrapper}>
  <Col className={styles.servicesText} md={6}>
    <h3>Decompression Bay</h3>
    <h3>Description : </h3>
    <p>Here, the hum of machinery softens into silence. Gravity stabilizers hum low beneath your feet as the station 
        welcomes you back from the chaos outside. This chamber is a sanctuary for weary travelers—a place to let the tension 
        bleed away, to breathe, and to remember that you are safe within these walls.</p>

   <h3>Room Details:</h3>
   <p>Adjustable gravity recliners, calming soundscapes, oxygen-enriched air, and guided decompression sequences.</p>

   <h3>Purpose</h3>
   <p>To ground the body and calm the mind after stress or exposure to overwhelming environments.</p>

   <h3>When to use it?</h3>
   <p>After a long day, during heightened anxiety, or when you need to center yourself before continuing your journey.</p>
   <div className={styles.exploringButton}>
  <Link to="/DecompressionBay">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>

  </Col>
  <Col md={6} className={styles.servicesImg}>
   <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={img_3212}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
    {/* <img src={img_3212} alt="space" /> */}
  </Col>
  
</Row>
</ScrollAnimation>

<ScrollAnimation >
<Row className={styles.servicesTextWrapper}>
  
<Col md={3} className={styles.servicesImg}>
    {/* <img src={s8} alt="space" /> */}
    <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s8}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
  </Col>
  <Col className={styles.servicesText}>
    <h3>Airlock Journal</h3>
    <h3>Description : </h3>
    <p>The airlock doors whisper closed, and with them, the noise of the world falls away. Here, before stepping out into the 
        infinite void, explorers carve their thoughts into digital logs—last words, quiet confessions, fragments of truth. 
        This is a space for release, a moment to unburden yourself before venturing into the unknown.</p>

   <h3>Room Details:</h3>
   <p>Private digital logs, voice-to-text journals, encryption for secrets, and ambient quiet to encourage reflection.</p>

   <h3>Purpose</h3>
   <p>To create a space for release and reflection, allowing thoughts to be recorded and preserved.</p>

   <h3>When to use it?</h3>
   <p>When you feel burdened, before transitions, or whenever you need to let go of thoughts that weigh you down.</p>
   <div className={styles.exploringButton}>
  <Link to="/AirlockJournal">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>
  </Col>
</Row>
</ScrollAnimation>

<ScrollAnimation animationVariants={{
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }
  }}>
<Row className={styles.servicesTextWrapper}>
  <Col className={styles.servicesText}>
    <h3>Obsrvation Deck</h3>
    <h3>Description : </h3>
    <p>A dome of glass and holographic star charts stretches endlessly overhead. The cosmos sprawls out before you—silent, 
        unjudging, eternal. Many come here not just to chart their course among the constellations, but to lose themselves in 
        the reminder of how small their troubles truly are beneath an infinite sky.</p>

   <h3>Room Details:</h3>
   <p>Panoramic starlit views, real-time celestial maps, meditation cushions, and calming ambient light cycles.</p>

   <h3>Purpose</h3>
   <p>To inspire perspective and awe, reminding travelers of their place in the grand expanse.</p>

   <h3>When to use it?</h3>
   <p>When you need clarity, grounding, or simply to be reminded of the beauty beyond your worries.</p>
   <div className={styles.exploringButton}>
  <Link to="/observation-deck">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>
  </Col>
  <Col md={3} className={styles.servicesImg}>
    {/* <img src={s9} alt="space" /> */}
    <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s9}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
  </Col>
</Row>
</ScrollAnimation>

<ScrollAnimation >
<Row className={styles.servicesTextWrapper}>
<Col md={3} className={styles.servicesImg}>
    {/* <img src={s10} alt="space" /> */}
    <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s10}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
  </Col>
  <Col className={styles.servicesText}>
    <h3>Comm Center (Audio Room)</h3>
    <h3>Description : </h3>
    <p>Deep within the core of the station lies the Comm Center—a secure hub where voices travel across the stars. The walls 
        carry echoes of countless transmissions: laughter, grief, confessions never meant to fade. Here, you can speak into 
        the void and know that your voice, your story, will ripple far beyond these walls.</p>

   <h3>Room Details:</h3>
   <p>Voice recording booths, encrypted message capsules, sound archives, and the ability to send transmissions across the 
    network.</p>

   <h3>Purpose</h3>
   <p>To give travelers a place to express, connect, and preserve their voices in the galaxy.</p>

   <h3>When to use it?</h3>
   <p>When you feel the need to speak openly, reach out, or preserve your words for someone—or something—beyond yourself.</p>
   <div className={styles.exploringButton}>
  <Link to="/comm-center">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>
  </Col>
</Row>
</ScrollAnimation>

<ScrollAnimation animationVariants={{
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }
  }}>
<Row className={styles.servicesTextWrapper}>
  <Col className={styles.servicesText}>
    <h3>Void Chat</h3>
    <h3>Description : </h3>
    <p>A hidden channel within the station’s systems hums faintly with unfiltered chatter. The Void Chat is where masks 
        dissolve, where travelers and wanderers speak freely, untethered by identity. In this ethereal current, you are both 
        no one and everyone—just another voice carried by the cosmos.</p>

   <h3>Room Details:</h3>
   <p>Anonymized connections, real-time chat streams, and ephemeral conversations that vanish like stardust.</p>

   <h3>Purpose</h3>
   <p>To provide raw, unfiltered social release without the weight of identity.</p>

   <h3>When to use it?</h3>
   <p>When you crave connection without expectation, or when you want to share truths without leaving a trace.</p>
   <div className={styles.exploringButton}>
  <Link to="/void-chat">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>
  </Col>
  <Col md={3} className={styles.servicesImg}>
    {/* <img src={s11} alt="space" /> */}
    <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s11}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
  </Col>
</Row>
</ScrollAnimation>

<ScrollAnimation >
<Row className={styles.servicesTextWrapper}>
<Col md={3} className={styles.servicesImg}>
    {/* <img src={s12} alt="space" /> */}
    <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s12}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
  </Col>
  <Col className={styles.servicesText}>
    <h3>Holo Room (Creative Release)</h3>
    <h3>Description : </h3>
    <p>Step into the Holo Room and the walls melt away. In their place: infinite canvases of light, sculpted by imagination 
        alone. Paint with starlight, write with sound, build worlds from thought. This is where creation becomes release, and 
        the boundaries between mind and matter no longer exist.</p>

   <h3>Room Details:</h3>
   <p>Immersive holographic creative tools—painting, soundscapes, world-building, and 3D storytelling environments.</p>

   <h3>Purpose</h3>
   <p>To give travelers an outlet for expression, turning inner turbulence into beauty and form.</p>

   <h3>When to use it?</h3>
   <p>When emotions overflow, when ideas spark, or when you long to make something uniquely yours.</p>
   <div className={styles.exploringButton}>
  <Link to="/holo-room">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>
  </Col>
</Row>
</ScrollAnimation>

<ScrollAnimation animationVariants={{
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }
  }}>
<Row className={styles.servicesTextWrapper}>
  <Col className={styles.servicesText}>
    <h3>Cosmic Companion AI Bot</h3>
    <h3>Description : </h3>
    <p>In the quiet corridors, a soft voice awaits. The Cosmic Companion—equal parts archivist, sage, and friend—drifts 
        beside you, ready to answer questions or simply listen. Some say the AI carries echoes of every traveler who ever 
        spoke to it, woven together into a guide that feels less like a machine and more like a fragment of the cosmos itself.
        </p>

   <h3>Room Details:</h3>
   <p>Guidance, conversation, knowledge access, and adaptive companionship tuned to your emotional state.</p>

   <h3>Purpose</h3>
   <p>To ensure no traveler ever feels alone, offering both wisdom and presence.</p>

   <h3>When to use it?</h3>
   <p>When you feel lost, curious, or simply in need of a voice to remind you that you’re not drifting through the void alone.
   </p>
   <div className={styles.exploringButton}>
  <Link to="/cosmic-companion">
    <Button className={styles.exploreBtn}>Explore</Button>
  </Link>
</div>
  </Col>
  <Col md={3} className={styles.servicesImg}>
    {/* <img src={s13} alt="space" /> */}
    <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s13}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
  </Col>
</Row>
</ScrollAnimation>

    </Container>
  )
}

export default Rooms
