import React from "react";
import MyNavbar from "@/app/components/navbar";
import MyFooter from "@/app/components/footer";
import StandingsAndFixtures from "./components/home/standingsAndFixtures";
import { AllFixtures, Standing } from "@/types/apiFootball";
import getStandings from "./services/getStandings";
import getFixturesForFiveLeagues from "./services/getFixturesForFiveLeagues";

export default async function Home() {
  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();
  return (
    <>
      <MyNavbar />

      <div className="flex flex-col w-full justify-center items-center md:p-10">
        <StandingsAndFixtures
          standingsData={standingsData}
          filteredFixtures={filteredFixtures}
        />
      </div>

      <MyFooter />
    </>
  );
}
