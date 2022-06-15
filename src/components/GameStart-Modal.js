import "../styles/GameStart.css"
import WaldoImage from '../assets/char_images_better/Waldo.jpg'
import OswaldImage from '../assets/char_images_better/Oswald.jpg'
import WizardImage from '../assets/char_images_better/Wizard.jpg'

const GameStart = ({gameStart}) => {
  return (
    <div className="modal-start-container">
      <div className="modal-start">
        <div className="modal-start-header">
          Find These Characters!
          <ul>
            <li>
              <img src={OswaldImage} alt=""/>
            </li>
            <li>
              <img src={WaldoImage} alt=""/>
            </li>
            <li>
              <img src={WizardImage} alt=""/>
            </li>
          </ul>
        </div>
        <div className="modal-start-body">
          Your Timer will start as soon as you start the game.
          <br/>
          Good Luck!
        </div>
        <button onClick={() => gameStart()}>
          Start Game!
        </button>
      </div>
    </div>
  )
}

export default GameStart
