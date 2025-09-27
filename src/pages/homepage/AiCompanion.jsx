import react from 'react';
import NoddingAvatar from "../../components/AiCompanion/NoddingAvatar";
import ChatBox from "../../components/AiCompanion/ChatBox";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";


const AiCompanion = () => {
  return (
    <div>
        <Row>
            <Col className='text-center mb-5'>
                <h1>Cosmic Companion</h1>
                <p>Need a companion, speak to our cosmic astronaut</p>
            </Col>
        </Row>
    <Row >
        <Col className="d-flex justify-content-end">
      <NoddingAvatar  />
    </Col>
    <Col>
        <ChatBox />
        </Col>
    </Row>
     <Row>
                    <Col md={12}>
                    <div className="flex justify-content-center align-items-center" >
                    <Link to="/Rooms" style={{ textDecoration: 'none'}}>
                      <Button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
              width: '10%',
              justifySelf: 'center',
              backgroundColor: '#6e6ef0',
              borderRadius: '20px',
             
              marginTop: '60px'}}>Exit</Button>
                      </Link>
                    </div>
                    </Col>
                </Row>
    </div>
  )
}

export default AiCompanion
