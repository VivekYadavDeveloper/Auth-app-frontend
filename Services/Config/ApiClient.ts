import useAuth from "@/auth/store";
import { rejects } from "assert";
import axios from "axios";
import { resolve } from "path";
import { refreshToken } from "../AuthService";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL || "http://localhost:8083/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // HANDLING COOKIES STORE
  withCredentials: true,
  timeout: 10000,
});

// BEFORE EVERY REQUEST
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;

type PendingRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let pending: PendingRequest[] = [];

function queueRequest(req: PendingRequest) {
  pending.push(req);
}

function resolveQueues(newToken: string) {
  pending.forEach((p) => p.resolve(newToken));
  pending = [];
}

function rejectQueues(error: unknown) {
  pending.forEach((p) => p.reject(error));
  pending = [];
}

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(` Refresh Token Function :${error}`);

    const is401 = error.response.status === 401;
    const original = error.config;
    console.log("Original", original._retry);

    // message:
    if (!is401 || original._retry) {
      if (error.response && error.response.data)
        toast.error(error.response.data?.message || "An error occurred");
      console.error("API Error:", error.response.data);
      console.error("Full error:", error);

      return Promise.reject(error);
    }

    original._retry = true;

    // We will try to refresh the token
    if (isRefreshing) {
      console.log("Already refreshing...");

      return new Promise((resolve, reject) => {
        queueRequest({
          resolve: (newToken: string) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(original));
          },
          reject: (err) => reject(err),
        });
      });
    }
    //  Start refresh
    isRefreshing = true;
    try {
      console.log("Start refreshing...");

      const loginResponse = await refreshToken();
      const newToken = loginResponse.accessToken;
      if (!newToken) throw new Error("No new token received");
      useAuth
        .getState()
        .changeLocalLoginData(newToken, loginResponse.user, true);

      original.headers.Authorization = `Bearer ${newToken}`;
      resolveQueues(newToken);
      return apiClient(original);
    } catch (error) {
      resolveQueues("null");
      useAuth.getState().logout();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
