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
export default apiClient;
