import axios from "axios";
import ServerUrl from "../context/production";

const followChannelApi = async ({channelId}) => {
  try {
    const token = localStorage.getItem("token");

    if(!token) {
      return {status: 401, message: "Unauthorized"}
    }

    const status = "unfollow";
    const response = await axios.post(
      `${ServerUrl}/api/v1/channel/followChannel/${channelId}`, { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   
    console.log(response.data, "response follow ----")
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default followChannelApi;

