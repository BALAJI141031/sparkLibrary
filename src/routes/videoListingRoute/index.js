import "./index.css";
import { VideoCard } from "components/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicGetRequest, privateGetRequest } from "serverCalls";
  import { hideSnackbar } from "components/snackbar";

import {
  useVideoListing,
  useNavigate,
  usePlayVideo,
  useVideoAnalytics,
  useSnackbar
} from "customHooks";

const categoryList = [
  "All",
  "America",
  "China",
  "Pakistan",
  "Srilanka",
  "Middle-East",
  "France",
  "Russia",
];

export default function VideoListingRoute() {

  const navigate = useNavigate();
  const { country } = useParams();
  const { dispatchAnalytics } = useVideoAnalytics();
  const { snackbar, setSnackbar } = useSnackbar();
  const { dispatchCountry, filteredVideos, videos } = useVideoListing();
  const { setStreamingVideo } = usePlayVideo();

  // this is to add styles for nav items
  let initialBtn;
  switch (country) {
    case "AllVideos":
      initialBtn = "All";
      break;
    default:
      initialBtn = country;
      break;
  }

  const [activeButton, setActiveButton] = useState(initialBtn);

  useEffect(() => {
    (async () => {
      try {
        const response = await publicGetRequest("/api/videos");
        dispatchCountry({ type: country, payload: response.data.videos });
      } catch (e) {
       setSnackbar({
                ...snackbar,
                status: true,
                text: "Unexpected Error!",
                type: "warn-toast",
              });
              hideSnackbar(setSnackbar);
      }
    })();
  }, []);

  // playing video
  const playVideo = async (video) => {
    setStreamingVideo(video);
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
    }
    navigate("/play-videos");
  };

  return (
    <div className="video-listing-section">
      <center>
        <h3>Relations With</h3>
      </center>
      <div className="video-categories">
        {categoryList.map((category) => (
          <div
            className={
              activeButton === category ? "category style-btn" : "category"
            }
            onClick={() => {
              setActiveButton(category);
              dispatchCountry({ type: category, payload: videos });
            }}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="videos">
        {filteredVideos.length !== 0 ? (
          filteredVideos.map((video) => (
            <div onClick={() => playVideo(video)}>
              <VideoCard video={video} />
            </div>
          ))
        ) : (
          <h3 className="text-align-center">No videos found</h3>
        )}
      </div>
    </div>
  );
}
