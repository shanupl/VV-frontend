import axios from "axios";
import ServerUrl from "../context/production";

const getAllPostByChannelId = async ({channelId}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${ServerUrl}/api/v1/post/getPostByChannelId/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default getAllPostByChannelId;

