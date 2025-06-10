import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx"
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.jsx";
import "./App.css";




const App = () => {
  return (
    <Container fluid>
      <NavBar />
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
    </Router>
    </Container>
  );
};

export default App;
