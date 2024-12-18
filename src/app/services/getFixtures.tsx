import { AllFixtures, Fixture } from "@/types/apiFootball";
import { USE_SAMPLE } from "../sampleData/newSample";
import moment from "moment";
import getFixturesSample from "../sampleData/getFixturesSample";

const API_KEY = process.env.API_FOOTBALL_KEY as string;

const leagues = [
  { league: 39, name: "EPL" },
  { league: 148, name: "La Liga" },
  { league: 78, name: "Bundesliga" },
  { league: 135, name: "Serie A" },
  { league: 61, name: "Ligue 1" },
  { league: 2, name: "Champions League" },
  { league: 3, name: "Europa League" },
  { league: 848, name: "Conference League" },
  { league: 531, name: "Uefa Super Cup" },
  { league: 15, name: "Fifa Club World Cup" },
  { league: 45, name: "FA Cup" },
  { league: 48, name: "Carabao Cup" },
  { league: 528, name: "Community Shield" },
  { league: 143, name: "Copa Del Rey" },
  { league: 556, name: "Super Cup LaLiga" },
  { league: 529, name: "Super Cup Bundesliga" },
  { league: 547, name: "Super Cup Serie A" },
  { league: 137, name: "Coppa Italia" },
  { league: 65, name: "Coupe de la Ligue" },
  { league: 66, name: "Coupe de France" },
  { league: 526, name: "Trophee des Champions" },
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
  await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const fixtures: Fixture[] = data.response;
      if (fixtures === null || fixtures === undefined) {
        return [];
      } else {
        return fixtures;
      }
    })
    .catch((err) => {
      console.error(
        `Error fetching ${league} fixtures on year ${year}: ${err}`
      );
    });
  return [];
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
