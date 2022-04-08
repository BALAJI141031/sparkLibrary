import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { LandingRoute, VideoListingRoute } from "./routes";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/videos" element={<VideoListingRoute />} />
      </Routes>
    </div>
  );
}

export default App;
