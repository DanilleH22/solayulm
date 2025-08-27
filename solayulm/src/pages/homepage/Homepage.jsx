import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SpaceCard from '../../components/SpaceCard.jsx';
import Typewriter from 'typewriter-effect';
import styles from '../../styles/Homepage.module.css'
import s1 from '../../assets/images/s1.jpg';
import s2 from '../../assets/images/s2.PNG';
import s6 from '../../assets/images/s6.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'


const Homepage = () => {
  return (
    <Container fluid>
  <div className={styles.imgTextWrapper}>
    <img 
      src={s1}
      alt="space" 
      className={styles.bgImage}
    />
    <div className={styles.overlayText}>
      <h1>What do we do?</h1>
      <p>Solayulm is your serene pocket of the universe. A digital escape where calm meets the cosmos. Whether you are here to unwind, write a quiet though or simply float for a while, you've arrived to the perfect place. The queiet edge of the galaxy. No noise. No pressure. Just a gentle space to breathe.</p>
              
    </div>
    <div className={styles.TextTop}>
      <h1 style={{fontSize: '150px'}}>SOLAYULM</h1>
    </div>
    
    <img 
      src={s2}
      alt="space" 
      className={styles.bgImage2}
    />
    <div className={styles.TextBottom}>
      <h3><Typewriter
  options={{
    strings: ['Welcome to the quiet edge of the galaxy.'],
    autoStart: true,
    loop: true,
  }}
/></h3>
    </div>
    <div className={styles.exploreButton}>
      <Button>Explore</Button>
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
    <img src={s6} alt="space" />
  </Col>
</Row>

</Container>

  );
};

export default Homepage;
