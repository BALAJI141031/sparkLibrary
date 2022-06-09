import "./index.css";
import { VideoCard } from "../../components";

import { useEffect, useState } from "react";
import {
  useNavigate,
  usePlayVideo,
  useVideoAnalytics,
} from "../../customHooks";
import { privateGetRequest, privateDeleteRequest } from "../../serverCalls";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "../../icons";

function WatchLater() {
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  // get me watch later videos from db
  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/watchlater");
        setWatchLaterVideos(response.data.watchlater);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="p-t">
      <h3 className="text-align-center">Your Watch-later-videos</h3>
      <div className="user-action-div">
        {watchLaterVideos.length !== 0 ? (
          watchLaterVideos.map((video) => (
            <div>
              <VideoCard
                video={video}
                anlyticCategory={"watchLater"}
                setUi={setWatchLaterVideos}
              />
            </div>
          ))
        ) : (
          <h2 className="text-align-center">
            Stream some videos and help communtiy to grow
          </h2>
        )}
      </div>
    </div>
  );
}

function History(params) {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/history");
        setHistory(response.data.history);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // clear all history
  const clearAllHistory = async () => {
    try {
      const response = await privateDeleteRequest("/api/user/history/all");
      setHistory(response.data.history);
    } catch (e) {
      console.log(e);
    }
  };

  // play history video

  return (
    <div className="p-t">
      <div className="flex-H-space-around">
        <h3>Watched videos</h3>
        <button onClick={clearAllHistory} className="cta">
          Clear Total History
        </button>
      </div>
      <div className="user-action-div">
        {history.length !== 0 ? (
          history.map((video) => (
            <div>
              <VideoCard
                video={video}
                anlyticCategory={"history"}
                setUi={setHistory}
              />
            </div>
          ))
        ) : (
          <h2 className="text-align-center">History is Empty</h2>
        )}
      </div>
    </div>
  );
}

function MyPlaylists(params) {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/playlists");
        setPlaylists([...response.data.playlists]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [playlists]);

  // delete required playlist
  const deletePlaylist = async (playlistId) => {
    try {
      const deletePlaylist = await privateDeleteRequest(
        `/api/user/playlists/${playlistId}`
      );
      setPlaylists(deletePlaylist.data.playlists);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-t ">
      <center>
        <h1>My Playlists</h1>
      </center>
      <div className="user-action-div">
        {playlists.length !== 0 ? (
          playlists.map((playlist) => (
            <div className=" flex-H-space-around playlist">
              <div onClick={() => navigate(`/my-playlist/${playlist._id}`)}>
                <h4 className="text-m">{playlist.title}</h4>
                <p className="text-m">videos count:{playlist.videos.length}</p>
              </div>
              <AiOutlineDelete
                className="icon-lg"
                onClick={() => deletePlaylist(playlist._id)}
              />
            </div>
          ))
        ) : (
          <center>
            <p>empty </p>
          </center>
        )}
      </div>
    </div>
  );
}

function MyPlaylist(params) {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const { setStreamingVideo } = usePlayVideo();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest(`/api/user/playlists`);
        const userRequirePlaylist = response.data.playlists.filter(
          (playlist) => playlist._id == id
        );
        setPlaylist([...userRequirePlaylist[0].videos]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const playUserRequireVideo = (video) => {
    setStreamingVideo(video);
    navigate("/play-videos");
  };

  // delete playlist and navigate to all playlists

  const deletePlaylist = async (playlistId) => {
    try {
      const deletePlaylist = await privateDeleteRequest(
        `/api/user/playlists/${playlistId}`
      );
      navigate("/my-playlists");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-t">
      <div className="flex-H-space-around ">
        <h3 className="text-m">My Playlist</h3>
        <button className="primary-cta" onClick={() => deletePlaylist(id)}>
          Delete this Playlist
        </button>
      </div>
      <div className="user-action-div">
        {playlist.length !== 0 &&
          playlist.map((video) => (
            <div>
              <VideoCard
                video={video}
                anlyticCategory={"playlist"}
                setUi={setPlaylist}
                id={id}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

function LikedVideos(params) {
  const [likedVideos, setLikedVideos] = useState([]);
  const { setStreamingVideo } = usePlayVideo();
  const { dispatchAnalytics } = useVideoAnalytics();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/likes");
        setLikedVideos(response.data.likes);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const playUserRequireVideo = (video) => {
    setStreamingVideo(video);
    dispatchAnalytics({ type: "liked", payload: false });
    navigate("/play-videos");
  };

  return (
    <div className="p-t">
      <h1 className="text-align-center">Liked videos</h1>
      <hr />
      <div className="user-action-div">
        {likedVideos.length !== 0 ? (
          likedVideos.map((video) => (
            <div>
              <VideoCard
                video={video}
                anlyticCategory={"like"}
                setUi={setLikedVideos}
              />
            </div>
          ))
        ) : (
          <h2 className="text-align-center">
            Like some videos and help communtiy to grow
          </h2>
        )}
      </div>
    </div>
  );
}

export { History, WatchLater, MyPlaylists, MyPlaylist, LikedVideos };


