import "./index.css";
import { BsFillCaretRightFill } from "../../icons";
function VideoCard() {
  return (
    <div className="video-card">
      <div>
        <img
          src="https://i.ytimg.com/vi/FQ4hvLqNfqo/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBUgIwsS4JVatmPy_I_1AcDEZnm7A"
          alt="most-viewed-thumbnail"
          className="res-image"
        />
      </div>
      <strong className="text-margin">Vox videos</strong>
      <p className="text-margin">By jonny Harris </p>
      <p className="text-margin">1.5M streams | september,1991</p>
      <button className="btn-cta">
        <BsFillCaretRightFill className="mr-r" />
        Watch Now
      </button>
    </div>
  );
}

export { VideoCard };
