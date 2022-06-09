import "./index.css";
import {
  BsFillCaretRightFill,
  BsHandThumbsDownFill,
  MdDelete,
  MdRemoveCircle,
} from "../../icons";
import { useNavigate } from "react-router-dom";
import { usePlayVideo, useVideoAnalytics } from "../../customHooks";
import { privateDeleteRequest, privateGetRequest } from "../../serverCalls";
function VideoCard(props) {
  const { video, anlyticCategory, setUi, id: playlistId } = props;
  const { setStreamingVideo} = usePlayVideo();
  const { dispatchAnalytics } = useVideoAnalytics();
  const navigate = useNavigate();

  const { title, thumbnailImg, creator, listens, releasedDate, GIF } = video;
  let badge;
  switch (anlyticCategory) {
    case "like":
      badge = <BsHandThumbsDownFill />;
      break;
    case "watchLater":
      badge = <MdRemoveCircle />;
      break;
    case "history":
      badge = <MdDelete />;
      break;
    default:
      badge = <MdDelete />;
  }

  // removing video from respective analytic routes
  const removeVideo = async (video, anlyticCategory) => {
    let path;
    let categoryToDelete;
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
      case "playlist":
        path = `/api/user/playlists/${playlistId}/${video._id}`;
        break;
      default:
        path = "/api/user/playlists/";
    }
    if (anlyticCategory !== "playlist") {
      path = path + video._id;
      categoryToDelete = path.split("/")[3];
      try {
        let response = await privateDeleteRequest(path);
        let data = "data";
        setUi([...response[data][categoryToDelete]]);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let response = await privateDeleteRequest(path);
        console.log(response, "deletedd playlists");
        setUi(response.data.playlist.videos);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // play ,ost streamed video

  const playMostStreamedVideo = async () => {
    setStreamingVideo(video);
    navigate(`/play-videos`);
    try {
      const likedVideos = await privateGetRequest("/api/user/likes");
      let flag = 0;
      if (likedVideos.data.likes.length !== 0) {
        for (let i = 0; i < likedVideos.data.likes.length; i++) {
          if (likedVideos.data.likes[i]._id === video._id) {
            dispatchAnalytics({ type: "liked", payload: true });
            break;
          } else {
            console.log("elseblock");
            flag++;
          }
        }
        if (flag === likedVideos.data.likes.length)
          dispatchAnalytics({ type: "liked", payload: false });
      }
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
        <h5 className="text-margin">{title}</h5>
        <p className="text-margin">By {creator}</p>
        <p className="text-margin">
          {listens} streams|{releasedDate}
        </p>
        <center>
          <button className="cta" onClick={playMostStreamedVideo}>
            <BsFillCaretRightFill className="mr-r" />
            Watch Now
          </button>
        </center>
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
