"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaShieldAlt, FaLock, FaFingerprint } from "react-icons/fa";
import { MdFlashOn } from "react-icons/md";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

export default function FuturisticAuthHome() {
  return (
    <main className="relative bg-white text-gray-900 dark:bg-black dark:text-white overflow-hidden">
      {/* SUBTLE BACKGROUND (THEME SAFE) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-100 h-100 bg-purple-500/10 blur-3xl rounded-full -top-32 -left-32" />
        <div className="absolute w-87.5 h-87.5 bg-purple-400/10 blur-3xl rounded-full -bottom-32 -right-32" />
      </div>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-6xl font-bold tracking-tight"
        >
          Next-Level{" "}
          <span className="text-purple-600 dark:text-purple-400">
            Authentication
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-gray-600 dark:text-gray-400 max-w-xl"
        >
          Ultra-secure, blazing-fast auth with JWT, OAuth and role-based access
          — engineered for modern applications.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex gap-4 mt-8"
        >
          <Link href="/register">
            <Button className="bg-linear-to-r from-purple-600 to-white text-black font-semibold hover:scale-105 transition">
              Get Started
            </Button>
          </Link>

          <Link href="/login">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
            >
              Login
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-semibold text-center mb-16"
        >
          Core Capabilities
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaShieldAlt />}
            title="JWT Security"
            desc="Token-based authentication with high scalability."
          />
          <FeatureCard
            icon={< FaFingerprint />}
            title="OAuth Integration"
            desc="Google, GitHub and more — plug & play login."
          />
          <FeatureCard
            icon={<FaLock />}
            title="Access Control"
            desc="Role-based permissions for enterprise-level apps."
          />
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-24 px-6 text-center border-t border-gray-200 dark:border-white/10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-semibold"
        >
          Built for Performance & Trust
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={2}
          className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          Advanced encryption, token rotation and secure session handling
          ensures your users stay protected at every layer.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={3}
          className="flex justify-center mt-10"
        >
          <MdFlashOn className="w-12 h-12 text-purple-500" />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold"
        >
          Start Building Secure Apps Today
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={2}
          className="text-gray-600 dark:text-gray-400 mt-4"
        >
          Plug in authentication in minutes — not days.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={3}
        >
          <Link href="/register">
            <Button className="mt-6 bg-linear-to-r from-purple-600 to-white text-black font-semibold hover:scale-105 transition">
              Create Account
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-white/10 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Auth App. All rights reserved.
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
    >
      <Card className="bg-white border-gray-200 dark:bg-white/5 dark:border-white/10 backdrop-blur-md hover:border-purple-400/40 transition">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4 text-purple-600 dark:text-purple-400">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
