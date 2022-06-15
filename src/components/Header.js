import { Link } from "react-router-dom"
import '../styles/Header.css'

const Header = ({currentLevel}) => {
  return (
    <header className="Header">
      <Link to="/">
        <h1>Where's Waldo</h1>
      </Link>
      <Link className='leaderboard-link' to="/leaderboard">LeaderBoard</Link>

    </header>
  )
}

export default Header
