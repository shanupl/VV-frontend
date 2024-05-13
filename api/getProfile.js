import axios from "axios";
import ServerUrl from "../context/production";

const getProfileApi = async ({channelId}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${ServerUrl}/api/v1/channel/getChannel/${channelId}`, {
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

export default getProfileApi;

