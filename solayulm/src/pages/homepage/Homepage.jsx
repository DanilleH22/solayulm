import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Homepage = () => {
  return (
    <Container fluid className="d-flex flex-column">
      <Row className="justify-content-left">
        <Col className="text-center">
          <h2>You've arrived! Welcome to the quiet edge of the galaxy.</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
