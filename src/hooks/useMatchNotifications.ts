"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { getFavoriteTeams } from "@/app/services/getFavouriteTeams";
import { getUpcomingMatches } from "@/app/services/apiFootballService"; // Сменено към API-Football
import { notifyUser } from "@/app/services/notifications";
import { onAuthStateChanged } from "firebase/auth";

const checkUpcomingMatches = async (userId: string) => {
  const favoriteTeamIds = await getFavoriteTeams(userId);
  if (favoriteTeamIds.length === 0) return;

  const matches = await getUpcomingMatches();
  const now = new Date();

  matches.forEach((match) => {
    const matchTime = new Date(match.matchTime);
    const timeDiff = (matchTime.getTime() - now.getTime()) / (1000 * 60); // Минутна разлика

    if (
      (favoriteTeamIds.includes(match.homeTeamId) ||
        favoriteTeamIds.includes(match.awayTeamId)) &&
      timeDiff <= 30 &&
      timeDiff > 0
    ) {
      notifyUser(
        `📢 ${match.homeTeamName} срещу ${match.awayTeamName} започва след 30 минути!`,
        "info"
      );
    } else if (
      (favoriteTeamIds.includes(match.homeTeamId) ||
        favoriteTeamIds.includes(match.awayTeamId)) &&
      timeDiff <= 0 &&
      timeDiff > -5
    ) {
      notifyUser(
        `⚽ ${match.homeTeamName} срещу ${match.awayTeamName} ТЪКМО ЗАПОЧНА!`,
        "warning"
      );
    } else if (
      (favoriteTeamIds.includes(match.homeTeamId) ||
        favoriteTeamIds.includes(match.awayTeamId)) &&
      timeDiff <= -5 &&
      timeDiff > -120
    ) {
      notifyUser(
        `🔥 ${match.homeTeamName} срещу ${match.awayTeamName} се играе в момента!`,
        "success"
      );
    }
  });
};

export const useMatchNotifications = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkUpcomingMatches(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);
};
