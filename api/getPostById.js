import axios from "axios";
import ServerUrl from "../context/production";

const getPostByIdApi = async ({postId}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${ServerUrl}/api/v1/post/getPost/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default getPostByIdApi;

