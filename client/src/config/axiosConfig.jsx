import axios from "axios";

export const BASICURL = "http://localhost:1001/api";

export const axiosApi = axios.create({
    baseURL: BASICURL,
    withCredentials: true,
});

axiosApi.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    } else {
        console.log("error");
    }

    return config;
});
