import "./index.css";

function Video({ videoUrl }) {
  return (
    <div className="video-div">
      <iframe
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
