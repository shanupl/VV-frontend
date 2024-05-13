import axios from "axios";
import ServerUrl from "../context/production";

const getAllChannelApi = async () => {
  try {
    const response = await axios.get(`${ServerUrl}/api/v1/channel/getAllChannel`);
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default getAllChannelApi;
