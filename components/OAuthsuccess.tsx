"use client";

import useAuth from "@/auth/store";
import { refreshToken } from "@/services/AuthService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

function OAuthSuccess() {
  const navigation = useRouter();

  const [isRefreshing, setIsRefreashing] = useState<boolean>(false);
  const changeLocalLoginData = useAuth((state) => state.changeLocalLoginData);

  useEffect(() => {
    async function getAccessToken() {
      if (!isRefreshing) {
        // Call Here Refresh Token
        setIsRefreashing(true);

        try {
          const responseRefreshToken = await refreshToken();

          // USER Logined
          changeLocalLoginData(
            responseRefreshToken.accessToken,
            responseRefreshToken.user,
            true,
          );
          toast.success("Login Successfully!");
          navigation.replace("/dashboard");
        } catch (error) {
          toast.error(`Error While Login! ${error}`);
          navigation.replace("/login");
          console.log(error);
        } finally {
          setIsRefreashing(false);
        }
      }
    }

    getAccessToken();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-3 items-center justify-center">
      <Spinner />
      <h1 className="text-2xl font-semibold">Please Wait...</h1>
    </div>
  );
}

export default OAuthSuccess;
