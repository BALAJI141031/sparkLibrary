import "./index.css";
import { GrHome, GrClose, GrMenu } from "../../icons";
import { useState } from "react";
import { useNavigate } from "../../customHooks";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  // toggle sidebar
  const toggleSidebar = () => setSidebar((isSideActive) => !isSideActive);
  return (
    <nav class="navbar">
      <div class="flex-H-space-around">
        <div>
          <sapn class="span-style">SL</sapn>
        </div>
        <input
          className="search-bar"
          type="search"
          placeholder="search here...."
        />
        {sidebar ? (
          <div class="buger-div" onClick={toggleSidebar}>
            <GrClose className="close-icon" />
          </div>
        ) : (
          <div class="buger-div" onClick={toggleSidebar}>
            <GrMenu className="close-icon" />
          </div>
        )}
      </div>
      <div className={sidebar ? "showSidebar" : "hideSidebar"}>
        <div className="sidebar-section">
          <GrHome />
          <p>Home</p>
        </div>
        <hr />
        <div className="sidebar-section">
          <GrHome />
          <p>Home</p>
        </div>
        <div
          className="sidebar-section"
          onClick={() => navigate("/watch-later")}
        >
          <GrHome />
          <p>WatchLater</p>
        </div>
        <div className="sidebar-section" onClick={() => navigate("/history")}>
          <GrHome />
          <p>History</p>
        </div>
        <hr />

        <div
          className="sidebar-section"
          onClick={() => navigate("/liked-videos")}
        >
          <GrHome />
          <p>Liked Videos</p>
        </div>
        <div
          className="sidebar-section"
          onClick={() => navigate("/my-playlists")}
        >
          <GrHome />
          <p>My playlists</p>
        </div>
        <hr />
        <button className="btn primary-icon-btn btn-m">Login</button>
      </div>
    </nav>
  );
}

export { Navbar };
