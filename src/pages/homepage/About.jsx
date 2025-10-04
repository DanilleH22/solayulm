import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from "lottie-react";
import astronautFisherman from '../../assets/Animations/astronautFishermen.json';
import astronautTelescope from '../../assets/Animations/astronautTelescope.json';
import s14 from '../../assets/images/s14.PNG';

const AboutPage = () => {
  return (
    <Container className="my-5 text-light">
      {/* Header */}
      <Row className="text-center mb-3">
        <Col>
          <h1 className="display-4">About Solayulm</h1>
          <p>
            A space for calm, creativity, and cosmic reflection.
          </p>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row className="align-items-center mb-3">
        <Col md={6}>
          
          <Lottie
              animationData={astronautFisherman}
              loop={true}
              autoplay={true}
              style={{ 
                height: '500px', 
                width: '400px',
                maxWidth: '100%' 
              }}
            />
        </Col>
        <Col md={6} className="text-center">
          <h2>Our Mission</h2>
          <p>
            We built Solayulm as a place where imagination meets relaxation.
            Whether it’s drawing constellations, reflecting on your energy, or
            tuning into calming transmissions, our goal is to help you
            decompress and rediscover balance.
          </p>
          <p>
  Beyond just relaxation, Solayulm is about creating a safe, immersive space 
  where you can explore your thoughts, emotions, and creativity without 
  judgment. We aim to provide tools and experiences that encourage mindfulness, 
  presence, and self-discovery—so every moment spent here leaves you feeling 
  lighter, inspired, and more connected to yourself.
</p>
        </Col>
      </Row>

      {/* Disclaimer Section */}
      <Row>
        <Col className="text-center mb-5">
              <div>
            <h2 >Disclaimer!</h2>
<p>
  In Solayulm, there are no profiles. Whatever page you complete will not be
  saved—except for the Holo Room. This is by design: Solayulm is about release.
</p>
<p>
  You can’t fully let go if you’re storing everything away. Here, the focus
  is on expressing yourself, then practicing release. Think of it as 
  writing your thoughts into the stars—there for the moment, but not 
  carried with you.
</p>
<p>
  By not having profiles, Solayulm helps you practice the art of release.
</p>
          </div>
        </Col>
      </Row>

      {/* Values Section */}
      <Row className="text-center mb-5">
        <Col md={4} className="mb-4 ">
          <Card className="bg-dark h-100 shadow-lg border-0">
            <Card.Body >
              <h3 className="align-items-center">&#127769;</h3>
              <h4 style={{ color: 'beige', textDecoration: 'underline' }}>Calm</h4>
              <p>
                We believe calmness is the foundation of creativity. Our tools
                are designed to bring stillness to your day.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="bg-dark h-100 shadow-lg border-0">
            <Card.Body>
              <h3>✨</h3>
              <h4 style={{ color: 'beige', textDecoration: 'underline' }}>Creativity</h4>
              <p>
                Every feature sparks imagination—whether through colouring,
                connecting stars, or exploring new constellations.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="bg-dark h-100 shadow-lg border-0">
            <Card.Body>
              <h3 className="justify-content-center">🌌</h3>
              <h4 style={{ color: 'beige', textDecoration: 'underline' }}>Connection</h4>
              <p>
                We connect inner reflection with outer space—linking your
                well-being to the infinite sky above.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Story / Why We Built This */}
      <Row className="align-items-center mb-5">
        <Col md={8} >
        <div>
          <h2 className="text-center">Our Story</h2>
          <p>
            Solayulm was born out of a passion for both wellness and wonder. In
            a world that moves too fast, we wanted to create a digital
            constellation—one that guides you back to yourself through art,
            reflection, and space to breathe.
          </p>
          <p>
  Every feature of Solayulm was crafted with intention. From the gentle 
  transmissions that calm the mind to the interactive spaces that spark 
  creativity, we wanted users to feel a sense of presence and freedom. 
  It’s not just an app—it’s a sanctuary where your imagination and your 
  well-being can coexist.
</p>

<p>
  Our journey continues as we explore new ways to help people release, 
  reflect, and recharge. Solayulm is a space that evolves with you, offering 
  moments of pause and inspiration in a fast-paced world. Here, you are 
  encouraged to let go, dream freely, and reconnect with the parts of yourself 
  that often get lost in the noise of everyday life.
</p>

          </div>
        </Col>
        <Col md={4}>
           <Lottie
              animationData={astronautTelescope}
              loop={true}
              autoplay={true}
              style={{ 
                height: '500px', 
                width: '400px',
                maxWidth: '100%' 
              }}
            />
        </Col>
      </Row>

      {/* Closing Section */}
      <Row className="text-center">
        <Col>
          <h2>Join Our Journey</h2>
          <p>
            Explore the constellations, embrace calm, and reconnect with your
            inner universe. This is your space—welcome to Solayulm.
          </p>
        </Col>
      </Row>

       <Row>
                <Col md={12}>
                <div className="flex justify-content-center align-items-center" >
                <Link to="/Rooms" style={{ textDecoration: 'none'}}>
                  <Button className="bg-dark h-100 shadow-lg border-0"  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
          
          justifySelf: 'center',
          width: window.innerWidth < 768 ? '30%' : '10%',
         
          marginTop: '60px'}}>Rooms</Button>
                  </Link>
                </div>
                </Col>
            </Row>
    </Container>
  );
};

export default AboutPage;
