import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import {
  LandingRoute,
  VideoListingRoute,
  PlayVideo,
  WatchLater,
  History,
  MyPlaylists,
  MyPlaylist,
} from "./routes";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/videos" element={<VideoListingRoute />} />
        <Route path="/play-videos" element={<PlayVideo />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
        <Route path="/my-playlists" element={<MyPlaylists />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
      </Routes>
    </div>
  );
}

export default App;
