import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import s5 from '../assets/images/s5.PNG';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faGithub, faLinkedin, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";




import '@fortawesome/fontawesome-free/css/all.min.css';


import useSound from 'use-sound';





// import ambience from '../assets/sounds/ambience.mp3';

function Footer() {

  

  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound('/music/Midnight_Bliss.mp3');

  const handleClick = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };




  return (
    <footer className="pt-4 text-center">
      <Container fluid>
        <Row className="justify-content-between align-items-center">
          {/* Left Image */}
          <Col className="d-flex justify-content-center">
            <img src={s5} alt="space" />
          </Col>

          {/* Centered Text */}
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-uppercase">Footer Content</h5>
            <p>
              Here you can use rows and columns to organize your footer content.
            </p>
            <p>About</p>
            <p>Gallery</p>
            <p>Rooms</p>
            <p>Help available</p>
          </Col>

          {/* Music Switch */}
          <Col className="d-flex justify-content-center">
          <Form>
            <h4>Music </h4>
      <Form.Check
        type="switch"
        id="music-switch"
        onClick={handleClick}
        checked={isPlaying}
      />
    </Form>

    {/* <span>
            <FontAwesomeIcon icon={isPlaying ? faVolumeUp : faVolumeMute} /> Music
          </span> */}
            
    
            
            <Form>
            <h4>Ambience </h4>
              <Form.Check
                type="switch"
                id="check-switch"
                
              />
            </Form>

            

    
          </Col>

          {/* Links Switch */}
          <Col className="d-flex flex-column justify-content-center align-items-center">
    
           
            <div className="social-icons">
  <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faTwitter} size="2x" />
  </a>
  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faInstagram} size="2x" />
  </a>
  <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faGithub} size="2x" />
  </a>
  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faLinkedin} size="2x" />
  </a>
  <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faYoutube} size="2x" />
  </a>
  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFacebook} size="2x" />
  </a>
</div>
<div>
  {/* this will open a modal about donating/showing support to keep the page going not mandatory though */}
  <button style={{backgroundColor: '#6a626e', marginTop: '20px', width: '30%', borderRadius: '5px'}} >Donate</button>
</div>

            
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="text-center py-3">
          © 2025 Copyright:
          <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
