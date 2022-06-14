import "./index.css";

import { Video, VideoCard } from "components";
import { hideSnackbar } from "components/snackbar";
import {
  useVideoListing,
  usePlayVideo,
  useVideoAnalytics,
  usePlaylists,
  useSnackbar,
  useAuth
} from "customHooks";
import {
  privatePostRequest,
  privateDeleteRequest,
  privateGetRequest,
  createPlaylistReq,
} from "serverCalls";
import {
  BsHandThumbsUpFill,
  BsHandThumbsUp,
  MdOutlineWatchLater,
  CgPlayListAdd,
  FaRegBell,
} from "icons";
import { useEffect, useState } from "react";

export default function PlayVideo() {
  const { snackbar, setSnackbar } = useSnackbar();
  const { newPlaylist, playlistModal, playlists, dispatchPlaylist } =
    usePlaylists();
  const [exisitngPlaylists, setExistingPlaylists] = useState([]);
  const [playlistName, setNewPlaylistName] = useState("");
  const { setStreamingVideo, streamingVideo } = usePlayVideo();
  const { filteredVideos } = useVideoListing();
  const {liked, dispatchAnalytics } = useVideoAnalytics();
  const {isLoggedIn}=useAuth()

  useEffect(() => {
    (async () => {
      try {
        const historyResponse=await privatePostRequest("/api/user/history", streamingVideo);
        dispatchAnalytics({ type: "history", payload: true });
      } catch (e) {
      }
    })();
  }, []);

  // watch later
  const toggleWatchLaterVideo = async (video) => {
   
    try {
      if (isLoggedIn) {
        const watchLaterVideos = await privateGetRequest("/api/user/watchlater");
        if (watchLaterVideos.data.watchlater.length !== 0) {
          let flag = 0;
          for (let i = 0; i < watchLaterVideos.data.watchlater.length; i++) {
            if (watchLaterVideos.data.watchlater[i]._id === video._id) {
              setSnackbar({
                ...snackbar,
                status: true,
                text: "Already Added To Watch Later!",
                type: "warn-toast",
              });
              hideSnackbar(setSnackbar);
              dispatchAnalytics({ type: "watchLater", payload: false });
              break;
            } else {
              flag++;
            }
          }
          if (flag === watchLaterVideos.data.watchlater.length) {
            dispatchAnalytics({ type: "watchLater", payload: false });
            const watchLaterResponse = await privatePostRequest(
              "/api/user/watchlater",
              video
            );
            setSnackbar({
              ...snackbar,
              status: true,
              text: "Added To Watch Later!",
              type: "success-toast",
            });
            hideSnackbar(setSnackbar);
          }
        } else {
          const watchLaterResponse = await privatePostRequest(
            "/api/user/watchlater",
            video
          );
          setSnackbar({
            ...snackbar,
            status: true,
            text: "Added To Watch Later!",
            type: "success-toast",
          });
          hideSnackbar(setSnackbar);
        }
        
      } else {
        setSnackbar({
          ...snackbar,
          status: true,
          text: "Please Login To Add To WatchLater Videos!",
          type: "warn-toast",
        });
        hideSnackbar(setSnackbar);
      }
    } catch (e) {
      setSnackbar({
                ...snackbar,
                status: true,
                text: "Unexpected Error!",
                type: "warn-toast",
              });
              hideSnackbar(setSnackbar);
    }
  };

  // liked and dislike
  const toggleLikedVideo = async (video) => {
    try {
      if (isLoggedIn) {
         if (!liked) {
        await privatePostRequest("/api/user/likes", video);
        dispatchAnalytics({ type: "liked", payload: true });
      } else {
        await privateDeleteRequest(`/api/user/likes/${video._id}`);
        dispatchAnalytics({ type: "liked", payload: false });
      }
      } else {
         setSnackbar({
          ...snackbar,
          status: true,
          text: "Please Login To Like Videos!",
          type: "warn-toast",
        });
        hideSnackbar(setSnackbar);
      }
     
    } catch (e) {
     setSnackbar({
                ...snackbar,
                status: true,
                text: "Unexpected Error!",
                type: "warn-toast",
              });
              hideSnackbar(setSnackbar);
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
        alertUser("You dont have Playlists Create New!")
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
      } catch (err) {
        let text;
        if (err.response.status === 409) {
          text = "Video Already Exist";
        } else if (err.response.status === 404) {
          text = "User Not Found";
          // need to logout here
        }
        setSnackbar({
          ...snackbar,
          status: true,
          text,
          type: "error-toast",
        });
        hideSnackbar(setSnackbar);
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
        alertUser("Playlist Created Successfully")
        setNewPlaylistName("")

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
  };

  // playing recomended video
  const playRecomendedVideo = async (video) => {
    console.log("click happend")
    setStreamingVideo(video);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
      setSnackbar({
                ...snackbar,
                status: true,
                text: "Unexpected Error!",
                type: "warn-toast",
              });
              hideSnackbar(setSnackbar);
    }
  };


  // alert user for login while creating playlist
  function alertUser  (msg) {
    setSnackbar({
          ...snackbar,
          status: true,
          text: msg,
          type: "warn-toast",
        });
        hideSnackbar(setSnackbar);
  }

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
                onClick={() => isLoggedIn ? dispatchPlaylist({ type: "openModal" }) : alertUser("Please Login To Create Playlist!")}
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
        </div>

        {/* comments feature,will implement soon  */}
        {/* <div className="comments-div">
          <h5 className="heading-m">Comments</h5>
          <div className="flex-H-center-V ">
            <div className="profile-pic">SP</div>
            <div>
              <input
                type="text"
                placeholder="Comment here"
                className="comment-box"
              />
            </div>
          </div>
        </div> */}

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
       {playlistModal && <div className="bg-black bg-opacity-50 absolute z-99 inset-0 flex justify-center items-center  min-h-full">
        <div className="bg-gray-200  p-10 rounded-lg "> 
          <div className="flex  justify-between items-center">
            <h2 className="font-bold mr-5 ">Do You Want to create New Playlist</h2>  
           <svg class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => dispatchPlaylist({ type: "closeModal" })}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" ></path></svg> 
          </div>
          <div className="flex center-items">
          <button
            className="primary-modal-cta m-2 hover:bg-sky-700 w-32"
            onClick={() => getExistingPlaylists()}
          >
            NO
          </button>
            <button
            className="primary-modal-cta m-2 hover:bg-sky-700 w-32"
            onClick={() => dispatchPlaylist({ type: "newPlaylist" })}
          >
            Yes
          </button>
            </div>
         </div>
      </div>}
      {/* create new playlist */}
      
      {newPlaylist && <div className="bg-black bg-opacity-50 absolute z-99 inset-0 flex justify-center items-center  min-h-full">
        <div className="bg-gray-200  p-10 rounded-lg "> 
          <div className="flex  justify-between items-center">
            <input
              type="text"
              placeholder="give me playlist name"
              onChange={setPlaylistName}
              className="mr-5 p-2"
              value={playlistName}
            />
            <svg onClick={() => dispatchPlaylist({ type: "closeModal" })} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" ></path></svg>  
          </div>
           <center><button
            className="primary-modal-cta mt-5 w-60"
            onClick={() => setNewPlaylist()}
          >
            Add
          </button></center>
         </div>
      </div>}

      {/* add to existing playlists */}

       {playlists && <div className="bg-black bg-opacity-50 absolute z-99 inset-0 flex justify-center items-center min-h-screen ">
        <div className="bg-gray-200  p-10 rounded-lg "> 
          <div className="flex  justify-between items-center mb-5">
            <h1 className="text-lg mr-5">Your Playlists</h1>
           <svg  onClick={() => dispatchPlaylist({ type: "closeModal" })} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" ></path></svg>  
          </div>
          <div>
            {exisitngPlaylists.length !== 0
              ? exisitngPlaylists.map((playlist) => (
                  <div
                    onClick={() =>
                      setToExistingPlaylist(playlist, streamingVideo)
                    }
                    className="border-solid border-2 border-indigo-600 text-center cursor-pointer hover:bg-sky-700 saved-playlist font-bold mb-2"
                  >
                    {playlist.title}
                  </div>
                ))
              : "No playlists found create new"}
          </div>
           <center><button
            className="primary-modal-cta mt-5"
            onClick={() => dispatchPlaylist({ type: "newPlaylist" })}
          >
            Create New playlist
          </button></center>
         </div>
      </div>}
    </div>
  );
}
