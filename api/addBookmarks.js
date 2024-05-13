import axios from "axios";
import ServerUrl from "../context/production";

const bookmarkApi = async (postId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${ServerUrl}/api/v1/post/addBookmark/${postId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default bookmarkApi;
