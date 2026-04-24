import LoginData from "@/models/LoginData";
import LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";
import { loginUser, logoutUser } from "@/services/AuthService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

// type AuthStatus ="idle"| "authenticating" | "authenticated" | "anonmyus"

// GLOBAL AUTH STATE
type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  checkLogin: () => boolean;

  changeLocalLoginData: (
    accessToken: string,
    user: User,
    authStatus: boolean,
  ) => void;
};

// MAIN LOGIC GLOABAL STATE
const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      changeLocalLoginData: (accessToken, user, authStatus) => {
        set({
          accessToken,
          user,
          authStatus,
        });
      },
      login: async (loginData) => {
        console.log("Started login...");
        set({ authLoading: true });
        try {
          const loginResponseData = await loginUser(loginData);
          console.log(loginResponseData.accessToken);
          set({
            accessToken: loginResponseData.accessToken,
            user: loginResponseData.user,
            authStatus: true,
          });
          return loginResponseData;
        } catch (error) {
          throw error;
        } finally {
          set({ authLoading: false });
        }
      },
      logout: async (silent = false) => {
        try {
          //   if (!silent) {
          //     await logoutUser();
          //   }

          set({
            authLoading: true,
          });
          await logoutUser();
        } catch (error) {
        } finally {
          set({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
        }
      },

      checkLogin: () => {
        if (get().accessToken && get().authStatus) {
          return true;
        } else {
          return false;
        }
      },
    }),
    {
      name: LOCAL_KEY,
    },
  ),
);
export default useAuth;
