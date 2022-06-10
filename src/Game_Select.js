import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js"
import GameWrapper from "./GameWrapper.js"

const LevelSelect = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LevelSelect
