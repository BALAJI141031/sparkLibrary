import axios from "axios";

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
    console.log(path, payload, "============>");
    const response = await axios.post(path, payload);
    console.log("it is not printing");
    return response;
  } catch (e) {
    console.log("coming directly here", e);
    throw e;
  }
};

const privateGetRequest = async (path) => {
  try {
    const response = await axios.get(path, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MTUxN2NmOS05MTg4LTRlNGYtOWM1MS0xMzMxZWE1ZThkZmQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.WTkYnS_dAUXq8sBn-GKoX0BC6ZJKNpL8Q_CNUzlebJI",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const privatePostRequest = async (path, video) => {
  try {
    console.log(path, video, "failing to make post");
    const response = await axios.post(
      path,
      { video },
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MTUxN2NmOS05MTg4LTRlNGYtOWM1MS0xMzMxZWE1ZThkZmQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.WTkYnS_dAUXq8sBn-GKoX0BC6ZJKNpL8Q_CNUzlebJI",
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
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MTUxN2NmOS05MTg4LTRlNGYtOWM1MS0xMzMxZWE1ZThkZmQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.WTkYnS_dAUXq8sBn-GKoX0BC6ZJKNpL8Q_CNUzlebJI",
      },
    });

    return response;
  } catch (e) {
    console.log(e, "came here");
  }
};

const createPlaylistReq = async (path, playlist) => {
  try {
    const response = await axios.post(
      path,
      { playlist },
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MTUxN2NmOS05MTg4LTRlNGYtOWM1MS0xMzMxZWE1ZThkZmQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.WTkYnS_dAUXq8sBn-GKoX0BC6ZJKNpL8Q_CNUzlebJI",
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
