import axios from "axios";
import ServerUrl from "../context/production";

const signUpApi = async (formData) => {
  try {
    const response = await axios.post(
      `${ServerUrl}/api/v1/users/signUp`,
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export default signUpApi;
