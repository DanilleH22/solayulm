import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

// 🔹 Reusable Card Component
const ToolCard = ({ title, text, link }) => {
  return (
    <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#ddb0ffff' }}>
      <Card.Img 
        variant="top" 
        src="https://via.placeholder.com/300x200" 
      />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Link href={link}>Explore</Card.Link>
      </Card.Body>

      <Card.Body>
        <h6 className="text-center">Benefits:</h6>
        <ul className="small mb-0">
          <li>Supports the space</li>
          <li>Enhances your environment</li>
          <li>Curated for calm</li>
        </ul>
      </Card.Body>
    </Card>
  );
};

// 🔹 Section Data (EASY TO EDIT / SCALE)
const sections = [
  { title: "Featured Tools", items: 3 },
  { title: "Creative Space", items: 4},
  { title: "Mindfulness Space", items: 4 },
  { title: "Body Space", items: 4 },
];

const ToolKit = () => {
  return (
    <>
      <Helmet>
        <title>Toolkit – Create Your Serene Space | Solayulm</title>
        <meta 
          name="description" 
          content="Shop Solayulm’s Toolkit — curated wellness items and ambient products to turn your space into a sanctuary." 
        />
      </Helmet>

      <Container>

        {/* 🔹 Header */}
        <Row className="text-center mb-4 px-3 px-md-0">
          <Col>
            <h1>The Solayulm Toolkit</h1>
            <p>
              ✨ Welcome to my toolkit — a curated space of things that make the 
              Solayulm experience feel deeper, calmer, and more inspired.
              <br />
              Each link supports the space and keeps it ad-free 💫
            </p>
          </Col>
        </Row>

        {/* 🔹 Sections */}
        {sections.map((section, i) => (
          <div key={i} className="my-5">

            <h3 className="text-center mb-4">
              {section.title}
            </h3>

           <Row className="g-4 justify-content-center px-3 px-md-0" >


              {Array.from({ length: section.items }).map((_, idx) => (
                <Col  className='text-center'
                  key={idx}
                  xs={12}     // mobile
                  sm={6}      // small screens
                  md={4}      // tablets
                  lg={3}      // desktop
                >
                  <ToolCard 
                    title="Card Title"
                    text="Some quick example text to build on the card title."
                    link="#"
                  />
                </Col>
              ))}
            </Row>

          </div>
        ))}

        {/* 🔹 Footer Note */}
        <Row className="pt-4">
          <Col className="text-center">
            <p className="small">
              These links are affiliate-based — meaning I may earn a small commission 
              if you explore through them. This helps keep Solayulm free and glowing ✨
            </p>
          </Col>
        </Row>
         <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Link to="/Rooms" className="text-decoration-none">
              <button 
                className="custom-exit-btn"
                style={{
                  fontSize: window.innerWidth < 768 ? '16px' : '20px',
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff1a',
                  border: '1px solid #ddb0ffff',
                 
                  padding: window.innerWidth < 768 ? '8px 20px' : '5px 15px',
                  minWidth: window.innerWidth < 768 ? '90px' : '150px',
                  transition: 'all 0.3s ease'
                }}
              >
                Exit
              </button>
            </Link>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default ToolKit;
