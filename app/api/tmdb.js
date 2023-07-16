import axios from "axios";
export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
    },
    params: {
        api_key: "2683ff2d00db52455d30b96be9ca85ab",
        
    }
})