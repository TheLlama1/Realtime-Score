import React from "react";
import MyFooter from "@/app/components/footer";
import StandingsAndFixtures from "./components/home/standingsAndFixtures";
import { AllFixtures, Standing } from "@/types/apiFootball";
import getStandings from "./services/getStandings";
import getFixturesForLeagues from "./services/getFixturesForLeagues";

export default async function Home() {
  // Fetch standings and fixtures
  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForLeagues();

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center md:p-10">
        {/* Pass both standings and fixtures to the component */}
        <StandingsAndFixtures
          standingsData={standingsData}
          filteredFixtures={filteredFixtures}
        />
      </div>
    </>
  );
}
