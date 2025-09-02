import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx" 
import Rooms from "./pages/homepage/Rooms.jsx"
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import DecompressionBay from "./pages/homepage/DecompressionBay.jsx";
import "./App.css";




const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <div className="page-content">
          <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/DecompressionBay" element={<DecompressionBay />} />
            <Route path="*" element={<h1>Page not found!</h1>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
