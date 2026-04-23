'use client'
import useAuth from "@/auth/store";
import { useRouter } from "next/navigation";
import  { useEffect } from "react";

export default function UsersDashboard() {
   const checkLogin = useAuth((state) => state.checkLogin);
  const router = useRouter();
   useEffect(() => {
    if (!checkLogin()) {
      router.replace("/login");
    }
  }, []);
  return (
    <div className="py-10 flex flex-col items-center">
      <h1 className="font-semibold text-2xl"> Users Dashboard</h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
        repellendus!
      </p>
    </div>
  );
}
