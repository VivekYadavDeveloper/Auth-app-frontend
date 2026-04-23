"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import LoginData from "@/models/LoginData";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Alert, AlertTitle } from "../ui/alert";
import { CiCircleAlert } from "react-icons/ci";
import axios from "axios";
import { Spinner } from "../ui/spinner";
import useAuth from "@/auth/store";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useRouter();
  const login = useAuth((state) => state.login);

  // HANDLE INPUT CHANGE EVENT
  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  // HANDLE FOR SUBMIT
  const handleFormSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      return toast.error("Fill the required fields");
    }

    console.log(loginData);
    try {
      setLoading(true);
      // const response = await loginUser(loginData);
      const userInfo = await login(loginData);
     
      // setLoginData({
      //   email: "",
      //   password: "",
      // });
      toast.success("Login Successfully");
      //  console.log(userInfo);
      navigation.replace("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <motion.div
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-6"
      >
        {/* HEADING */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Login to your account to continue
          </p>
        </motion.div>

        {/* ERROR  */}

        <div>
          {error && (
            <Alert variant={"destructive"}>
              <CiCircleAlert />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleFormSubmit}
          variants={fadeUp}
          custom={2}
          className="space-y-4"
        >
          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="focus-visible:ring-purple-500"
              name="email"
              value={loginData.email}
              onChange={handelInputChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="focus-visible:ring-purple-500"
              name="password"
              value={loginData.password}
              onChange={handelInputChange}
            />
          </div>

          {/* LOGIN BUTTON */}
          <Button className="w-full cursor-pointer bg-linear-to-r from-purple-600 to-white text-black font-semibold hover:scale-[1.02] transition">
            {loading ? (
              <>
                <Spinner /> Loading..
              </>
            ) : (
              "Login"
            )}
          </Button>
        </motion.form>

        {/* DIVIDER */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex items-center gap-4"
        >
          <Separator className="flex-1" />
          <span className="text-xs text-gray-500">OR</span>
          <Separator className="flex-1" />
        </motion.div>

        {/* SOCIAL LOGIN */}
        <motion.div variants={fadeUp} custom={4} className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <FaGoogle className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <FaGithub className="w-5 h-5" />
            Continue with GitHub
          </Button>
        </motion.div>

        {/* FOOTER */}
        <motion.p
          variants={fadeUp}
          custom={5}
          className="text-center text-sm text-gray-600 dark:text-gray-400"
        >
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
