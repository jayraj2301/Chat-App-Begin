
import './infobar.css';

const Infobar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      O
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
      X
      </a>
    </div>
  </div>
);

export default Infobar;