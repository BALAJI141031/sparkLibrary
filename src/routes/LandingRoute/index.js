import "./index.css";
import { Video, VideoCard, HeroBanner } from "../../components";

function LandingRoute() {
  return (
    <main className="main-div">
      <div className="hero">
        <div className="video overlap">
          <Video />
        </div>
        <div className="hero-banner overlap">
          <HeroBanner hero={"hero"} />
        </div>
      </div>
      <div className="featured-videos-section">
        <h2 className="text-align-center">featured Videos</h2>
        <div className="featured-videos">
          <div className="featured-video">
            <div className="overlap">
              <img
                src="https://i.ytimg.com/vi/qw-FLc7Z01Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdlTkQO3SCN3LieJDziqvfX_8azQ"
                className="res-image "
                alt="featured-card"
              />
            </div>
            <div className="overlap featured-banner">
              <HeroBanner />
            </div>
          </div>
          <div className="featured-video ">
            <div className="overlap">
              <img
                src="https://i.ytimg.com/vi/qw-FLc7Z01Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdlTkQO3SCN3LieJDziqvfX_8azQ"
                className="res-image "
                alt="featured-card"
              />
            </div>
            <div className="overlap featured-banner">
              <HeroBanner />
            </div>
          </div>
          <div className="featured-video ">
            <div className="overlap">
              <img
                src="https://i.ytimg.com/vi/qw-FLc7Z01Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdlTkQO3SCN3LieJDziqvfX_8azQ"
                className="res-image "
                alt="featured-card"
              />
            </div>
            <div className="overlap featured-banner">
              <HeroBanner />
            </div>
          </div>
        </div>
      </div>
      <div className="most-viewed-div">
        <h2 className="text-align-center">Most Streamed Videos</h2>
        <div className="most-viewed-videos">
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </main>
  );
}

export { LandingRoute };
