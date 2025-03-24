"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Use Next.js router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/accountProfile"); // Redirect to the profile page
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-sky-950 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign In
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-2 text-center">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <Link href="/sign-up">
              <span className="text-gray-300 hover:text-white cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
