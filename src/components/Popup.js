import { db } from '../firebase-config.js'
import { collection, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"



const PopUp = ({coords, handleCharClick}) => {
  const [positions, setPositions] = useState(null)

  const getCharPositions = async () => {
    const charactersRef = collection(db, "characterPositions")
    const data = await getDocs(charactersRef)
    const positions = data.docs.map(doc => ({
      data: doc.data(),
      id: doc.id
    }))
    setPositions(positions)
  }

  useEffect(() => {
    getCharPositions()
  }, [])

  useEffect(() => {
    console.log(positions)
  }, [positions])

  return (
    <>
    <div className="targeting-box" style={{left: coords.x - 25, top: coords.y - 25}}></div>
    <div className="pop-up" style={{left: coords.x - 25, top: coords.y - 25}}>
      <ul>
        {positions?.map((char, index) => {
          return (
            <li key={index}>
              <button onClick={(e) => handleCharClick(e)} value={char.id}>{char.id}</button>
            </li>
          )
        })}
      </ul>
    </div>
    </>
  )
}

export default PopUp
