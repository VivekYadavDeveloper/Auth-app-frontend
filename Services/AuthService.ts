import RegisterData from "@/Models/RegisterData";
import axios from "axios";
import apiClient from "./Config/ApiClient";

// REGISTER FUNCTION
export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post("/auth/register", signupData);
  return response.data;
};

// LOGIN FUNCTION
export const loginUser = async (loginUser: RegisterData) => {};
