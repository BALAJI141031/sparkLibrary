import "./index.css";
import { VideoCard } from "../../components";
import { FaRegBell } from "../../icons";
function WatchLater() {
  return (
    <div>
      <h3 className="text-align-center">Your Watch-later-videos</h3>
      <div className="user-action-div">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}

function History(params) {
  return (
    <div>
      <div className="flex-H-space-around">
        <h3>Watched videos</h3>
        <button>Clear Total History</button>
      </div>
      <div className="user-action-div">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}

function MyPlaylists(params) {
  return (
    <div>
      <div className="flex-H-space-around ">
        <h3 className="text-m">My Playlists</h3>
        <button className="text-m">Create New Playlist</button>
      </div>
      <div className="user-action-div">
        <div className=" flex-H-space-around">
          <div>
            <h6 className="text-m">my Playlist #1</h6>
            <p className="text-m">10 videos</p>
          </div>
          <button>Delete</button>
        </div>
        <div className=" flex-H-space-around">
          <div>
            <h6 className="text-m">my Playlist #1</h6>
            <p className="text-m">10 videos</p>
          </div>
          <button>Delete</button>
        </div>
        <div className=" flex-H-space-around">
          <div>
            <h6 className="text-m">my Playlist #1</h6>
            <p className="text-m">10 videos</p>
          </div>
          <button>Delete</button>
        </div>
        <div className=" flex-H-space-around">
          <div>
            <h6 className="text-m">my Playlist #1</h6>
            <p className="text-m">10 videos</p>
          </div>
          <button>Delete</button>
        </div>
        <div className=" flex-H-space-around">
          <div>
            <h6 className="text-m">my Playlist #1</h6>
            <p className="text-m">10 videos</p>
          </div>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

function MyPlaylist(params) {
  return (
    <div>
      <div className="flex-H-space-around ">
        <h3 className="text-m">My Playlist</h3>
        <button className="text-m">Delete Playlist</button>
      </div>
      <div className="user-action-div">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}

export { History, WatchLater, MyPlaylists, MyPlaylist };
