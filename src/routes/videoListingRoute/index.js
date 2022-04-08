import "./index.css";
import { VideoCard } from "../../components/index";

export default function VideoListingRoute() {
  return (
    <div>
      <div className="video-categories">
        <div className="category">America</div>
        <div className="category">America</div>
        <div className="category">America</div>
        <div className="category">America</div>
        <div className="category">America</div>
        <div className="category">America</div>
        <div className="category">America</div>
      </div>
      <div className="videos">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}
