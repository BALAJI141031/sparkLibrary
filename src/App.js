import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import Mockman from "mockman-js";
import RequireAuth from "./authUtils";
import {
  LandingRoute,
  VideoListingRoute,
  PlayVideo,
  WatchLater,
  History,
  MyPlaylists,
  MyPlaylist,
  LikedVideos,
  Login,
  Signup,
} from "./routes";
function App() {
  return (
    <div className="">
      <div className="navbar-div">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/videos/:country" element={<VideoListingRoute />} />
        <Route path="/play-videos" element={<PlayVideo />} />
        <Route
          path="/watch-later"
          element={
            <RequireAuth>
              <WatchLater />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/my-playlists"
          element={
            <RequireAuth>
              <MyPlaylists />
            </RequireAuth>
          }
        />
        <Route
          path="/my-playlist/:id"
          element={
            <RequireAuth>
              <MyPlaylist />
            </RequireAuth>
          }
        />
        <Route
          path="/liked-videos"
          element={
            <RequireAuth>
              <LikedVideos />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mock" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
