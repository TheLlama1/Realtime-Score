import { AllFixtures, Fixture } from "@/types/apiFootball";
import { USE_SAMPLE } from "../sampleData/newSample";
import moment from "moment";
import getFixturesSample from "../sampleData/getFixturesSample";
import { Leaf } from "lucide-react";

const API_KEY = process.env.API_FOOTBALL_KEY as string;

const leagues = [
  { league: 39, name: "EPL" },
  { league: 45, name: "FA Cup" },
  { league: 48, name: "Carabao Cup" },
  { league: 140, name: "La Liga" },
  { league: 143, name: "Copa del Rey" },
  { league: 78, name: "Bundesliga" },
  { league: 81, name: "DFB Pokal" },
  { league: 135, name: "Serie A" },
  { league: 137, name: "Coppa Italia" },
  { league: 61, name: "Ligue 1" },
  { league: 66, name: "Coupe de France" },
  { league: 172, name: "Efbet League" },
  { league: 173, name: "Second League" },
  { league: 174, name: "Bulgarian Cup" },
  { league: 2, name: "UEFA Champions League" },
  { league: 3, name: "UEFA Europa League" },
  { league: 848, name: "UEFA Conference League" },
  { league: 4, name: "UEFA Super Cup" },
];

async function fetchFixturesByLeague(
  year: number,
  league: number
): Promise<Fixture[]> {
  const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year}`;
  const options = {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY,
    },
    next: {
      //revalidate date every 24 hours
      revalidate: 60 * 60 * 24,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const fixtures: Fixture[] = data.response;
    if (fixtures === null || fixtures === undefined) {
      return [];
    } else {
      return fixtures;
    }
  } catch (err) {
    console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
    return [];
  }
}
export default async function getFixtures(): Promise<AllFixtures[]> {
  if (USE_SAMPLE) {
    return getFixturesSample();
  }
  try {
    const currentTime = moment();
    const year = currentTime.year();
    const month = currentTime.month();

    const allFixturesByLeague: AllFixtures[] = [];

    for (const league of leagues) {
      if (month <= 5) {
        allFixturesByLeague.push({
          name: league.name,
          fixtures: await fetchFixturesByLeague(year - 1, league.league),
        });
      } else if (month >= 8) {
        allFixturesByLeague.push({
          name: league.name,
          fixtures: await fetchFixturesByLeague(year, league.league),
        });
      } else {
        allFixturesByLeague.push({
          name: league.name,
          fixtures: await fetchFixturesByLeague(year - 1, league.league),
        });
        const existingData = allFixturesByLeague.find(
          (data) => data.name === league.name
        );
        if (existingData) {
          existingData.fixtures.push(
            ...(await fetchFixturesByLeague(year, league.league))
          );
        } else {
          allFixturesByLeague.push({
            name: league.name,
            fixtures: await fetchFixturesByLeague(year, league.league),
          });
        }
      }
    }

    return allFixturesByLeague;
  } catch (error) {
    console.error("An error occured while fetching fixtures: ", error);
    throw error;
  }
}
