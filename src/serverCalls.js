import axios from "axios";
import Cookies from "js-cookie";

const publicGetRequest = async (path) => {
  try {
    const response = await axios.get(path);
    return response;
  } catch (e) {
    console.error(e);
  }
};

const publicPostRequest = async (path, payload) => {
  try {
    const response = await axios.post(path, payload);
    return response;
  } catch (e) {
    throw e;
  }
};

const privateGetRequest = async (path) => {
  try {
    const response = await axios.get(path, {
      headers: {
        authorization: Cookies.get("jwt_token"),
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const privatePostRequest = async (path, video) => {
  try {
    const response = await axios.post(
      path,
      { video },
      {
        headers: {
          authorization: Cookies.get("jwt_token"),
        },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

const privateDeleteRequest = async (path) => {
  try {
    const response = await axios.delete(path, {
      headers: {
        authorization: Cookies.get("jwt_token"),
      },
    });

    return response;
  } catch (e) {
    throw e;
  }
};

const createPlaylistReq = async (path, playlist) => {
  try {
    const response = await axios.post(
      path,
      { playlist },
      {
        headers: {
          authorization: Cookies.get("jwt_token"),
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export {
  publicGetRequest,
  privatePostRequest,
  privateDeleteRequest,
  privateGetRequest,
  createPlaylistReq,
  publicPostRequest,
};
