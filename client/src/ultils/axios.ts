import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:4200/api',
});

axiosClient.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error)
});

axiosClient.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error)
});

export default axiosClient;