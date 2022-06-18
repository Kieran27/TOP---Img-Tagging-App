import "../styles/LeaderBoard.css"
import lvlData from "../utility/levels.js"
import { useState, useEffect } from "react"
import { db } from '../firebase-config.js'
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"


const LeaderBoard = ({currentLevel}) => {
  const [lvlLeaderboard, setLvlLeaderboard] = useState(null)
  const [lvlRef, setLevelRef] = useState(null)
  const [isActive, setIsActive] = useState(0)

  const fetchLeaderBoardResults = async () => {
    if (!lvlRef) {
      return
    } else {
      const resultQuery = await getDocs(lvlRef)
      const results = resultQuery.docs.map(doc => ({
        data: doc.data(),
        id: doc.id
      }))
      setLvlLeaderboard(results.sort((a, b) => (a.data.time > b.data.time) ? 1 : -1))
    }
  }

  useEffect(() => {
    if (!currentLevel) {
      setLevelRef(collection(db, `${'Lvl1'}LeaderBoard`))
    } else {
      setLevelRef(collection(db, `${currentLevel}LeaderBoard`))
    }
  }, [currentLevel])

  useEffect(() => {
    fetchLeaderBoardResults()
  }, [lvlRef])

  const handleClick = (id, index) => {
    setLevelRef(collection(db, `${id}LeaderBoard`))
    setIsActive(index)
  }

  return (
    <div className="container">
      <h2 style={{textAlign: 'center'}}>LeaderBoard</h2>
      <div className="leaderboard-level-container">
        {lvlData.map((lvl, index) => {
          return (
            <div key={index + lvl.id}
              className={isActive === index
                 ? "leaderboard-level leaderboard-level-active"
                 : "leaderboard-level"}
              >
              <button onClick={() => handleClick(lvl.id, index)}>
                <img src={lvl.image} alt=""/>
                <span>{`Level ${lvl.id.substring(3)}`}</span>
              </button>
            </div>
          )
        })}
      </div>
      <div className="leaderboard-main-container">
        <div className="leaderboard-header">
          <div className="left">
            Name
          </div>
          <div className="right">
            Time (Seconds)
          </div>
        </div>
        {lvlLeaderboard?.map((result, index) => {
          return (
            <div key={result.data.time + index} className="leaderboard-entry">
              <div className="entry-left">
                <span className="entry-left-rank">
                  {index + 1}
                </span>
                <span>
                  {result.data.name}
                </span>
              </div>
              <div className="entry-right">
                {result.data.time}
              </div>
            </div>
          )
        })}
      </div>
      <div className="home-btn-container">
        <Link to="/">Home</Link>
      </div>
    </div>

  )
}

export default LeaderBoard
