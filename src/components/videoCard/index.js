import "./index.css";
import { BsFillCaretRightFill } from "../../icons";
function VideoCard(
  { video } = {
    title: "vox",
    thumbnailImg:
      "https://i.ytimg.com/vi/FQ4hvLqNfqo/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBUgIwsS4JVatmPy_I_1AcDEZnm7A",
    creator: "jonny Harris",
    listens: "2.5M",
    releasedDate: "september,2021",
    GIF: "",
  }
) {
  console.log(video, "rendering video");
  const { title, thumbnailImg, creator, listens, releasedDate, GIF } = video;

  return (
    <div className="video-card">
      <div>
        <img
          src={thumbnailImg}
          alt="most-viewed-thumbnail"
          className="res-image"
        />
      </div>
      <strong className="text-margin">{title}</strong>
      <p className="text-margin">By {creator}</p>
      <p className="text-margin">
        {listens} streams|{releasedDate}
      </p>
      <button className="btn-cta">
        <BsFillCaretRightFill className="mr-r" />
        Watch Now
      </button>
    </div>
  );
}

export { VideoCard };
