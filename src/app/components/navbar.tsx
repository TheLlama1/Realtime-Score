"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { isAdmin } from "@/lib/admin"; // Import the isAdmin function

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Listen to Firebase auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserId(user.uid); // Set the current user ID
      } else {
        setLoggedIn(false);
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // Redirect to home or login page
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
        <a href="/" className="flex items-center space-x-3">
          <img src="/images/logo.png" className="h-20" alt="Realtime" />
          <span className="text-2xl font-semibold dark:text-white">
            Realtime Score
          </span>
        </a>
        <div className="flex items-center space-x-2 md:order-2">
          {/* Desktop Navbar Items */}
          <div className="hidden w-full md:flex md:items-center md:w-auto md:order-1">
            <ul className="flex flex-col p-4 mt-4 space-y-2 bg-gray-50 rounded-lg md:space-y-0 md:space-x-8 md:flex-row md:mt-0 md:bg-transparent md:border-0 dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link href="/custom">
                  <button
                    type="button"
                    className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                  >
                    Unofficial Games
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/privacyPolicy">
                  <button
                    type="button"
                    className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                  >
                    Privacy
                  </button>
                </Link>
              </li>
              {/* Admin Button */}
              {loggedIn && userId && isAdmin(userId) && (
                <li>
                  <Link href="/admin">
                    <button
                      type="button"
                      className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                    >
                      Admin
                    </button>
                  </Link>
                </li>
              )}
              {/* Profile Button & Dropdown (Only visible if logged in) */}
              {loggedIn && (
                <li className="relative">
                  <button
                    onClick={handleDropdownToggle}
                    className="py-2 px-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600"
                  >
                    Profile
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
                      <ul className="p-2 space-y-2">
                        <li>
                          <Link
                            href="/accountProfile"
                            className="block px-4 py-2 text-white hover:bg-gray-600 rounded"
                          >
                            Account
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-white hover:bg-gray-600 rounded w-full text-left"
                          >
                            Log Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              )}
              {/* Sign In Button (If logged out) */}
              {!loggedIn && (
                <li>
                  <Link href="/sign-in">
                    <button
                      type="button"
                      className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                    >
                      Sign In
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
