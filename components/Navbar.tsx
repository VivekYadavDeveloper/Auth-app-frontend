"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import useAuth from "@/auth/store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/70"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 md:h-16 gap-4 md:gap-0">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-600 text-white font-semibold">
            A
          </div>
          <span className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
            Auth App
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">
          {checkLogin() ? (
            <>
              <Link
                href="#!"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                {user?.name}
              </Link>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    logout();
                    router.replace("/login");
                  }}
                  variant="outline"
                  className="border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                Home
              </Link>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button className="cursor-pointer bg-linear-to-r from-purple-600 to-white text-black font-semibold hover:scale-105 transition">
                    Signup
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
