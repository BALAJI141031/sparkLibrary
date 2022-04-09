import axios from "axios";

const publicGetRequest = async (path) => {
  try {
    const response = await axios.get(path);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export { publicGetRequest };
