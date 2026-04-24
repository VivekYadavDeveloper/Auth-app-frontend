"use client";
import useAuth from "@/auth/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/services/AuthService";
import User from "@/models/User";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function UsersDashboard() {
  const user = useAuth((state) => state.user);

  const [response, setResponse] = useState<User | null>(null);

  const getUserData = async () => {
    try {
      const response = await getCurrentUser(user?.email);
      setResponse(response);
      toast.success("User Access Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const checkLogin = useAuth((state) => state.checkLogin);
  const router = useRouter();
  useEffect(() => {
    if (!checkLogin()) {
      router.replace("/login");
    }
  });
  return (
    <main className="min-h-screen px-6 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      <motion.div
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Welcome back — here’s your system status and activity
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Active Sessions", value: "12" },
            { title: "API Requests", value: "1,240" },
            { title: "Security Score", value: "98%" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 1}
              className="p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h2 className="text-2xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-white dark:to-purple-300 bg-clip-text text-transparent">
                {item.value}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* ACTIVITY */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>✅ Logged in from Chrome (2 mins ago)</p>
            <p>🔐 Password updated (1 day ago)</p>
            <p>📱 New device added (3 days ago)</p>
          </div>
        </motion.div>

        {/* PLACEHOLDER SECTION */}
        <motion.div
          variants={fadeUp}
          custom={5}
          className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center"
        >
          <p className="text-gray-400 text-sm">
            📊 Analytics / Chart Placeholder
          </p>
        </motion.div>
        <motion.div className="flex items-center justify-center">
          <Button onClick={getUserData}>{response?.name}</Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
