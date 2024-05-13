import axios from "axios";
import ServerUrl from "../context/production";

const removeBookmarkApi = async (postId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${ServerUrl}/api/v1/post/removeBookmark/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

export default removeBookmarkApi;
