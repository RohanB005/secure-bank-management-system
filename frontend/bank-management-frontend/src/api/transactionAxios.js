import axios from "axios";

const transactionAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/transactions`
});

transactionAxios.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default transactionAxios;
