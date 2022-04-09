import "./index.css";

function HeroBanner({ hero, category }) {
  // console.log(props, "show me atleast props");

  // console.log(category, "===ghgghghh");

  return (
    <div className={hero ? "banner hero-banner-width" : "banner"}>
      <h1 className="heading-margin">
        {hero ? "Spark Library" : category.categoryName}
      </h1>
      {hero && (
        <h2 className="heading-margin" style={{ fontSize: "1.5rem" }}>
          Dedicated International Relations Niche To Civils Aspirant's
        </h2>
      )}
      {category && <h2>{category.description}</h2>}
      <button>Explore</button>
    </div>
  );
}

export { HeroBanner };
