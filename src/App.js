import { useState, useRef, useEffect, Fragment } from "react"
import React from 'react'
import { db } from './firebase-config.js'
import { collection, doc, getDocs } from "firebase/firestore";
import PopUp from './components/Popup.js'
import WinnerModal from './components/Winner-Modal.js'
import Header from './components/Header.js'


const charactersRef = collection(db, "characterPositions")


const App = () => {

const [currentCoords, setCurrentCoords ] = useState(null)
let [popUpActive, setPopUpActive] = useState(false)
let [modalActive, setModalActive] = useState(false)
let [msg, setMsg] = useState(null)
let [found, setFound] = useState(0)
const [currentPosition, setCurrentPosition] = useState(null)

  const imgRef = useRef(null)

  const getPosition = (e) => {
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

    setPopUpActive(popUpActive = !popUpActive)
  }

  const handleCharClick = (e) => {
    const currentChar = e.target.value
    getCurrentCharPosition(currentChar)
    setPopUpActive(popUpActive = !popUpActive)
  }

  const acceptableRange = () => {
    if (!currentCoords && !currentPosition) {
      return
    } else {
      const {x, y, naturalX, naturalY} = currentCoords
      const highX = currentPosition.data.x + 50
      const lowX = currentPosition.data.x - 50
      const highY = currentPosition.data.y + 50
      const lowY = currentPosition.data.y - 50

      if (naturalX >= lowX && naturalX <= highX && naturalY >= lowY && naturalY <= highY) {
        setFound(found + 1)
        setMsg('Yay!')
      } else {
        console.log(false)
        setMsg('Hikaru Station!')
      }
    }

  }

  // Get coordinates of selected character by querying database and filtering
  const getCurrentCharPosition = async (currentChar) => {
    const charactersRef = collection(db, "characterPositions")
    const data = await getDocs(charactersRef)
    const position = data.docs.map(doc => ({
      data: doc.data(),
      id: doc.id
    })).filter(doc => doc.data.name === currentChar)
    setCurrentPosition(position[0])
  }

  // useEffect(() => {
  //   console.log(currentPosition)
  // }, [currentPosition])
  //
  // useEffect(() => {
  //   console.log(currentCoords)
  // }, [currentCoords])

  useEffect(() => {
      acceptableRange()
      setModalActive(true)
  }, [currentPosition])

  useEffect(() => {
    const modalTimer = setTimeout(() => setModalActive(false), 3000)

    return () => {
      clearTimeout(modalTimer)
    }
  }, [modalActive])

  useEffect(() => {
    if (found === 3) {
      console.log("Winner!")
    }
    console.log(found)
  }, [found])

  return (
    <Fragment>
    <main>
    <div className="img-container">
      <img ref={imgRef}
       onClick = {getPosition}
       src="https://cdn.concreteplayground.com/content/uploads/2018/04/Wheres-Waldo_Google-Maps_Screenshot-1920x1080.jpg" alt=""
       />
      { popUpActive && <PopUp coords={currentCoords} handleCharClick={handleCharClick} />}
      { modalActive && msg && <WinnerModal msg={msg} />}
    </div>
    </main>
    </Fragment>
  );
}

export default App;
