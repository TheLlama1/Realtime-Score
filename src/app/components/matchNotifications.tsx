"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { getFavoriteTeams } from "@/app/services/getFavouriteTeams";
import getLiveFixtures from "@/app/services/getLiveFixtures";
import { Fixture } from "@/types/apiFootball";
import { FaFutbol, FaStopwatch, FaFlagCheckered, FaBell } from "react-icons/fa"; // Импортираме иконите

const MatchNotifications = () => {
  const user = useAuth();
  const [notifiedMatches, setNotifiedMatches] = useState<Set<number>>(
    new Set()
  );
  const [goalNotifications, setGoalNotifications] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    if (!user) return;

    const checkLiveMatches = async () => {
      console.log("🔄 Проверка за мачове на живо...");
      try {
        const favoriteTeamIds = await getFavoriteTeams(user.uid);
        if (favoriteTeamIds.length === 0) return;

        const liveFixtures = await getLiveFixtures();

        liveFixtures.forEach((league) => {
          league.fixtures.forEach((match: Fixture) => {
            const isFavTeamPlaying =
              favoriteTeamIds.includes(match.teams.home.id) ||
              favoriteTeamIds.includes(match.teams.away.id);

            if (isFavTeamPlaying) {
              const matchId = match.fixture.id;
              const homeScore = match.goals.home ?? 0;
              const awayScore = match.goals.away ?? 0;

              // Нотификация за старт на мач
              if (
                !notifiedMatches.has(matchId) &&
                match.fixture.status.short === "1H"
              ) {
                toast.info(
                  <div>
                    <FaBell
                      size={20}
                      style={{ marginRight: "10px", color: "#4caf50" }}
                    />
                    <b>{match.teams.home.name}</b> vs{" "}
                    <b>{match.teams.away.name}</b> започна!
                  </div>
                );
                setNotifiedMatches((prev) => new Set(prev).add(matchId));
              }

              // Нотификация за гол
              if (goalNotifications[matchId] !== homeScore + awayScore) {
                toast.success(
                  <div>
                    <FaFutbol
                      size={20}
                      style={{ marginRight: "10px", color: "#f1c40f" }}
                    />
                    ГОЛ! <b>{match.teams.home.name}</b> {homeScore} -{" "}
                    {awayScore} <b>{match.teams.away.name}</b>
                  </div>
                );
                setGoalNotifications((prev) => ({
                  ...prev,
                  [matchId]: homeScore + awayScore,
                }));
              }

              // Нотификация за полувреме
              if (
                !notifiedMatches.has(matchId) &&
                match.fixture.status.short === "HT"
              ) {
                toast.info(
                  <div>
                    <FaStopwatch
                      size={20}
                      style={{ marginRight: "10px", color: "#f1c40f" }}
                    />
                    Полувреме: <b>{match.teams.home.name}</b> {homeScore} -{" "}
                    {awayScore} <b>{match.teams.away.name}</b>
                  </div>
                );
                setNotifiedMatches((prev) => new Set(prev).add(matchId));
              }

              // Нотификация за краен резултат
              if (
                !notifiedMatches.has(matchId) &&
                match.fixture.status.short === "FT"
              ) {
                toast.success(
                  <div>
                    <FaFlagCheckered
                      size={20}
                      style={{ marginRight: "10px", color: "#e74c3c" }}
                    />
                    Краен резултат: <b>{match.teams.home.name}</b> {homeScore} -{" "}
                    {awayScore} <b>{match.teams.away.name}</b>
                  </div>
                );
                setNotifiedMatches((prev) => new Set(prev).add(matchId));
              }
            }
          });
        });
      } catch (error) {
        console.error("❌ Грешка при проверка на мачовете:", error);
      }
    };

    checkLiveMatches();
    const interval = setInterval(checkLiveMatches, 60000); // Проверява на всеки 60 сек

    return () => clearInterval(interval);
  }, [user]);

  return null;
};

export default MatchNotifications;
