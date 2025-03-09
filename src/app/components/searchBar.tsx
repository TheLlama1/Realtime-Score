"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  id: number;
  name: string;
  logo: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Затваряне на резултатите при клик извън компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Дебаунс на търсенето (изчакване преди заявка)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length >= 3) {
      debounceTimeout.current = setTimeout(() => {
        searchTeams(value);
      }, 300); // Изчакване 300ms преди заявка
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Изпълнява заявка към API-то
  const searchTeams = async (query: string) => {
    setIsLoading(true);
    setShowResults(true);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      if (data && Array.isArray(data.results)) {
        setResults(data.results.slice(0, 4)); // Лимит до първите 4 резултата
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching teams:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for teams..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setResults([]);
              setShowResults(false);
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-white text-center">Searching...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={`/team/${result.id}`}
                    className="flex items-center p-3 hover:bg-gray-700 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    {result.logo ? (
                      <div className="mr-3">
                        <Image
                          src={result.logo}
                          alt={`${result.name} logo`}
                          width={32}
                          height={32}
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 mr-3 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm text-white">
                          {result.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-white">{result.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : searchTerm.length >= 3 ? (
            <div className="p-4 text-white text-center">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
