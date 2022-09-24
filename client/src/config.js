import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://ijpkaushik-youtube-clone.herokuapp.com/api/",
})