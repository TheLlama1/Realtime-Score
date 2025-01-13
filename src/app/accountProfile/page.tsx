"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";

const AccountPage: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [dateRegistered, setDateRegistered] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);

        // Assuming dateRegistered is stored as part of user data in Firestore
        // For now, mock the date for demonstration
        setDateRegistered(
          new Date(user.metadata.creationTime || "").toISOString()
        );
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-xl p-6 bg-sky-950 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Account
        </h2>
        <div className="text-white">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Date Registered:</strong>{" "}
            {dateRegistered
              ? new Date(dateRegistered).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
