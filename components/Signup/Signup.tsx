"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
};

export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <motion.div
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-6"
      >
        {/* HEADING */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign up to get started with secure authentication
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form variants={fadeUp} custom={2} className="space-y-4">
          {/* USERNAME */}
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="your_username"
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* SIGNUP BUTTON */}
          <Button className="w-full bg-linear-to-r from-purple-600 to-white text-black font-semibold hover:scale-[1.02] transition">
            Create Account
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
          {/* GOOGLE */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <FaGoogle className="w-5 h-5" />
            Continue with Google
          </Button>

          {/* GITHUB */}
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
