import axios from "axios";

const url = import.meta.env.VITE_MODE === "development" ?
    'http://localhost:3000/api' :
    'https://backend-post-three.vercel.app/api'

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default api;