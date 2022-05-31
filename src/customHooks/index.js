import {
  useVideoListing,
  usePlayVideo,
  useVideoAnalytics,
  usePlaylists,
  useAuth,
  useSnackbar,
} from "../context";
import { useNavigate } from "react-router-dom";
import { privateGetRequest } from "../serverCalls";

const useIsVideoLiked = async () => {
  const { streamingVideo } = usePlayVideo();
  const { dispatchAnalytics } = useVideoAnalytics();
  try {
    const likedVideos = await privateGetRequest("/api/user/likes");
    if (likedVideos.data.likes.length !== 0) {
      for (let i = 0; i < likedVideos.data.likes.length; i++) {
        if (likedVideos.data.likes[i]._id === streamingVideo._id) {
          dispatchAnalytics({ type: "liked", payload: true });
          console.log(likedVideos.data.likes[i]._id, streamingVideo._id);
        } else {
          dispatchAnalytics({ type: "liked", payload: false });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export {
  useVideoListing,
  useNavigate,
  usePlayVideo,
  useVideoAnalytics,
  usePlaylists,
  useAuth,
  useSnackbar,
  useIsVideoLiked,
};
