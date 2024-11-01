"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import { IoSearch } from "react-icons/io5";
import SearchBar from "./search-bar/searchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className=" border-b border-gray-200 ">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
        <a href="#" className="flex items-center space-x-3">
          <img src="" className="h-8" alt="Realtime" />
          <span className="text-2xl font-semibold dark:text-white">
            Realtime Score
          </span>
        </a>
        <div className="flex items-center space-x-2 md:order-2">
          {/* Navigation links */}
          <div className="hidden w-full md:flex md:items-center md:w-auto md:order-1">
            <ul className="flex flex-col p-4 mt-4 space-y-2 bg-gray-50 rounded-lg md:space-y-0 md:space-x-8 md:flex-row md:mt-0 md:bg-transparent md:border-0 dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3  rounded md:p-0">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <Link href="/sign-in">
                  <button type="button">Sign in</button>
                </Link>
              </li>
            </ul>
          </div>
          <SearchBar />

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 17 14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1h15M1 7h15M1 13h15"
              ></path>
            </svg>
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
