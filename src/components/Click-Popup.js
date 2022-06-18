import "../styles/Img-Container-Header.css"

const ClickPopUp = ({status, char}) => {
  return (
    <div className={status ? "click-popup correct" : "click-popup wrong"}>
      {status ? `You Found ${char}` : "Wrong. Keep Trying!"}
    </div>
  )
}

export default ClickPopUp
