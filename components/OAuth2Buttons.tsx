import { motion } from "framer-motion";
import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
};

function OAuth2Buttons() {
  return (
    <motion.div variants={fadeUp} custom={4} className="space-y-3">
      <Link
        href={`${import.meta.NEXT_BASE_URL || "http://localhost:8083"}/oauth2/authorization/google`}
        className="block"
      >
        <Button
          type="button"
          variant="outline"
          className="w-full flex cursor-pointer items-center gap-2 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
        >
          <FaGoogle className="w-5 h-5" />
          Continue with Google
        </Button>
      </Link>

      <Link
        href={`${import.meta.NEXT_BASE_URL || "http://localhost:8083"}/oauth2/authorization/github`}
        className="block"
      >
        <Button
          type="button"
          variant="outline"
          className="w-full flex cursor-pointer items-center gap-2 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
        >
          <FaGithub className="w-5 h-5" />
          Continue with GitHub
        </Button>
      </Link>
    </motion.div>
  );
}

export default OAuth2Buttons;
