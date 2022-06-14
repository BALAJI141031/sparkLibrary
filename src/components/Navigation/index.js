import "./index.css";
import Cookies from "js-cookie";
import {
  GiHamburgerMenu,
  BiSearchAlt2,
  AiOutlineClose,
  ImHome2,
  MdExplore,
  MdWatchLater,
  FaHistory,
  BiLike,
  RiPlayListLine,
} from "../../icons";
import { useState } from "react";
import { useSnackbar, useAuth } from "../../customHooks";
import { showSnackbar } from "../snackbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { snackbar } = useSnackbar();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  // logout
  const logOut = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      Cookies.remove("jwt_token");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  // toggle sidebar
  const toggleSidebar = () => setSidebar((isSideActive) => !isSideActive);
  return (
    <div id="header-div">
      <Link to="/">
        <sapn class="span-style">SL</sapn>
      </Link>

      {/* will implement soon--search */}
      {/* <div className="searchbar-div">
        <input
          className="search-bar"
          type="search"
          placeholder="search here...."
        />
        <button className="search-icon">
          <BiSearchAlt2 />
        </button>
      </div> */}

      <div>
        {sidebar ? (
          <div class="buger-div" onClick={toggleSidebar}>
            <AiOutlineClose id="close-icon" />
          </div>
        ) : (
          <div class="buger-div" onClick={toggleSidebar}>
            <GiHamburgerMenu id="menu-icon" />
          </div>
        )}
      </div>

      <div className={sidebar ? "showSidebar" : "hideSidebar"}>
        <NavLink to="/">
          <div className="sidebar-section">
            <ImHome2 className="icon" />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink to="/videos/All">
          <div className="sidebar-section">
            <MdExplore className="icon" />
            <p>Explore</p>
          </div>
        </NavLink>
        <hr />
        <NavLink to="/watch-later">
          <div className="sidebar-section">
            <MdWatchLater className="icon" />
            <p>WatchLater</p>
          </div>
        </NavLink>
        <NavLink to="/history">
          <div className="sidebar-section">
            <FaHistory className="icon" />
            <p>History</p>
          </div>
        </NavLink>
        <hr />

        <NavLink to="/liked-videos">
          <div className="sidebar-section">
            <BiLike className="icon" />
            <p>Liked Videos</p>
          </div>
        </NavLink>
        <NavLink to="/my-playlists">
          <div className="sidebar-section">
            <RiPlayListLine className="icon" />
            <p>My playlists</p>
          </div>
        </NavLink>
        <hr />
        <center>
          <button className="cta" onClick={logOut}>
            {isLoggedIn ? "LogOut" : "Login"}
          </button>
        </center>
      </div>
      {snackbar.status &&
        showSnackbar({ type: snackbar.type, text: snackbar.text })}
    </div>
  );
}

export { Navbar };
