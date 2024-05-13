import axios from "axios";
import ServerUrl from "../context/production";

const getAllPost = async () => {
  try {
    const response = await axios.get(`${ServerUrl}/api/v1/post/getAllPost`);
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default getAllPost;
