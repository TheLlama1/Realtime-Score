"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { isAdmin } from "@/lib/admin"; // Import the isAdmin function
import SearchBar from "@/app/components/searchBar"; // Import the SearchBar component

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
        <a href="/" className="flex items-center space-x-3">
          <img src="/images/logo.png" className="h-12 md:h-20" alt="Realtime" />
          <span className="text-2xl font-semibold dark:text-white hidden md:block">
            Realtime Score
          </span>
        </a>
        <div className="flex items-center space-x-2 md:order-2">
          <button
            className="block md:hidden text-white hover:text-gray-400 focus:outline-none"
            onClick={handleMobileMenuToggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navbar Items */}
        <div className="hidden md:flex items-center w-full md:w-auto md:order-1 space-x-4">
          <ul className="flex space-x-4">
            <li>
              {/* Search Bar */}
              <SearchBar />
            </li>
            <li>
              <Link href="/custom">
                <button
                  type="button"
                  className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                >
                  Неофициални мачове
                </button>
              </Link>
            </li>

            {/* Admin Button */}
            {loggedIn && userId && isAdmin(userId) && (
              <>
                <li>
                  <Link href="/admin">
                    <button
                      type="button"
                      className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                    >
                      Админ
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/adminDashboard">
                    <button
                      type="button"
                      className="py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                    >
                      Администраторско табло
                    </button>
                  </Link>
                </li>
              </>
            )}
            {/* Profile Button & Dropdown (Only visible if logged in) */}
            {loggedIn && (
              <li className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="py-2 px-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600"
                >
                  Акаунт
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
                    <ul className="p-2 space-y-2">
                      <li>
                        <Link
                          href="/accountProfile"
                          className="block px-4 py-2 text-white hover:bg-gray-600 rounded"
                        >
                          Акаунт
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-white hover:bg-gray-600 rounded w-full text-left"
                        >
                          Излез
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
                    Влез
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full mt-4 space-y-2">
            <ul className="space-y-2">
              <li>
                <Link href="/custom">
                  <button
                    type="button"
                    className="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                  >
                    Неофициални мачове
                  </button>
                </Link>
              </li>
              {/* Admin Button */}
              {loggedIn && userId && isAdmin(userId) && (
                <>
                  <li>
                    <Link href="/admin">
                      <button
                        type="button"
                        className="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                      >
                        Админ
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/adminDashboard">
                      <button
                        type="button"
                        className="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                      >
                        Администраторско табло
                      </button>
                    </Link>
                  </li>
                </>
              )}
              {/* Profile Button & Dropdown (Only visible if logged in) */}
              {loggedIn && (
                <li className="relative">
                  <button
                    onClick={handleDropdownToggle}
                    className="w-full py-2 px-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600"
                  >
                    Акаунт
                  </button>
                  {dropdownOpen && (
                    <div className="w-full mt-2 bg-gray-800 shadow-lg rounded-lg">
                      <ul className="p-2 space-y-2">
                        <li>
                          <Link
                            href="/accountProfile"
                            className="block px-4 py-2 text-white hover:bg-gray-600 rounded"
                          >
                            Акаунт
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-white hover:bg-gray-600 rounded w-full text-left"
                          >
                            Излез
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
                      className="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                    >
                      Влез
                    </button>
                  </Link>
                </li>
              )}
              {/* Search Bar */}
              <li>{/* <SearchBar /> */}</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
