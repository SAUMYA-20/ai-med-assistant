"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [email, setEmail] = useState("justcallmebae11@gmail.com"); // Replace with session value
  const [subscription, setSubscription] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?email=${email}`);
        setSubscription(res.data.subscription || "free");
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#2e004f] via-[#4b0082] to-[#1a002e]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2e004f] via-[#4b0082] to-[#1a002e] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-purple-500/30 text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-100">
          Account Profile
        </h2>

        <div className="mb-5">
          <label className="block text-sm text-purple-300 mb-1">Email</label>
          <div className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300">
            {email}
          </div>
        </div>

        <div>
          <label className="block text-sm text-purple-300 mb-1">Subscription</label>
          <div className="w-full px-4 py-2 rounded-lg bg-white/20 border border-purple-300 capitalize">
            {subscription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
