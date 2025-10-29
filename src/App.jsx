import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx" 
import Rooms from "./pages/homepage/Rooms.jsx"
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import DecompressionBay from "./pages/homepage/DecompressionBay.jsx";
import "./App.css";
import AirlockJournal from "./pages/homepage/AirlockJournal.jsx";
import ObservationDeck from "./pages/homepage/ObservationDeck.jsx";
import Testing from "./pages/homepage/testing.jsx";
import CommCenter from "./pages/homepage/CommCenter.jsx";
import VoidChat from "./pages/homepage/VoidChat.jsx";
import HoloRoom from "./pages/homepage/HoloRoom.jsx";
import AiCompanion from "./pages/homepage/AiCompanion.jsx";
import AboutPage from "./pages/homepage/About.jsx";
import HelpPage from "./pages/homepage/HelpAvailable.jsx";
import Homepage2 from "./pages/homepage/Homepage2.jsx";
import GoToTop from "../src/components/GoToTop.jsx";
import ToolKit from "./pages/homepage/ToolKit.jsx";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <div className="page-content">
           <GoToTop />
          <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/DecompressionBay" element={<DecompressionBay />} />
          <Route path="/AirlockJournal" element={<AirlockJournal />} />
          <Route path="/ObservationDeck" element={<ObservationDeck />} />
          <Route path="/CommCenter" element={<CommCenter />} />
          <Route path="/VoidChat" element={<VoidChat />} />
          <Route path="/HoloRoom" element={<HoloRoom />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/cosmicCompanion" element={<AiCompanion />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/HelpPage" element={<HelpPage />} />
          <Route path="/Toolkit" element={<ToolKit />} />
          <Route path="/Homepage2" element={<Homepage2 />} />
            <Route path="*" element={<h1>Page not found!</h1>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
