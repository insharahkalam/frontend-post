import axios from "axios";

const url = import.meta.env.VITE_MODE === "development" ?
    'http://localhost:3000/api' :
    'https://backend-post-three.vercel.app/api'

const api = axios.create({
    baseURL: url,
    headers: {
        headers: { "Content-Type": "multipart/form-data" },
    },
});

export default api;