import axios from "axios";

const url = import.meta.env.MODE === "development" ?
    'http ://localhost:3000/api/posts' :
    'https://backend-post-three.vercel.app/api/posts'

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export default api;