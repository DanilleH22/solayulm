import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

// 🔹 Reusable Card Component
const ToolCard = ({ title, text, link, img }) => {
  return (
    <Card className="h-100 shadow-sm border-0 text-center" style={{ backgroundColor: '#ddb0ffff' }}>
      
      {/* Image */}
      <Card.Img 
        variant="top" 
        src={img}
        style={{ height: "200px", objectFit: "cover" }}
      />

      {/* Main Content */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Link 
          href={link} 
          target="_blank"
          style={{ fontWeight: "bold" }}
        >
          Explore →
        </Card.Link>
      </Card.Body>

      {/* Benefits */}
      <Card.Body>
        <h6 className="text-center">Benefits:</h6>
        <ul className="small mb-0" style={{ listStyle: "none", padding: 0 }}>
          <li>Supports the space</li>
          <li>Enhances your environment</li>
          <li>Curated for calm</li>
        </ul>
      </Card.Body>

    </Card>
  );
};

// 🔹 Section Data (Edit this to add more items)
const sections = [
  {
    title: "Featured Tools",
    items: [
      {
        title: "Aromatherapy Diffuser",
        text: "Creates a calm, grounding atmosphere instantly.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/diffuser"
      },
      {
        title: "Sunrise Alarm Clock",
        text: "Wake up peacefully with soft warm light.",
        img: "https://via.placeholder.com/300x200",
        link: "https://amzn.to/3P4nEOl"
      },
      {
        title: "Weighted Blanket",
        text: "Reduces anxiety & settles the nervous system.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/blanket"
      }
    ]
  },

  {
    title: "Creative Space",
    items: [
      {
        title: "Sketchbook",
        text: "Encourages free-flowing creative expression.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/sketchbook"
      },
      {
        title: "Alcohol Markers",
        text: "Bold colour for emotional expression.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/markers"
      },
      {
        title: "Watercolour Set",
        text: "Soft textures perfect for calming art sessions.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/watercolour"
      },
      {
        title: "Digital Drawing Tablet",
        text: "Express yourself digitally with ease.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/tablet"
      }
    ]
  },

  {
    title: "Mindfulness Space",
    items: [
      {
        title: "Sunrise Alarm Clock",
        text: "Wake up peacefully with soft warm light.",
        img: "https://m.media-amazon.com/images/I/91ev4YTzr+L._AC_SX679_.jpg",
        link: "https://amzn.to/3P4nEOl"
      },
      
      {
        title: "Brown Noise Machine",
        text: "Atmospheric sounds to help you relax deeply whilst calming the mind.",
        img: "https://m.media-amazon.com/images/I/51VPESetZgL._AC_SX679_.jpg",
        link: "https://amzn.to/4cYgnaN"
      },
      {
        title: "Mindfulness Puzzle Books",
        text: "A collection of restful puzzles and brain-training activities, designed to relieve stress and inspire creativity.",
        img: "https://m.media-amazon.com/images/I/81cLOTWIyFL._SY522_.jpg",
        link: "https://amzn.to/4tLilCz"
      },
     {
        title: "Electronic Tibetan Singing Bowl",
        text: "Experience the timeless resonance of a Tibetan singing bowl, reimagined in a modern electronic form.",
        img: "https://m.media-amazon.com/images/I/715U6eOmOUL._AC_SX679_.jpg",
        link: "https://amzn.to/3QM8BJW"
      }
    ]
  },

  {
    title: "Body Space",
    items: [
       {
        title: "Meditation Floor pillow",
        text: "Thoughtfully designed to support proper posture and alignment, this traditional floor pillow cradles your body in comfort during extended sitting sessions.",
        img: "https://m.media-amazon.com/images/I/8103NMMjjDL._AC_SY300_SX300_QL70_ML2_.jpg",
        link: "https://amzn.to/42Kr38b"
      },
      
      {
        title: "Large Yoga Foam Wedge",
        text: "Not only helpful for stretching before/after work out, but also beneficial to the body's recovery.",
          img: "https://m.media-amazon.com/images/I/41KJH0nKCKL._AC_SX679_.jpg",
        link: "https://amzn.to/48GAY2d"
      },
      {
        title: "Valeness Yoga Headstand Stool",
        text: "With the headstand bench, you can relieve back pain, release tension & reduce stress.",
        img: "https://m.media-amazon.com/images/I/71LTBGh4K4L._AC_SX679_.jpg",
        link: "https://amzn.to/3ODW7mY"
      },
      {
        title: "Foam Roller",
        text: "Releases physical tension from the body.",
        img: "https://via.placeholder.com/300x200",
        link: "https://example.com/roller"
      }
    ]
  }
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

        {/* Header */}
        <Row className="text-center mb-4 px-3 px-md-0">
          <Col>
            <h1>The Solayulm Toolkit</h1>
            <p>
              ✨ Curated items that deepen your sense of calm, creativity, and grounding.
              <br />
              Every link supports the Solayulm space and keeps it ad-free 💫
            </p>
          </Col>
        </Row>

        {/* Sections */}
        {sections.map((section, i) => (
          <div key={i} className="my-5">

            <h3 className="text-center mb-4">{section.title}</h3>

            <Row className="g-4 justify-content-center px-3 px-md-0">

              {section.items.map((item, idx) => (
                <Col
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <ToolCard 
                    title={item.title}
                    text={item.text}
                    img={item.img}
                    link={item.link}
                  />
                </Col>
              ))}

            </Row>
          </div>
        ))}

        {/* Footer Note */}
        <Row className="pt-4">
          <Col className="text-center">
            <p className="small">
              These are affiliate links — I may earn a small commission, which keeps Solayulm free and glowing ✨
            </p>
          </Col>
        </Row>

        {/* Exit Button */}
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
