"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IoSearch } from "react-icons/io5";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="w-full">
      <NavigationMenu className="flex justify-between items-center z-10 pb-4">
        <NavigationMenuList className="flex items-center w-full">
          <NavigationMenuItem>
            <div className="text-2xl ml-10 mt-2">Realtime Score</div>
          </NavigationMenuItem>

          {/* Centered Search Input */}
          <NavigationMenuItem className="flex justify-center items-center mx-auto mt-2 mr">
            <div className="relative flex items-center">
              <Input placeholder="Search ..." className="pr-10" />
              <IoSearch className="absolute right-2 text-gray-500" />
            </div>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 absolute-right focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Sign in
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-700" />
      </NavigationMenu>
    </div>
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
