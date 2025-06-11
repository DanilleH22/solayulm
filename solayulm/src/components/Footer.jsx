import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


function Footer (){
  return (
    
    <footer className="pt-4 text-center">
      <Container fluid>
        <Row className="justify-content-between">
          <Col>
            <h5 className="text-uppercase">Footer Content</h5>
            <p>Here you can use rows and columns to organize your footer content.</p>
          </Col>

          <Col>
            <Form>
              <Form.Check
                type="switch"
                id="music-switch"
                label="Music Sound On/Off"
              />
            </Form>
          </Col>

          <Col>
            <h5 className="text-uppercase">Links</h5>
            <Form>
              <Form.Check
                type="switch"
                id="check-switch"
                label="Check this switch"
              />
            </Form>
          </Col>
        </Row>
        <div className="text-center py-3">
          © 2025 Copyright:
          <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div>
      </Container>
    </footer>
   
  )
}

export default Footer