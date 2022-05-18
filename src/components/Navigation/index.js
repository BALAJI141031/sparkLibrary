import "./index.css";
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
import { useNavigate, useSnackbar } from "../../customHooks";
import { showSnackbar, hideSnackbar } from "../snackbar";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { snackbar, setSnackbar } = useSnackbar();

  console.log(snackbar, setSnackbar, "check this on priority");
  // toggle sidebar
  const toggleSidebar = () => setSidebar((isSideActive) => !isSideActive);
  return (
    // <div class="navbar">
    //   <div class="flex-H-space-around">
    //     <div>
    //       <sapn class="span-style">SL</sapn>
    //     </div>
    //     <input
    //       className="search-bar"
    //       type="search"
    //       placeholder="search here...."
    //     />
    //     {sidebar ? (
    //       <div class="buger-div" onClick={toggleSidebar}>
    //         <GrClose className="close-icon" />
    //       </div>
    //     ) : (
    //       <div class="buger-div" onClick={toggleSidebar}>
    //         <GrMenu className="close-icon" />
    //       </div>
    //     )}
    //   </div>
    //   <div className={sidebar ? "showSidebar" : "hideSidebar"}>
    //     <div className="sidebar-section">
    //
    //       <p>Home</p>
    //     </div>
    //     <hr />
    //     <div className="sidebar-section">
    //
    //       <p>Home</p>
    //     </div>
    //     <div
    //       className="sidebar-section"
    //       onClick={() => navigate("/watch-later")}
    //     >
    //
    //       <p>WatchLater</p>
    //     </div>
    //     <div className="sidebar-section" onClick={() => navigate("/history")}>
    //
    //       <p>History</p>
    //     </div>
    //     <hr />

    //     <div
    //       className="sidebar-section"
    //       onClick={() => navigate("/liked-videos")}
    //     >
    //
    //       <p>Liked Videos</p>
    //     </div>
    //     <div
    //       className="sidebar-section"
    //       onClick={() => navigate("/my-playlists")}
    //     >
    //
    //       <p>My playlists</p>
    //     </div>
    //     <hr />
    //     <button className="btn primary-icon-btn btn-m">Login</button>
    //   </div>
    //   {snackbar.status &&
    //     showSnackbar({ type: snackbar.type, text: snackbar.text })}
    // </div>
    <div class="flex-H-space-around" id="header-div">
      <NavLink to="/">
        <sapn class="span-style">SL</sapn>
      </NavLink>
      <div className="searchbar-div">
        <input
          className="search-bar"
          type="search"
          placeholder="search here...."
        />
        <button className="search-icon">
          <BiSearchAlt2 />
        </button>
      </div>
      <div>
        {sidebar ? (
          <div class="buger-div" onClick={toggleSidebar}>
            {/* <MdOutlineClose  /> */}
            <AiOutlineClose id="close-icon" />
          </div>
        ) : (
          <div class="buger-div" onClick={toggleSidebar}>
            <GiHamburgerMenu id="menu-icon" />
          </div>
        )}
      </div>
      <div className={sidebar ? "showSidebar" : "hideSidebar"}>
        <div className="sidebar-section">
          <ImHome2 className="icon" />
          <p>Home</p>
        </div>
        <div className="sidebar-section">
          <MdExplore className="icon" />
          <p>Explore</p>
        </div>
        <hr />
        <div
          className="sidebar-section"
          onClick={() => navigate("/watch-later")}
        >
          <MdWatchLater className="icon" />
          <p>WatchLater</p>
        </div>
        <div className="sidebar-section" onClick={() => navigate("/history")}>
          <FaHistory className="icon" />
          <p>History</p>
        </div>
        <hr />

        <div
          className="sidebar-section"
          onClick={() => navigate("/liked-videos")}
        >
          <BiLike className="icon" />
          <p>Liked Videos</p>
        </div>
        <div
          className="sidebar-section"
          onClick={() => navigate("/my-playlists")}
        >
          <RiPlayListLine className="icon" />
          <p>My playlists</p>
        </div>
        <hr />
        <center>
          <button className="cta">Login</button>
        </center>
      </div>
      {snackbar.status &&
        showSnackbar({ type: snackbar.type, text: snackbar.text })}
    </div>
  );

  // return (
  //   <div class="flex-H-space-around" id="header-div">
  //     <NavLink to={PATHS.HOME_PATH}>
  //       <sapn class="span-style">SL</sapn>
  //     </NavLink>
  //     <div className="searchbar-div">
  //       <input
  //         className="search-bar"
  //         type="search"
  //         placeholder="search here...."
  //       />
  //       <button className="search-icon">
  //         <BiSearchAlt2 />
  //       </button>
  //     </div>
  //     <div className="desktop-header-cta">
  //       <BottomNavbar />

  //       <img
  //         src="https://picturepan2.github.io/spectre/img/avatar-4.png"
  //         class="avatar avatar-xs"
  //         onClick={() => navigate(`/profile/${jwtProfile()._id}`)}
  //       />
  //     </div>
  //     <div className="device-header-cta">
  //       <img
  //         src="https://picturepan2.github.io/spectre/img/avatar-4.png"
  //         class="avatar avatar-xs"
  //       />
  //     </div>
  //   </div>
  // );
}

export { Navbar };
