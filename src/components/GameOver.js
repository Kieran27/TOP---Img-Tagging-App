import "../styles/GameOver.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config.js"

const GameOver = ({time, currentLevel}) => {
  let navigate = useNavigate()
  const [name, setName] = useState(null)
  const [loading, setLoading] = useState(false)

  const setResults = async (name, time) => {
    await addDoc(collection(db, `${currentLevel}LeaderBoard`), {
      name: name,
      time: time
    })
    navigate("/leaderboard")
  }

  const handleChange = (e) => {
    const value = e.target.value
    setName(() => value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults(name, time)
    setLoading(true)
  }

  const cancel = () => {
    navigate('/')
  }

  return (
    <div className="modal-over-container">
      <div className="modal-over">
        <div className="modal-header">
          Game Over!
          <br/>
          <span>Your Time: {time}s</span>
        </div>
        <div className="modal-body">
          <span>Enter a name and add your time to the leaderboard!</span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nickname">NickName:</label>
            <input
               name="nickname"
               type="text"
               onChange={handleChange}
               maxLength="12"
               required
             />
            <div className="form-footer">
              <button onClick={cancel}>No Thanks</button>
              <input
                className={loading ? 'input-loading' : ""}
                type="submit"
                value={loading ? "Submitting" : "Record Result"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GameOver
