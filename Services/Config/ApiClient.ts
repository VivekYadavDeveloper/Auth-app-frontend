import useAuth from "@/auth/store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL || "http://localhost:8083/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // HANDLING COOKIES STORE
  withCredentials: true,
  timeout: 10000,
});



// EVERY REQUEST
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;
