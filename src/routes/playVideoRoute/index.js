import "./index.css";

import { Video, VideoCard } from "../../components";
import {
  useVideoListing,
  usePlayVideo,
  useVideoAnalytics,
  usePlaylists,
} from "../../customHooks";
import {
  privatePostRequest,
  privateDeleteRequest,
  privateGetRequest,
  createPlaylistReq,
} from "../../serverCalls";
import {
  BsHandThumbsUpFill,
  BsHandThumbsUp,
  MdOutlineWatchLater,
  CgPlayListAdd,
  FaRegBell,
} from "../../icons";
import { useEffect, useState } from "react";

export default function PlayVideo() {
  const { newPlaylist, playlistModal, playlists, dispatchPlaylist } =
    usePlaylists();

  const [exisitngPlaylists, setExistingPlaylists] = useState([]);
  const [playlistName, setNewPlaylistName] = useState("");
  const { setStreamingVideo, streamingVideo } = usePlayVideo();
  const { filteredVideos } = useVideoListing();
  const { WatchLater, liked, dispatchAnalytics } = useVideoAnalytics();

  useEffect(() => {
    (async () => {
      try {
        await privatePostRequest("/api/user/history", streamingVideo);
        dispatchAnalytics({ type: "history", payload: true });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // watch later
  const toggleWatchLaterVideo = async (video) => {
    try {
      if (!WatchLater) {
        await privatePostRequest("/api/user/watchlater", video);
        dispatchAnalytics({ type: "watchLater", payload: true });
      } else {
        await privateDeleteRequest(`/api/user/watchlater/${video._id}`);
        dispatchAnalytics({ type: "watchLater", payload: false });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // liked and dislike
  const toggleLikedVideo = async (video) => {
    try {
      if (!liked) {
        await privatePostRequest("/api/user/likes", video);
        dispatchAnalytics({ type: "liked", payload: true });
      } else {
        await privateDeleteRequest(`/api/user/likes/${video._id}`);
        dispatchAnalytics({ type: "liked", payload: false });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // fetching exisitng playlists

  const getExistingPlaylists = () => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/playlists");
        setExistingPlaylists([...response.data.playlists]);
        dispatchPlaylist({ type: "addToPlaylist" });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const setToExistingPlaylist = (playlist, streamingVideo) => {
    (async () => {
      try {
        const response = await privatePostRequest(
          `/api/user/playlists/${playlist._id}`,
          streamingVideo
        );
        dispatchPlaylist({ type: "closeModal" });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  // creting new playlist
  const setPlaylistName = (e) => setNewPlaylistName(e.target.value);
  const setNewPlaylist = () => {
    (async () => {
      try {
        const createPlaylist = await createPlaylistReq("/api/user/playlists", {
          title: playlistName,
          description: "",
        });

        const addVideoToPlaylist = await privatePostRequest(
          `/api/user/playlists/${
            createPlaylist.data.playlists[
              createPlaylist.data.playlists.length - 1
            ]._id
          }`,
          streamingVideo
        );

        dispatchPlaylist({ type: "closeModal" });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  // playing recomended video
  const playRecomendedVideo = (video) => {
    setStreamingVideo(video);
  };

  return (
    <div className="play-video-section">
      <div className="play-video">
        <Video videoUrl={streamingVideo.url} />
        <div className="description-analytics-div">
          <div className="desciption">
            <h5>Control The Choke Point:How The US Stole The Panama Canal</h5>
            <div className="views ">
              <p>1,539,593 views,Sep 21,2021</p>
            </div>
          </div>
          <div className="m-left">
            <div className="flex-wrap ">
              <div
                className="video-actions"
                onClick={() => toggleLikedVideo(streamingVideo)}
              >
                {liked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
                <p>{liked ? "Liked" : "Like"}</p>
              </div>
              <div
                className="video-actions"
                onClick={() => toggleWatchLaterVideo(streamingVideo)}
              >
                <MdOutlineWatchLater />
                <p>Watch Later</p>
              </div>
              <div
                className="video-actions"
                onClick={() => dispatchPlaylist({ type: "openModal" })}
              >
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
            <div onClick={() => playRecomendedVideo(recomendedVideo)}>
              <VideoCard video={recomendedVideo} />
            </div>
          ))}
        </div>
      </div>
      <div id={playlistModal ? "show-modal" : "hide-modal"}>
        <div id="modal-content">
          <div className="flex-H-space-bw">
            <p>Do You want to create New Playlist</p>
            <div
              id="closeBtn"
              onClick={() => dispatchPlaylist({ type: "closeModal" })}
            >
              ×
            </div>
          </div>
          <button
            className="btn secondary-icon-btn"
            onClick={() => getExistingPlaylists()}
          >
            NO
          </button>
          <button
            className="btn secondary-icon-btn"
            onClick={() => dispatchPlaylist({ type: "newPlaylist" })}
          >
            Yes
          </button>
        </div>
      </div>
      {/* create new playlist */}
      <div id={newPlaylist ? "show-modal" : "hide-modal"}>
        <div id="modal-content">
          <div className="flex-H-space-bw">
            <input
              type="text"
              placeholder="give me playlist name"
              onChange={setPlaylistName}
            />
            <div
              id="closeBtn"
              onClick={() => dispatchPlaylist({ type: "closeModal" })}
            >
              ×
            </div>
          </div>
          <button
            className="btn secondary-icon-btn"
            onClick={() => setNewPlaylist()}
          >
            Add
          </button>
        </div>
      </div>
      {/* add to existing playlists */}

      <div id={playlists ? "show-modal" : "hide-modal"}>
        <div id="modal-content">
          <div className="flex-H-space-bw ">
            <h5 className="modal-heading">Your Playlists</h5>
            <div
              id="closeBtn"
              className="modal-heading"
              onClick={() => dispatchPlaylist({ type: "closeModal" })}
            >
              ×
            </div>
          </div>
          <div>
            {exisitngPlaylists.length !== 0
              ? exisitngPlaylists.map((playlist) => (
                  <div
                    onClick={() => setToExistingPlaylist(playlist)}
                    className="playlist-title"
                  >
                    {playlist.title}
                  </div>
                ))
              : "No playlists found create new"}
          </div>

          {exisitngPlaylists.length === 0 && (
            <button
              className="btn secondary-icon-btn"
              onClick={() => dispatchPlaylist({ type: "newPlaylist" })}
            >
              Create New playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
