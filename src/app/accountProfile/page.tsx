"use client";

import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

interface FavoriteTeam {
  id: number;
  name: string;
  logo: string;
}

const AccountPage: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [dateRegistered, setDateRegistered] = useState<string>("");
  const [favoriteTeams, setFavoriteTeams] = useState<FavoriteTeam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email);
          setDateRegistered(
            new Date(user.metadata.creationTime || "").toISOString()
          );

          // Fetch user's favorite teams from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().favourites) {
            const favorites = userDoc.data().favourites;
            console.log("Favorites from Firestore:", favorites);

            // Create display data for teams even if we can't fetch details
            const teamsData = favorites.map((teamId: number) => ({
              id: teamId,
              name: `Team ${teamId}`, // Default name that will be shown if API fails
              logo: "",
            }));

            setFavoriteTeams(teamsData);

            // Try to get team details for each team if possible
            for (const teamId of favorites) {
              try {
                // Try to get cached data first
                const cachedTeam = localStorage.getItem(`team_${teamId}`);
                if (cachedTeam) {
                  const teamData = JSON.parse(cachedTeam);
                  if (teamData && teamData.team) {
                    updateTeamInState(teamId, teamData.team);
                    continue; // Skip API call if we have cached data
                  }
                }

                // If getting team name from API fails, we'll at least have the Team ID showing
                tryFetchTeamData(teamId);
              } catch (err) {
                console.error(`Error processing team ${teamId}:`, err);
                // No need to set error state since we're showing fallback data
              }
            }
          } else {
            console.log("No favorites found in user document");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Update a single team in state
  const updateTeamInState = (teamId: number, teamData: any) => {
    setFavoriteTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              id: teamId,
              name: teamData.name || `Team ${teamId}`,
              logo: teamData.logo || "",
            }
          : team
      )
    );
  };

  // Try different API endpoints to get team data
  const tryFetchTeamData = async (teamId: number) => {
    const endpoints = [
      `/api/teamInfo?id=${teamId}`,
      `/api/teams/${teamId}`,
      `/api/team?id=${teamId}`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying to fetch from ${endpoint}`);
        const response = await fetch(endpoint);

        if (response.ok) {
          const data = await response.json();
          console.log(`Successfully fetched team data from ${endpoint}:`, data);

          // Handle different response structures
          if (data.team) {
            updateTeamInState(teamId, data.team);
            localStorage.setItem(`team_${teamId}`, JSON.stringify(data));
            return;
          } else if (data.name) {
            updateTeamInState(teamId, data);
            localStorage.setItem(
              `team_${teamId}`,
              JSON.stringify({ team: data })
            );
            return;
          }
        }
      } catch (error) {
        console.error(`Failed to fetch from ${endpoint}:`, error);
      }
    }

    console.log(`Could not fetch data for team ${teamId} from any endpoint`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-xl p-6 bg-sky-950 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Акаунт
        </h2>
        <div className="text-white mb-6">
          <p>
            <strong>Имейл:</strong> {email}
          </p>
          <p>
            <strong>Дата на регистрация:</strong>{" "}
            {dateRegistered
              ? new Date(dateRegistered).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Favorite Teams Section */}
        <div className="mt-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-white">Любими отбори</h3>
          {isLoading ? (
            <div className="text-white text-center py-4">Зарежда...</div>
          ) : error ? (
            <div className="text-red-400 text-center py-4">{error}</div>
          ) : favoriteTeams.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {favoriteTeams.map((team) => (
                <Link
                  href={`/team/${team.id}`}
                  key={team.id}
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {team.logo ? (
                    <div className="mr-3">
                      <Image
                        src={team.logo}
                        alt={`${team.name} logo`}
                        width={40}
                        height={40}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 mr-3 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm text-white">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-white">{team.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-white text-center bg-gray-800 p-4 rounded-lg">
              Все още не са добавени любими отбори.
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Излез
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
