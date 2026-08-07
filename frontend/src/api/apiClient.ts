import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    const isAuthRequest = config.url?.includes("/api/auth/login")
                          || config.url?.includes("/api/auth/register");  

    if(token && !isAuthRequest){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export default apiClient;