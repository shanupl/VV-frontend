import axios from "axios";
import ServerUrl from "../context/production";

const getChannelByName = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${ServerUrl}/api/v1/channel/getChannelByName`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    console.log(response.data, "response of the data");
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default getChannelByName;
