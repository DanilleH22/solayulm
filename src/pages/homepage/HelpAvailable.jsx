
import {React, useEffect, useState} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const HelpPage = () => {


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
    <Container className="my-5 text-light">
      <Row className="text-center mb-4">
        <h1>Help & Support</h1>
        <p>
          If you or someone you know is struggling, you are not alone. Here are
          trusted resources and support services you can reach out to for help.
        </p>
      </Row>

      {/* Emergency Section */}
      <Row className="mb-5">
        <Col>
          <Card className="bg-dark text-light p-3 shadow-lg rounded-3">
            <h3 className="text-danger">🚨 In an Emergency</h3>
            <p>
              If you are in immediate danger, please dial <strong>999 (UK)</strong> 
              or your local emergency number right away.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Mental Health Support */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="bg-dark text-light p-3 shadow rounded-3">
            <h4>🧠 Mental Health</h4>
            <ul>
              <li>
                <strong>Samaritans (UK):</strong> 116 123 —{" "}
                <a href="https://www.samaritans.org" target="_blank" rel="noreferrer">
                  samaritans.org
                </a>
              </li>
              <li>
                <strong>Mental Health Foundation:</strong>{" "}
                <a href="https://www.mentalhealth.org.uk" target="_blank" rel="noreferrer">
                  mentalhealth.org.uk
                </a>
              </li>
              <li>
                <strong>Mind:</strong> 0300 123 3393 —{" "}
                <a href="https://www.mind.org.uk" target="_blank" rel="noreferrer">
                  mind.org.uk
                </a>
              </li>
            </ul>
          </Card>
        </Col>

        {/* Self-Harm */}
        <Col md={6}>
          <Card className="bg-dark text-light p-3 shadow rounded-3"
          style={{ marginTop: window.innerWidth < 768 ? '20px' : '0' }}>
            <h4>🩹 Self-Harm Support</h4>
            <ul>
              <li>
                <strong>Harmless:</strong>{" "}
                <a href="https://www.harmless.org.uk" target="_blank" rel="noreferrer">
                  harmless.org.uk
                </a>
              </li>
              <li>
                <strong>Self Injury Support (Women & Girls):</strong> 0808 800 8088 —{" "}
                <a href="https://www.selfinjurysupport.org.uk" target="_blank" rel="noreferrer">
                  selfinjurysupport.org.uk
                </a>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Abuse Support */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="bg-dark text-light p-3 shadow rounded-3">
            <h4>💔 Domestic Violence</h4>
            <ul>
              <li>
                <strong>National Domestic Abuse Helpline:</strong> 0808 2000 247 —{" "}
                <a href="https://www.nationaldahelpline.org.uk" target="_blank" rel="noreferrer">
                  nationaldahelpline.org.uk
                </a>
              </li>
              <li>
                <strong>Refuge:</strong>{" "}
                <a href="https://www.refuge.org.uk" target="_blank" rel="noreferrer">
                  refuge.org.uk
                </a>
              </li>
            </ul>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="bg-dark text-light p-3 shadow rounded-3 h-100 "
          style={{ marginTop: window.innerWidth < 768 ? '20px' : '0' }}>
            <h4>⚖️ Sexual Abuse & Assault</h4>
            <ul>
              <li>
                <strong>Rape Crisis:</strong> 0808 802 9999 —{" "}
                <a href="https://rapecrisis.org.uk" target="_blank" rel="noreferrer">
                  rapecrisis.org.uk
                </a>
              </li>
              <li>
                <strong>Survivors UK (Men & Non-binary):</strong>{" "}
                <a href="https://www.survivorsuk.org" target="_blank" rel="noreferrer">
                  survivorsuk.org
                </a>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* International Resources */}
      <Row>
        <Col>
          <Card className="bg-dark text-light p-3 shadow rounded-3"
          style={{ marginTop: window.innerWidth < 768 ? '15px' : '0' }}>
            <h4>🌍 International Support</h4>
            <p>
              If you're outside the UK, please visit{" "}
              <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
                findahelpline.com
              </a>{" "}
              to find mental health and crisis helplines in your country.
            </p>
          </Card>
        </Col>
      </Row>
      <Row>
                      <Col md={12}>
                      <div className="flex justify-content-center align-items-center" >
                      <Link to="/#home" style={{ textDecoration: 'none'}}>
                        <Button className="bg-dark h-100 shadow-lg border-0"  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
                color: 'white',
                cursor: 'pointer',
                
                justifySelf: 'center',
                width: window.innerWidth < 768 ? '30%' : '10%',
               
                marginTop: '60px'}}>Home</Button>
                        </Link>
                      </div>
                      </Col>
                  </Row>
    </Container>
  );
};

export default HelpPage;
