import "./index.css";
import { VideoCard } from "../../components/index";
import { useEffect, useState } from "react";

import { publicGetRequest } from "../../serverCalls";
import { useVideoListing, useNavigate, usePlayVideo } from "../../customHooks";

const categoryList = [
  "All",
  "America",
  "China",
  "Pakistan",
  "Srilanka",
  "UK",
  "France",
  "Russia",
];

export default function VideoListingRoute() {
  const navigate = useNavigate();
  const { dispatchCountry, filteredVideos, videos } = useVideoListing();
  const { setVideoUrl } = usePlayVideo();
  // const [buttonStyle, setButtonStyle] = useState(null);
  console.log(dispatchCountry, filteredVideos, "testing these two");
  useEffect(() => {
    (async () => {
      try {
        const response = await publicGetRequest("/api/videos");
        dispatchCountry({ type: "AllVideos", payload: response.data.videos });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // playing video
  const playVideo = ({ url }) => {
    // console.log("trying to navigate");
    setVideoUrl(url);
    navigate("/play-videos");
  };

  console.log(filteredVideos, "checking for videos to render on listing page");
  return (
    <div>
      <h3 className="text-align-center">Relations With</h3>
      <div className="video-categories">
        {categoryList.map((category) => (
          <div
            className="category"
            onClick={() => dispatchCountry({ type: category, payload: videos })}
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
