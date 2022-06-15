import { useState, useRef, useEffect, Fragment } from "react"
import { db } from '../firebase-config.js'
import { collection, doc, getDocs } from "firebase/firestore";
import { useLocation } from 'react-router-dom'
import PopUp from "./Popup-New.js"
import WinnerModal from './Winner-Modal.js'
import Loading from './Loading.js'
import Timer from './Timer.js'
import GameOver from './GameOver.js'
import GameStart from './GameStart-Modal.js'
import ClickPopUp from './Click-Popup.js'
import ImageContainerHeader from "./Img-Container-Header.js"

const Level = ({setLevel, currentLevel}) => {
  const location = useLocation()
  const levelRef = collection(db, location.state.id)

  const [positions, setPositions] = useState(null)
  const [currentCoords, setCurrentCoords] = useState(null)
  const [charsFound, setCharsFound] = useState(0)
  const [time, setTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [gameStart, setGameStart] = useState(true)
  const [popUpIsOpen, setPopUpIsOpen] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  // State To Set Click Result Popup Box
  const [clickedChar, setClickedChar] = useState(null)
  const [clickedStatus, setClickedStatus] = useState(false)
  const [clickResult, setClickResult] = useState(false)

  const imgRef = useRef(null)

  const startGame = () => {
    setTimerActive(true)
    setGameStart(true)
  }

  const getTheData = async () => {
    const data = await getDocs(levelRef)
    setLoading(isLoading => false)
    setGameStart(false)
    const positions = data.docs.map(doc => ({
      data: doc.data(),
      id: doc.id,
      found: false
    }))
    setPositions(positions)
  }

  const getClickedPosition = (e) => {
    const boundingBox = imgRef.current.getBoundingClientRect()
    const naturalHeight = 1920;
    const naturalWidth = 1080;
    const currentWidth = boundingBox.width;
    const currentHeight = boundingBox.height;
    const x = e.clientX - boundingBox.left.toFixed()
    const y = e.clientY - boundingBox.top.toFixed()
    const naturalX = parseInt(((naturalWidth / currentWidth) * x).toFixed());
    const naturalY = parseInt(((naturalHeight / currentHeight) * y).toFixed());

    setCurrentCoords({
      x, y, naturalX, naturalY
    })
    // setTimerActive(true)
    setPopUpIsOpen(popUpIsOpen => !popUpIsOpen)
  }

  const handleCharClick = (id) => {
    const target = id
    setClickedChar(id)
    const filteredArray = positions.filter(char => char.id === id)
    const charData = filteredArray[0]
    checkIfWithinRange(charData, target)
    setPopUpIsOpen(popUpIsOpen => !popUpIsOpen)
  }

  const checkIfWithinRange = (charData, target) => {
    // Establish Range of error for coordinate
      const {x, y, naturalX, naturalY} = currentCoords
      const highX = charData.data.x + 25
      const lowX = charData.data.x - 25
      const highY = charData.data.y + 25
      const lowY = charData.data.y - 25

      // If Selection within range - then character is considered found
      if (naturalX >= lowX && naturalX <= highX && naturalY >= lowY && naturalY <= highY) {
        charFound(target)
      } else {
        setClickResult(true)
        setClickedStatus(false)
      }
  }

  const charFound = (target) => {
    setCharsFound(charsFound + 1)
    setPositions(mutateArray(target))
    setClickedStatus(true)
    setClickResult(true)
  }

  const mutateArray = (target) => {
    const positionsCopy = [...positions]
    const index = positionsCopy.findIndex((item) => item.id === target)
    positionsCopy[index].found = true
    return positionsCopy
  }

  useEffect(() => {
    getTheData()
    setLevel(location.state.id)
  }, [])

  useEffect(() => {
    if (!charsFound) {
      return
    } else if (charsFound === positions.length) {
      setTimerActive(false)
      setGameOver(!gameOver)
    }
  }, [charsFound])

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
}, [timerActive, setTime])

useEffect(() => {
  if (clickResult) {
    setTimeout(() => {
      setClickResult(false)
    }, 1000)
  }
}, [clickResult])

  useEffect(() => {
    console.log(positions)
  }, [positions])

  useEffect(() => {
    console.log(currentCoords)
  }, [currentCoords])

  return (
  <Fragment>
  <div className="container lvl-wrapper">
    {!gameStart && <GameStart gameStart={startGame} />}
    {isLoading ? (
      <Loading />
    ) : (
      <>
      <ImageContainerHeader positions={positions} />
      <div className="img-container">
        {clickResult && <ClickPopUp status={clickedStatus} char={clickedChar} />}
        <img src={location.state.image}
          ref={imgRef}
          onClick={getClickedPosition}
          alt=""/>
        {
          popUpIsOpen &&
          <PopUp
            charPositions={positions}
            coords={currentCoords}
            handleCharClick={handleCharClick}
          />
        }
      </div>
      </>
    )}
  </div>
  <Timer time={time} />
  {gameOver && <GameOver time={time} currentLevel={currentLevel} />}
  </Fragment>
);
}

export default Level
