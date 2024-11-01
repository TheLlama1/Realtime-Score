// SearchBar.jsx
import React from "react";
import SearchBarForm from "./searchBarForm";
import getTeams from "@/app/services/getTeams";
import { Team } from "@/types/apiFootball";
export default async function SearchBar() {
  let teamsData: Team[] = await getTeams();

  return (
    <div>
      {/* Search button (visible on mobile) */}
      <button
        type="button"
        className="md:hidden text-gray-500 dark:text-gray-400 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 20 20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 19l-4-4m0-7a7 7 0 10-14 0 7 7 0 0014 0z"
          ></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>

      {/* Include the search bar form (hidden on mobile) */}
      <SearchBarForm teamsData={teamsData} />
    </div>
  );
}
