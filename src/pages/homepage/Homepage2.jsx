import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SpaceCard from '../../components/SpaceCard.jsx';
import Typewriter from 'typewriter-effect';




const Homepage2 = () => {
  return (
    <Container fluid className="d-flex flex-column">
      <Row className="justify-content-start p-3">
        
                <Col className={styles.topText}>
                <h2>Who Are We?</h2>
                  <h4>A peaceful digital space for you to rest and reflect or just float around for a while.</h4>
                  <p>Solayulm is your serene pocket of the universe. A digitl escape where calm meets the cosmos. Whether you are here to unwind, write a quiet though or simply float for a while, you've arrived to the perfect place. The queiet edge of the galaxy. No noise. No pressure. Just a gentle space to breathe.</p>
                </Col>
                <Col className="text-left d-flex justify-content-center">
                <Button variant="dark" style={{ width: "150px", height: "60px" }} >Explore </Button>
                </Col>
              
      </Row>
    </Container>
  );
};

export default Homepage2;





import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SpaceCard from '../../components/SpaceCard.jsx';
import Typewriter from 'typewriter-effect';



const Homepage = () => {
  return (
    <Container fluid className="d-flex flex-column">
      <Row className="justify-content-start p-3">
        <Col className="text-center">
          <h2>
          <Typewriter
  options={{
    strings: ['You have arrived! Welcome to the quiet edge of the galaxy.'],
    autoStart: true,
    loop: true,
  }}
/>
</h2>
 
        </Col>
      </Row>
      <Row className="justify-content-end p-4" style = {{display: "flex", flexWrap: "wrap" }}>
        <Col className="text-right">
          <h4>A peaceful digital space for you to rest and reflect or just float around for a while.</h4>
          <p>Solayulm is your serene pocket of the universe. A digitl escape where calm meets the cosmos. Whether you are here to unwind, write a quiet though or simply float for a while, you've arrived to the perfect place. The queiet edge of the galaxy. No noise. No pressure. Just a gentle space to breathe.</p>
        </Col>
        <Col className="text-left d-flex justify-content-center">
        <Button variant="dark" style={{ width: "200px", height: "60px" }} >Step into Stillness</Button>
        </Col>
      </Row>
      <Row>
      <div style={{ display: "flex", gap: "20px", padding: "40px"}}>
      <SpaceCard
        title="Decompression Bay"
        description="A calming chamber where crew unwind and adjust to the station’s gravity."
        
      />
      <SpaceCard
        title="Airlock Journal"
        description="A reflective space for logging thoughts before stepping into the void."
       
      />
      <SpaceCard
        title="Observation Deck"
        description="Panoramic starlit views framed by holographic star charts."
        
      />
      <SpaceCard
        title="Comm Center (Audio Room)"
        description="Secure hub for interstellar transmissions and voice archives."
       
      />
      <SpaceCard
        title="Void Chat"
        description="An ethereal channel for unfiltered conversations across the cosmos."
        
      />
      <SpaceCard
        title="Holo Room (Creative Release)"
        description="Immersive holo-space for art, ideas, and unbound imagination."
       
      />
      <SpaceCard
        title="Cosmic Companion AI Bot"
        description="An ever-present guide offering wisdom, data, and conversation."
        
      />
      
    </div>
      </Row>
    </Container>
  );
};

export default Homepage;
