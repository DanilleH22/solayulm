import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";

const NavBar = () => {
  return (
    <Navbar className="py-3">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left side */}
        <Navbar.Brand href="/#home">
          <strong style={{ fontSize: "1.5rem", fontFamily: "Saira Stencil One" }}>Solayulm</strong>
        </Navbar.Brand>

        {/* Right side */}
        <div >
          <strong>
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              500,
              "Comfort",
              1000,
              "Peace",
              1000,
              "Serenity",
              1000,
              "Release",
              500,
            ]}
            speed={50}
            style={{ fontSize: "1.5rem", fontFamily: "Saira Stencil One",}}
            repeat={Infinity}
            className="d-flex justify-content-end"
          />
          </strong>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
