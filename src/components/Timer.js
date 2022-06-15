import { useState, useEffect } from 'react'
import { formatSeconds  } from "../utility/formatSeconds.js"
import "../styles/Timer.css"

const Timer = ({time}) => {
  return (
    <div className='timer-container'>
      {formatSeconds(time)}
    </div>
  )
}

export default Timer
