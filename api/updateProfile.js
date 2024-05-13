// import axios from "axios";
// import ServerUrl from "../context/production";

// const updateProfileApi = async ({formData, channelId, file}) => {
//   try {
//     console.log(file.name, "checking the form data....................")
//     const token = localStorage.getItem("token");
//     const response = await axios.put(`${ServerUrl}/api/v1/channel/updateChannel/${channelId}`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}` 
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating channel:', error.message);
//   }


    

// };

// export default updateProfileApi;


import axios from "axios";
import ServerUrl from "../context/production";

const updateProfileApi = async ({ formData, channelId, file }) => {
  try {
    const token = localStorage.getItem("token");
    let requestData = formData; 
    
    if (file) {
      const formDataWithFile = new FormData();
      formDataWithFile.append("file", file);
      for (let key in formData) {
        formDataWithFile.append(key, formData[key]);
      }
      requestData = formDataWithFile; 
    }

    const response = await axios.put(
      `${ServerUrl}/api/v1/channel/updateChannel/${channelId}`,
      requestData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating channel:', error.message);
  }
};

export default updateProfileApi;

