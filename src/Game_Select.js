import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"
import GameWrapper from "./GameWrapper.js"
import Header from "./components/Header.js"
import Level from "./components/level.js"
import LeaderBoard from "./components/Leaderboard.js"

const LevelSelect = () => {
  const [currentLevel, setCurrentLevel] = useState(null)

  const setLevel = (id) => {
    setCurrentLevel(id)
  }

  return (
    <HashRouter>
      <Header currentLevel={currentLevel} />
      <main>
      <Routes>
        <Route path="/" element={<GameWrapper />} />
        <Route path="/game" element={<Level setLevel={setLevel} currentLevel={currentLevel} />} />
        <Route path="/leaderboard" element={<LeaderBoard currentLevel={currentLevel} />} />
      </Routes>
      </main>
    </HashRouter>
  );
};

export default LevelSelect
