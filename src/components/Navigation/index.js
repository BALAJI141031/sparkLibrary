import "./index.css";
import { GrHome, GrClose } from "../../icons";
import { useState } from "react";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

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
            <GrClose className="icon-lg" />
          </div>
        ) : (
          <div class="buger-div" onClick={toggleSidebar}>
            <i class="fas fa-bars icon-lg"></i>
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
        <div className="sidebar-section">
          <GrHome />
          <p>Home</p>
        </div>
        <div className="sidebar-section">
          <GrHome />
          <p>Home</p>
        </div>
        <hr />
        <div className="sidebar-section">
          <GrHome />
          <p>Home</p>
        </div>
        <div className="sidebar-section">
          <GrHome />
          <p>Home</p>
        </div>
        <hr />
        <button className="btn primary-icon-btn btn-m">Login</button>
      </div>
    </nav>
  );
}

export { Navbar };
