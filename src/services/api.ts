import axios from "axios";
import storage from "utils/storage";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || ""
});

api.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
