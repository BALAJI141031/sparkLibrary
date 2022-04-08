import { useEffect, useState } from "react";
import "./index.css";
import { Video, VideoCard, HeroBanner } from "../../components";
import { publicGetRequest } from "../../serverCalls";
function LandingRoute() {
  const [{ mostStreamedVideos, featuredCategories }, setHomepageVideos] =
    useState({
      featuredCategories: [],
      mostStreamedVideos: [],
    });

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

        console.log(
          "i want to know what's there in state after effect",
          featuredCategories,
          mostStreamedVideos
        );

        setHomepageVideos({ featuredCategories, mostStreamedVideos });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  console.log(
    "i want to know what's there in state before effect",
    featuredCategories,
    mostStreamedVideos
  );
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
        <h2 className="text-align-center">featured categories </h2>
        <div className="featured-videos">
          {featuredCategories.length !== 0 &&
            featuredCategories.map((category) => (
              <div className="featured-video">
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
            <VideoCard video={video} />
          ))}
        </div>
      </div>
    </main>
  );
}

export { LandingRoute };
