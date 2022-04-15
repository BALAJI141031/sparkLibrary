import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import Mockman from "mockman-js";
import {
  LandingRoute,
  VideoListingRoute,
  PlayVideo,
  WatchLater,
  History,
  MyPlaylists,
  MyPlaylist,
  LikedVideos,
} from "./routes";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/videos/:country" element={<VideoListingRoute />} />
        <Route path="/play-videos" element={<PlayVideo />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
        <Route path="/my-playlists" element={<MyPlaylists />} />
        <Route path="/my-playlist/:id" element={<MyPlaylist />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/mock" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
