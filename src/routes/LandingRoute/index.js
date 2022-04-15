import { useEffect, useState } from "react";
import "./index.css";
import { Video, VideoCard, HeroBanner } from "../../components";
import { publicGetRequest } from "../../serverCalls";
import { useNavigate, usePlayVideo } from "../../customHooks";
function LandingRoute() {
  const navigate = useNavigate();
  const [{ mostStreamedVideos, featuredCategories }, setHomepageVideos] =
    useState({
      featuredCategories: [],
      mostStreamedVideos: [],
    });
  const { setStreamingVideo, streamingVideo } = usePlayVideo();
  useEffect(() => {
    (async () => {
      try {
        let streamedVideos = await publicGetRequest("/api/videos");

        let categorieyVideos = await publicGetRequest("/api/categories");

        const mostStreamedVideos = await streamedVideos.data.videos.filter(
          (video) => video.mostStreamed
        );

        const featuredCategories =
          await categorieyVideos.data.categories.filter(
            (category) => category.isFeatured
          );
        setHomepageVideos({ featuredCategories, mostStreamedVideos });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <main className="main-div">
      <div className="hero">
        <div className="video overlap">
          <Video videoUrl={"r5Ps1TZXAN8"} />
        </div>
        <div className="hero-banner overlap">
          <HeroBanner hero={"hero"} />
        </div>
      </div>
      <div className="featured-videos-section">
        <h2 className="text-align-center">featured categories </h2>
        <div className="featured-videos">
          {featuredCategories.length !== 0 &&
            featuredCategories.map((category) => (
              <div
                className="featured-video"
                onClick={() => navigate(`/videos/${category.categoryName}`)}
              >
                <div className="overlap">
                  <img
                    src={category.thumbnailImg}
                    className="res-image "
                    alt="featured-card"
                  />
                </div>
                <div className="overlap featured-banner">
                  <HeroBanner category={category} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="most-viewed-div">
        <h2 className="text-align-center">Most Streamed Videos</h2>

        <div className="most-viewed-videos">
          {mostStreamedVideos.map((video) => (
            <div
              onClick={() => {
                setStreamingVideo(video);
                navigate(`/play-videos`);
              }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export { LandingRoute };
