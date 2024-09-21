import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
    baseURL: process.env.BACKEND_URL || "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
);

export default api;