import "./index.css";
import { useNavigate } from "../../customHooks";

function HeroBanner({ hero, category }) {
  const navigate = useNavigate();
  return (
    <div className={hero ? "banner hero-banner-width" : "banner"}>
      <h1>{hero ? `Spark Wind` : category.categoryName}</h1>
      {hero && (
        <h1 className="heading-margin">
          Dedicated International Relations Library
        </h1>
      )}
      {hero && (
        <button className="cta" onClick={() => navigate("/videos/AllVideos")}>
          Explore
        </button>
      )}
    </div>
  );
}

export { HeroBanner };
