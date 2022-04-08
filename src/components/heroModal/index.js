import "./index.css";

function HeroBanner({ hero }) {
  return (
    <div className={hero ? "banner hero-banner-width" : "banner"}>
      <h1 className="heading-margin">Spark Library</h1>
      <h2 className="heading-margin">
        Dedicated International Relations Niche To Civils Aspirant's{" "}
      </h2>
      <button>Explore</button>
    </div>
  );
}

export { HeroBanner };
