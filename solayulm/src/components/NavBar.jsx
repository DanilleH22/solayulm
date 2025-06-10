import React from "react";
import { Navbar, Container } from "react-bootstrap";


/**
 * Navigation bar.
 */
const NavBar = () => {
  

  return (
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            {/* <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} */}
            <strong>Solayulm</strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
  );
}


export default NavBar;