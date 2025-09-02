import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const DecompressionBay = () => {
  return (
    
    <Container fluid>
        <Row className='text-center my-5'>
      <h1>Decompression Bay</h1>
    <p>Welcome to Decompression bay. more text about what to expect</p>
    <p>Soft lighting, calming sounds, and a tranquil atmosphere designed to help you unwind and relax.</p>
    </Row>
    <div className='text-center'>
    <h3>Choose your session length</h3>
        <p>Select a duration that fits your schedule and needs.</p>
        </div>
        <Row md={6} className='text-center my-5'>
        
        <Button variant="primary"  className='m-3'>5 minutes</Button>
        <Button variant="primary"  className='m-3'>10 minutes</Button>
        <Button variant="primary"  className='m-3'>15 minutes</Button>
        <Button variant="primary"  className='m-3'>20 minutes</Button>
        <Button variant="primary"  className='m-3'>30 minutes</Button>
        <Button variant="primary"  className='m-3'>45 minutes</Button>
        <Button variant="primary"  className='m-3'>60 minutes</Button>
        </Row> 

        <Row className='text-left align-items-left my-5'>
        <Col>
        <div>
            <p>System check</p>
        </div>
        <div>
            <p>Ambient tracks</p>
        </div>
        <div>
            <p>Change colour</p>
        </div>
        <div>
            <p>Oxygen levels</p>
        </div>
        <div>
            <h3>Ready to begin?</h3>
            <p>Click the button below to start your decompression session.</p>
            <Button variant="success" >Start Session</Button>
        </div>
        </Col>
        
        </Row>

    </Container>
  )
}

export default DecompressionBay
