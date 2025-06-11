import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Homepage = () => {
  return (
    <Container fluid className="d-flex flex-column">
      <Row className="justify-content-start">
        <Col className="text-center">
          <h2>You've arrived! Welcome to the quiet edge of the galaxy.</h2>
        </Col>
      </Row>
      <Row className="justify-content-end" Style = {{display: "flex", flexWrap: "wrap" }}>
        <Col className="text-right">
          <h3>A peaceful digital space for you to rest and reflect or just float around for a while.</h3>
          {/* longer description of what it iis needed  */}
        </Col>
        <Col className="text-left">
        <Button variant="dark" size='sm'>Begin sequence take off</Button>
        </Col>
      </Row>
      <Row>
        <Col>Rm1</Col>
        <Col>Rm2</Col>
        <Col>Rm3</Col>
        <Col>Rm4</Col>
        <Col>Rm5</Col>
        <Col>Rm6</Col>
        <Col>Rm7</Col>
      </Row>
    </Container>
  );
};

export default Homepage;
