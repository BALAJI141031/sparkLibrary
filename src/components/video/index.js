import "./index.css";

function Video({ videoUrl }) {
  console.log(
    `https://www.youtube.com/embed/${videoUrl}?start=166`,
    "check url"
  );
  return (
    <div className="video-div">
      <iframe
        // width="560"
        // height="315"
        src={`https://www.youtube.com/embed/${videoUrl}?start=166`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export { Video };
