import React from 'react'
import { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import gameData from "./utility/levels.js"
import cardImage from "./assets/Waldo-Images/2687212.jpg"
import './styles/GameWrapper.css'


import App from "./App.js"

const GameWrapper = () => {
  return (
    <div className="container">
      <div className="game-container">
        <div className="game-container-header">
          <h2>Choose Your Level!</h2>
        </div>
        <div className="game-container-body">
          {gameData?.map((level) => {
            return (
              <Link
                key={level.id}
                to="/game"
                state={level}
              >
                <div className="lvl-select">
                  <img src={level.image} alt=""/>
                  <div className="lvl-select-info">
                    <span style={{fontWeight: "bold"}}>{level.name}</span>
                    <span>{level.title}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="game-container-footer">
          <Link to="/leaderboard">
            LeaderBoard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameWrapper
