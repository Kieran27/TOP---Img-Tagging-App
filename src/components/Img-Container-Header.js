import WaldoImage from '../assets/char_images_better/Waldo.jpg'
import OswaldImage from '../assets/char_images_better/Oswald.jpg'
import WizardImage from '../assets/char_images_better/Wizard.jpg'
import "../styles/Img-Container-Header.css"

const imgArr = [OswaldImage, WaldoImage, WizardImage]

const ImgContainerHeader = ({positions}) => {
  return (
    <div className="img-container-header">
      {imgArr.map((img, index) => {
        return (
          <div key={index} className="img-container-item">
            <img
              src={img}
              alt=""
              className={positions[index].found ? "img-filter" : ""}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ImgContainerHeader
