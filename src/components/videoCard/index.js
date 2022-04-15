import "./index.css";
import {
  BsFillCaretRightFill,
  BsHandThumbsDown,
  AiOutlineDelete,
  RiDislikeLine,
} from "../../icons";
import { privateDeleteRequest } from "../../serverCalls";
function VideoCard(props) {
  const { video, anlyticCategory, setUi } = props;

  const { title, thumbnailImg, creator, listens, releasedDate, GIF } = video;
  let badge;
  switch (anlyticCategory) {
    case "like":
      badge = <BsHandThumbsDown />;
      break;
    case "watchLater":
      badge = <RiDislikeLine />;
      break;
    case "history":
      badge = <AiOutlineDelete />;
      break;
    default:
      badge = <BsFillCaretRightFill />;
  }

  // removing video from respective analytic routes
  const removeVideo = async (video, anlyticCategory) => {
    let path;
    switch (anlyticCategory) {
      case "like":
        path = "/api/user/likes/";
        break;
      case "watchLater":
        path = "/api/user/watchlater/";
        break;
      case "history":
        path = "/api/user/history/";
        break;
      default:
        path = "/api/user/playlists/";
    }
    path = path + video._id;
    const categoryToDelete = path.split("/")[3];
    try {
      let response = await privateDeleteRequest(path);
      let data = "data";
      setUi([...response[data][categoryToDelete]]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="video-card-badge">
      <div className={!anlyticCategory ? "video-card" : "video-card-for-badge"}>
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
      <div
        className="video-badge"
        onClick={() => removeVideo(video, anlyticCategory)}
      >
        {anlyticCategory && badge}
      </div>
    </div>
  );
}

export { VideoCard };
