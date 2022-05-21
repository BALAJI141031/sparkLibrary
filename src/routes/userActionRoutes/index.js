import "./index.css";
import { VideoCard } from "../../components";

import { useEffect, useState } from "react";
import { useNavigate, usePlayVideo } from "../../customHooks";
import { privateGetRequest, privateDeleteRequest } from "../../serverCalls";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "../../icons";


function WatchLater() {
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const { setStreamingVideo } = usePlayVideo();
  const navigate = useNavigate();
  // get me watch later videos from db
  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/watchlater");
        // dispatchCountry({ type: "AllVideos", payload: response.data.videos });
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
  const { setStreamingVideo } = usePlayVideo();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/history");
        // dispatchCountry({ type: "AllVideos", payload: response.data.videos });
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
  }, []);

  return (
    <div className="p-t">
      <div className="flex-H-space-around ">
        <h3 className="text-m">My Playlists</h3>
        <button className="text-m btn primary-icon-btn">
          Create New Playlist
        </button>
      </div>
      <div className="user-action-div">
        {playlists.length !== 0 ? (
          playlists.map((playlist) => (
            <div className=" flex-H-space-around playlist">
              <div onClick={() => navigate(`/my-playlist/${playlist._id}`)}>
                <h4 className="text-m">{playlist.title}</h4>
                <p className="text-m">videos count:{playlist.videos.length}</p>
              </div>
              <AiOutlineDelete className="icon-lg" />
            </div>
          ))
        ) : (
          <p>empty </p>
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
        console.log("came here");
        // const response = await privateGetRequest(`/api/user/playlists/${id}`);
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

  return (
    <div className="p-t">
      <div className="flex-H-space-around ">
        <h3 className="text-m">My Playlist</h3>
        <button className="text-m">Delete Playlist</button>
      </div>
      <div className="user-action-div">
        {playlist.length !== 0 &&
          playlist.map((video) => (
            <div>
              <VideoCard video={video} />
            </div>
          ))}
      </div>
    </div>
  );
}

function LikedVideos(params) {
  const [likedVideos, setLikedVideos] = useState([]);
  const { setStreamingVideo } = usePlayVideo();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await privateGetRequest("/api/user/likes");
        // dispatchCountry({ type: "AllVideos", payload: response.data.videos });
        setLikedVideos(response.data.likes);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const playUserRequireVideo = (video) => {
    setStreamingVideo(video);
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


