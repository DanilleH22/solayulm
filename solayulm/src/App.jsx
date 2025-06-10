import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
    </Router>
  );
};

export default App;
