import { useState } from 'react'
import WaldoImage from '../assets/char_images_better/Waldo.jpg'
import OswaldImage from '../assets/char_images_better/Oswald.jpg'
import WizardImage from '../assets/char_images_better/Wizard.jpg'

const PopUp = ({charPositions, coords, handleCharClick}) => {

  const [currentImage, setCurrentImage] = useState(null)
  const [charId, setCharId] = useState(null)

  let imageSrc = WaldoImage;

  const charImg = (id) => {
    switch(id) {
      case 'Oswald':
        return OswaldImage
        break;
      case 'Waldo':
        return WaldoImage
        break;
      case 'Wizard':
        return WizardImage
        break;
      case 'Wally':
        return WaldoImage
        break;
      default:
        return WaldoImage
        // code block
    }
  }

  return (
    <>
    <div className="targeting-box" style={{left: coords.x - 25, top: coords.y - 25}}></div>
    <div className="pop-up" style={{left: coords.x - 25, top: coords.y - 25}}>
        <div className="char-slct-container">
        {charPositions?.map((char, index) => {
          if (!char.found) {
            return (
              <button
                key={index}
                onClick={() => handleCharClick(char.id)}
                value={char.id}>
                <span className="char-container">
                  <img
                     src={char.id === 'Waldo'
                        ? WaldoImage
                        : char.id === 'Oswald'
                          ? OswaldImage
                          : WizardImage
                        }
                     alt=""
                   />
                </span>
                <span>{char.id}</span>
              </button>
            )
          }
          return null
        })}
        </div>
    </div>
    </>
  )
}

export default PopUp
