import React from "react";
import MyFooter from "@/app/components/footer";
import StandingsAndFixtures from "./components/home/standingsAndFixtures";
import { AllFixtures, Standing } from "@/types/apiFootball";
import getStandings from "./services/getStandings";
import getFixturesForLeagues from "./services/getFixturesForLeagues";
import MatchNotifications from "@/app/components/matchNotifications"; // Добавено
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Нужно за стилизацията

export default async function Home() {
  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForLeagues();

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center md:p-10">
        <StandingsAndFixtures
          standingsData={standingsData}
          filteredFixtures={filteredFixtures}
        />

        {/* Клиентски компонент за нотификациите */}
        <MatchNotifications />
      </div>
    </>
  );
}
