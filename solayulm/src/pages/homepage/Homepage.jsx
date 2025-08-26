import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SpaceCard from '../../components/SpaceCard.jsx';
import Typewriter from 'typewriter-effect';
import styles from '../../styles/Homepage.module.css'
import s1 from '../../assets/images/s1.jpg';
import s2 from '../../assets/images/s2.PNG';


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
</Container>

  );
};

export default Homepage;
