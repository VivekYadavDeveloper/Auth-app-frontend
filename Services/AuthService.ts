import RegisterData from "@/Models/RegisterData";
import axios from "axios";
import apiClient from "./Config/ApiClient";
import LoginData from "@/Models/LoginData";

// REGISTER FUNCTION
export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post("/auth/register", signupData);
  return response.data;
};

// LOGIN FUNCTION
export const loginUser = async (loginUser: LoginData) => {
  const response = await apiClient.post("/auth/login", loginUser);
  return response.data;
};
