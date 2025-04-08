"use client";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username.trim(),
        createdAt: new Date(),
        favorites: [],
      });

      router.push("/accountProfile");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-sky-950 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-2 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
