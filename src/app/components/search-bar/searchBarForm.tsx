"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Team } from "@/types/apiFootball";

export default function SearchBarForm({ teamsData }: { teamsData?: Team[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showFilteredBox, setShowFilteredBox] = useState(false);

  const router = useRouter();

  if (!teamsData || !Array.isArray(teamsData)) {
    console.error("Invalid or undefined teamsData provided to SearchBarForm");
    return null; // Avoid rendering if teamsData is invalid
  }

  const filteredTeams = teamsData.filter((team) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);
    setShowFilteredBox(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      const maxIndex = Math.min(filteredTeams.length, 10) - 1;
      setFocusedIndex((prevIndex) =>
        prevIndex < maxIndex ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter" && focusedIndex !== -1 && router) {
      const teamId = filteredTeams[focusedIndex].team.id;
      router.push(`/team/${teamId}`);
      setSearchTerm("");
    }
  };

  const handleTeamItemClick = () => {
    setSearchTerm("");
  };

  return (
    <div className="hidden relative md:block">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="block w-full p-2 pl-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
      {searchTerm && filteredTeams.length > 0 && showFilteredBox ? (
        <div className="absolute top-full left-2 w-full max-w-md bg-black/80 z-20 flex flex-col">
          {filteredTeams.slice(0, 10).map((standing, i) => (
            <Link
              href={`/team/${standing.team.id}`}
              key={standing.team.id}
              className={`p-2 text-neutral-100 ${
                i === focusedIndex ? "bg-neutral-100/40" : ""
              }`}
              onClick={handleTeamItemClick}
            >
              {standing.team.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
