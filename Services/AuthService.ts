import RegisterData from "@/models/RegisterData";
import LoginData from "@/models/LoginData";
import LoginResponseData from "@/models/LoginResponseData";
import apiClient from "./Config/ApiClient";
import User from "@/models/User";

// REGISTER FUNCTION
export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post("/auth/register", signupData);
  return response.data;
};

// LOGIN FUNCTION
export const loginUser = async (loginUser: LoginData) => {
  const response = await apiClient.post<LoginResponseData>(
    "/auth/login",
    loginUser,
  );
  return response.data;
};

// LOGOUT FUNCTION
export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

// GET CURRENT USER FUNCTION
export const getCurrentUser = async (emailId: string | undefined) => {
  const response = await apiClient.get<User>(`users/email/${emailId}`);
  return response.data;
};


// REFRESH TOKEN FUNCTION
export const refreshToken = async () => {
  const response = await apiClient.post<LoginResponseData>("/auth/refresh");
  return response.data; 
 }
