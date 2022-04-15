import { createContext, useContext, useReducer, useState } from "react";
const videoListingContext = createContext();

const VideoListingProvider = ({ children }) => {
  const setCountry = (prevCountries, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
      case "America":
        return {
          flag: "America",
          videos: [...payload],
        };
      case "Russia":
        return {
          flag: "Russia",
          videos: [...payload],
        };
      case "China":
        return {
          flag: "China",
          videos: [...payload],
        };
      case "Pakistan":
        return {
          flag: "Pakistan",
          videos: [...payload],
        };
      case "Middle-East":
        return {
          flag: "Middle-East",
          videos: [...payload],
        };
      case "Srilanka":
        return {
          flag: "Srilanka",
          videos: [...payload],
        };
      case "France":
        return {
          flag: "France",
          videos: [...payload],
        };
      default:
        return {
          flag: "AllVideos",
          videos: [...payload],
        };
    }
  };

  const [{ flag, videos }, dispatchCountry] = useReducer(setCountry, {
    flag: "AllVideos",
    videos: [],
  });

  let filteredVideos;
  // filter method
  if (flag !== "AllVideos") {
    filteredVideos = videos.filter((video) => video.category === flag);
  } else {
    filteredVideos = [...videos];
  }

  return (
    <videoListingContext.Provider
      value={{ dispatchCountry, filteredVideos, videos }}
    >
      {children}
    </videoListingContext.Provider>
  );
};

const useVideoListing = () => useContext(videoListingContext);

// single video context
const playVideoContext = createContext();
const VideoPlayProvider = ({ children }) => {
  const [streamingVideo, setStreamingVideo] = useState("");
  return (
    <playVideoContext.Provider value={{ streamingVideo, setStreamingVideo }}>
      {children}
    </playVideoContext.Provider>
  );
};
const usePlayVideo = () => useContext(playVideoContext);

// user action videos
const analyticVideosContext = createContext();
const AnalyticsVideoProvider = ({ children }) => {
  const setVideoAnalytics = (prevAnalytics, { type, payload }) => {
    switch (type) {
      case "liked":
        return { ...prevAnalytics, liked: payload };
      case "watchLater":
        return { ...prevAnalytics, WatchLater: payload };
      case "history":
        return { ...prevAnalytics, history: payload };
      default:
        return { ...prevAnalytics, saved: payload };
    }
  };
  const [{ WatchLater, liked, saved }, dispatchAnalytics] = useReducer(
    setVideoAnalytics,
    { WatchLater: false, liked: false, saved: false }
  );
  return (
    <analyticVideosContext.Provider
      value={{ WatchLater, liked, saved, dispatchAnalytics }}
    >
      {children}
    </analyticVideosContext.Provider>
  );
};

const useVideoAnalytics = () => useContext(analyticVideosContext);

// playlist management
const playlistContext = createContext();
const PlaylistProvider = ({ children }) => {
  const setPlaylist = (prevPlaylist, { type, payload }) => {
    switch (type) {
      case "openModal":
        return { playlistModal: true, newPlaylist: false, playlists: false };
      case "newPlaylist":
        return { playlistModal: false, newPlaylist: true, playlists: false };
      case "addToPlaylist":
        return { playlistModal: false, newPlaylist: false, playlists: true };
      default:
        return { playlistModal: false, newPlaylist: false, playlists: false };
    }
  };

  const [{ newPlaylist, playlistModal, playlists }, dispatchPlaylist] =
    useReducer(setPlaylist, {
      newPlaylist: false,
      playlistModal: false,
      playlists: false,
    });
  return (
    <playlistContext.Provider
      value={{ newPlaylist, playlistModal, playlists, dispatchPlaylist }}
    >
      {children}
    </playlistContext.Provider>
  );
};

const usePlaylists = () => useContext(playlistContext);

export {
  VideoListingProvider,
  VideoPlayProvider,
  useVideoListing,
  usePlayVideo,
  AnalyticsVideoProvider,
  useVideoAnalytics,
  PlaylistProvider,
  usePlaylists,
};
