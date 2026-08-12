import axios from "axios";

const authAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`
});

authAxios.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default authAxios;
