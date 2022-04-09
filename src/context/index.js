import { createContext, useContext, useReducer } from "react";
const videoListingContext = createContext();

const VideoListingProvider = ({ children }) => {
  const setCountry = (prevCountries, { type, payload }) => {
    console.log(type, payload);

    switch (type) {
      case "America":
        return {
          flag: "America",
          videos: [...payload],
        };
      case "Russia":
        return {
          flag: "Russia",
          videos: [...payload],
        };
      case "China":
        return {
          flag: "China",
          videos: [...payload],
        };
      case "Pakistan":
        return {
          flag: "Pakistan",
          videos: [...payload],
        };
      case "UK":
        return {
          flag: "UK",
          videos: [...payload],
        };
      case "Srilanka":
        return {
          flag: "Srilanka",
          videos: [...payload],
        };
      case "France":
        return {
          flag: "France",
          videos: [...payload],
        };
      default:
        return {
          flag: "AllVideos",
          videos: [...payload],
        };
    }
  };

  const [{ flag, videos }, dispatchCountry] = useReducer(setCountry, {
    flag: "AllVideos",
    videos: [],
  });

  let filteredVideos;
  // filter method
  if (flag !== "AllVideos") {
    filteredVideos = videos.filter((video) => video.category === flag);
  } else {
    filteredVideos = [...videos];
  }

  return (
    <videoListingContext.Provider
      value={{ dispatchCountry, filteredVideos, videos }}
    >
      {children}
    </videoListingContext.Provider>
  );
};

const useVideoListing = () => useContext(videoListingContext);

export { VideoListingProvider, useVideoListing };
