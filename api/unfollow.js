import axios from "axios";
import ServerUrl from "../context/production";

const unfollowChannelApi = async ({channelId}) => {
  try {
    const token = localStorage.getItem("token");

    if(!token) {
      return {status: 401, message: "Unauthorized"}
    }

    const response = await axios.delete(
      `${ServerUrl}/api/v1/channel/unfollowChannel/${channelId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default unfollowChannelApi;

