import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <Container className="my-5 text-light">
      {/* Header */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4">About Solayulm</h1>
          <p className="lead">
            A space for calm, creativity, and cosmic reflection.
          </p>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <img
            src="/images/galaxy.jpg"
            alt="Cosmic view"
            style={{ width: "100%", borderRadius: "12px" }}
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
        <Col md={6} >
          <h2 className="text-center">Our Story</h2>
          <p>
            Solayulm was born out of a passion for both wellness and wonder. In
            a world that moves too fast, we wanted to create a digital
            constellation—one that guides you back to yourself through art,
            reflection, and space to breathe.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="/images/starscape.jpg"
            alt="Constellation"
            style={{ width: "100%", borderRadius: "12px" }}
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
