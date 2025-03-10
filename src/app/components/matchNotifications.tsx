"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { getFavoriteTeams } from "@/app/services/getFavouriteTeams";
import getLiveFixtures from "@/app/services/getLiveFixtures";
import { Fixture } from "@/types/apiFootball";
import { FaFutbol, FaStopwatch, FaFlagCheckered, FaBell } from "react-icons/fa";

const MatchNotifications = () => {
  const user = useAuth();
  const [notifiedMatches, setNotifiedMatches] = useState<Set<number>>(
    new Set()
  );
  const [goalNotifications, setGoalNotifications] = useState<{
    [key: number]: number;
  }>({});

  // 🔹 Зареждаме предишни нотификации от localStorage при първоначално стартиране
  useEffect(() => {
    const savedNotifiedMatches = localStorage.getItem("notifiedMatches");
    const savedGoals = localStorage.getItem("goalNotifications");

    if (savedNotifiedMatches)
      setNotifiedMatches(new Set(JSON.parse(savedNotifiedMatches)));
    if (savedGoals) setGoalNotifications(JSON.parse(savedGoals));
  }, []);

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
            const matchId = match.fixture.id;
            const homeScore = match.goals.home ?? 0;
            const awayScore = match.goals.away ?? 0;
            const totalGoals = homeScore + awayScore;
            const status = match.fixture.status.short;

            const isFavTeamPlaying =
              favoriteTeamIds.includes(match.teams.home.id) ||
              favoriteTeamIds.includes(match.teams.away.id);

            if (isFavTeamPlaying) {
              // 🔹 Нотификация за старт на мача (само веднъж)
              if (!notifiedMatches.has(matchId) && status === "1H") {
                showNotification(
                  <div>
                    <FaBell
                      size={20}
                      style={{ marginRight: "10px", color: "#4caf50" }}
                    />
                    <b>{match.teams.home.name}</b> vs{" "}
                    <b>{match.teams.away.name}</b> започна!
                  </div>
                );
                updateNotifiedMatches(matchId);
              }

              // 🔹 Нотификация за гол (само за нови голове, игнорира 0-0)
              if (
                goalNotifications[matchId] !== undefined &&
                goalNotifications[matchId] < totalGoals &&
                totalGoals > 0
              ) {
                showNotification(
                  <div>
                    <FaFutbol
                      size={20}
                      style={{ marginRight: "10px", color: "#f1c40f" }}
                    />
                    ГОЛ! <b>{match.teams.home.name}</b> {homeScore} -{" "}
                    {awayScore} <b>{match.teams.away.name}</b>
                  </div>
                );
                updateGoalNotifications(matchId, totalGoals);
              }

              // 🔹 Нотификация за полувреме (само веднъж)
              if (!notifiedMatches.has(matchId) && status === "HT") {
                showNotification(
                  <div>
                    <FaStopwatch
                      size={20}
                      style={{ marginRight: "10px", color: "#f1c40f" }}
                    />
                    Полувреме: <b>{match.teams.home.name}</b> {homeScore} -{" "}
                    {awayScore} <b>{match.teams.away.name}</b>
                  </div>
                );
                updateNotifiedMatches(matchId);
              }

              // 🔹 Нотификация за краен резултат (само веднъж)
              if (!notifiedMatches.has(matchId) && status === "FT") {
                showNotification(
                  <div>
                    <FaFlagCheckered
                      size={20}
                      style={{ marginRight: "10px", color: "#e74c3c" }}
                    />
                    Краен резултат: <b>{match.teams.home.name}</b> {homeScore} -{" "}
                    {awayScore} <b>{match.teams.away.name}</b>
                  </div>
                );
                updateNotifiedMatches(matchId);
              }

              // 🔹 Запазваме новия резултат
              if (goalNotifications[matchId] !== totalGoals) {
                updateGoalNotifications(matchId, totalGoals);
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
  }, [user, goalNotifications]);

  // ✅ Функция за обновяване на нотифицирани мачове
  const updateNotifiedMatches = (matchId: number) => {
    setNotifiedMatches((prev) => {
      const updated = new Set(prev).add(matchId);
      localStorage.setItem("notifiedMatches", JSON.stringify([...updated]));
      return updated;
    });
  };

  // ✅ Функция за обновяване на нотификации за голове
  const updateGoalNotifications = (matchId: number, goals: number) => {
    setGoalNotifications((prev) => {
      const updated = { ...prev, [matchId]: goals };
      localStorage.setItem("goalNotifications", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Функция за показване на нотификации
  const showNotification = (message: JSX.Element) => {
    toast.info(message);
  };

  return null;
};

export default MatchNotifications;
