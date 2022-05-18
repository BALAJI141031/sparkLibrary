import "./index.css";
import { VideoCard } from "../../components/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicGetRequest } from "../../serverCalls";
import { useVideoListing, useNavigate, usePlayVideo } from "../../customHooks";
import { BiSearchAlt2 } from "../../icons";

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
        console.log(e);
      }
    })();
  }, []);

  // playing video
  const playVideo = (video) => {
    setStreamingVideo(video);
    navigate("/play-videos");
  };

  return (
    <div>
      <center>
        <h3>Relations With</h3>
      </center>
      <BiSearchAlt2 style={{ width: "40px", height: "40px", color: "red" }} />
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
