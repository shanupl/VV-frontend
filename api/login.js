import axios from "axios";
import ServerUrl from "../context/production";

const loginApi = async (formData) => {
  try {
    const response = await axios.post(
      `${ServerUrl}/api/v1/users/login`,
      formData
    );
  
    return response.data; 
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export default loginApi;
