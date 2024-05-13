// const axios = require('axios');
// import ServerUrl from "../context/production";

// const filterPostApi = async (selectedTopics)  => {
//     try {
//         const token = localStorage.getItem("token");
      
//         // Fetch all channels
//         const channelsResponse = await axios.get(`${ServerUrl}/api/v1/channel/getAllChannel`);
//         const allChannels = channelsResponse.data.data;
        

//         // Filter channels based on selected topics
//         // const filteredChannels = allChannels.filter(channel =>
//         //     selectedTopics.some(topic => channel.genre.includes(topic))
//         // );
//         const filteredChannels = allChannels.filter(channel =>
//             channel.channelData.genre && selectedTopics.some(topic => channel.channelData.genre.includes(topic))
//         );
//         console.log(filteredChannels, "check filter channel ----------------")
//         // Fetch all posts associated with filtered channels
//         const filteredPosts = [];
//         for (const channel of filteredChannels) {
//             const postsResponse = await axios.get(`${ServerUrl}/api/v1/post/getPostByChannelId/${channel._id}`);
//             const posts = postsResponse.data.data;

//             // Add channel data to each post
//             for (const post of posts) {
//                 const channelDataResponse = await axios.get(`${ServerUrl}/api/v1/channel/getChannel/${post.channelId}`);
//                 const channelData = channelDataResponse.data;
//                 post.channelData = channelData;
//                 filteredPosts.push(post);
//             }
//         }

//         return filteredPosts;
//     } catch (error) {
//         console.error('Error filtering posts:', error);
//         return []; 
//     }
// }
    
// export default filterPostApi;


const axios = require('axios');
import ServerUrl from "../context/production";

const filterPostApi = async (selectedTopics)  => {
    try {
        // Fetch all channels
        const channelsResponse = await axios.get(`${ServerUrl}/api/v1/channel/getAllChannel`);
        const allChannels = channelsResponse.data.data;

        // Filter channels based on selected topics
        const filteredChannels = allChannels.filter(channel =>
            channel.channelData.genre && selectedTopics.some(topic => channel.channelData.genre.includes(topic))
        );

        // Fetch all posts associated with filtered channels
        const filteredPosts = [];
        for (const channel of filteredChannels) {
            const channelId = channel.channelData._id; // Extract the channel ID
            const postsResponse = await axios.get(`${ServerUrl}/api/v1/post/getPostByChannelId/${channelId}`);
            const posts = postsResponse.data.data;

            // Add channel data to each post
            for (const post of posts) {
                const channelDataResponse = await axios.get(`${ServerUrl}/api/v1/channel/getChannel/${post.channelId}`);
                const channelData = channelDataResponse.data;
                post.channelData = channelData;
                filteredPosts.push(post);
            }
        }

        return filteredPosts;
    } catch (error) {
        console.error('Error filtering posts:', error);
        return []; 
    }
}
    
export default filterPostApi;
