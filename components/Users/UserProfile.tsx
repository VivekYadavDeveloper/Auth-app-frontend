"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useAuth from "@/auth/store";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function ProfilePage() {
  // ✅ Dummy user (based on your interface)
//   const [user, setUser] = useState({
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     enabled: true,
//     image: "https://github.com/shadcn.png",
//     provider: "google",
//     createdAt: "2026-01-01",
//     updatedAt: "2026-04-20",
//   });

    const [editMode, setEditMode] = useState(false);
    const user = useAuth((state)=> state.user)

  // temp state for editing
//   const [form, setForm] = useState(user);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setUser(form);
//     setEditMode(false);
//   };

  return (
    <main className="min-h-screen px-6 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      <motion.div
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View and manage your account
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div variants={fadeUp} custom={1}>
          <Card className="border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur">
            <CardContent className="p-6 space-y-6">
              {/* AVATAR */}
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

                {editMode && <Button variant="outline">Change Photo</Button>}
              </div>

              {/* VIEW MODE */}
              {!editMode && (
                <div className="space-y-4 text-sm">
                  <Info label="Name" value={user?.name || "—"} />
                  <Info label="Email" value={user?.email} />
                  <Info label="Provider" value={user?.provider} />
                  <Info
                    label="Status"
                    value={user?.enabled ? "Active" : "Disabled"}
                  />
                  <Info label="Created At" value={user?.createdAt} />
                  <Info label="Updated At" value={user?.updatedAt} />
                </div>
              )}

              {/* EDIT MODE */}
              {editMode && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={user?.name || ""}
                    //   onChange={handleChange}
                      className="focus-visible:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user?.email} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Input value={user?.provider} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Input
                      value={user?.enabled ? "Active" : "Disabled"}
                      disabled
                    />
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4">
                {!editMode ? (
                  <Button
                    onClick={() => setEditMode(true)}
                    className="w-full bg-linear-to-r from-purple-600 to-white text-black font-semibold"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                    //   onClick={handleSave}
                      className="w-full bg-linear-to-r from-purple-600 to-white text-black font-semibold"
                    >
                      Save Changes
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setEditMode(false);
                        // setForm(user?);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}

/* Small reusable UI */
type InfoProps = {
  label: string;
  value?: string | number;
};

function Info({ label, value }: InfoProps) {
  return (
    <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium">{value ?? "—"}</span>
    </div>
  );
}
