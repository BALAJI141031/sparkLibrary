import "./index.css";
import { Video, VideoCard } from "../../components";
import { useVideoListing, usePlayVideo } from "../../customHooks";
import {
  BiLike,
  BiDislike,
  MdOutlineWatchLater,
  CgPlayListAdd,
  FaRegBell,
} from "../../icons";

export default function PlayVideo() {
  const { filteredVideos } = useVideoListing();
  const { videoUrl } = usePlayVideo();

  return (
    <div className="play-video-section">
      <div className="play-video">
        <Video videoUrl={videoUrl} />
        <div className="description-analytics-div">
          <div className="desciption">
            <h5>Control The Choke Point:How The US Stole The Panama Canal</h5>
            <div className="views ">
              <p>1,539,593 views,Sep 21,2021</p>
            </div>
          </div>
          <div className="m-left">
            <div className="flex-wrap ">
              <div className="video-actions">
                <BiLike />
                <p>Like</p>
              </div>
              <div className="video-actions">
                <BiDislike />
                <p>Dislike</p>
              </div>
              <div className="video-actions">
                <MdOutlineWatchLater />
                <p>Watch Later</p>
              </div>
              <div className="video-actions">
                <CgPlayListAdd />
                <p>Save</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex-H-space-bw profile-section">
          <div className="flex-H-center-V profile">
            <div className="profile-pic">{/* <img src="" /> */}v</div>
            <div>
              <h5 className="heading-m">Vox</h5>
              <p className="heading-m">10.5M subscribers</p>
            </div>
          </div>
          <div className="flex-H-center-V subscription-div">
            <div>Subscribe</div>
            <FaRegBell className="icon-lg" />
          </div>
        </div>
        <div className="comments-div">
          <h5 className="heading-m">Comments</h5>
          <div className="flex-H-center-V ">
            <div className="profile-pic">{/* <img src="" /> */}SP</div>
            <div>
              <input
                type="text"
                placeholder="Comment here"
                className="comment-box"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="heading-m">Recomended Videos</h2>
        <div className="recomended-videos">
          {/* here video card making width more than 100% */}
          {filteredVideos.map((recomendedVideo) => (
            <div>
              <VideoCard video={recomendedVideo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
