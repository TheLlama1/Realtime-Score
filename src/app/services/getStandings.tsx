import "server-only";
import { Standing } from "@/types/apiFootball";
import moment from "moment";
import { USE_SAMPLE } from "../sampleData/newSample";
import getStandingsSample from "../sampleData/getStandingsSample";

// Define a type for the team objects inside the standings
interface Team {
  team: {
    id: number;
    name: string;
  };
  all: {
    played: number;
  };
  points: number;
  form: string;
}

export default async function getStandings(): Promise<Standing[]> {
  if (USE_SAMPLE) {
    return getStandingsSample();
  }

  const currentTime = moment();
  const month = currentTime.month();
  let year;

  if (month <= 6) {
    year = currentTime.year() - 1;
  } else {
    year = currentTime.year();
  }

  const API_KEY: string = process.env.API_FOOTBALL_KEY as string;
  const options = {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const standings: Standing[] = [];
  const leagues = [
    { name: "EPL", id: 39 },
    { name: "La Liga", id: 140 },
    { name: "Bundesliga", id: 78 },
    { name: "Serie A", id: 135 },
    { name: "Ligue 1", id: 61 },
    { name: "Efbet League", id: 172 },
    { name: "Second League", id: 173 },
  ];

  for (const league of leagues) {
    let url = `https://v3.football.api-sports.io/standings?league=${league.id}&season=${year}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        console.error(
          `Failed to fetch for ${league.name} with status: ${response.status}`
        );
        continue;
      }

      const data = await response.json();

      const standing = data.response?.[0];

      if (!standing) {
        console.error(`No standing data available for ${league.name}`);
        continue;
      }

      standings.push(standing);

      // Log the teams with explicit type
      standing.league.standings[0].forEach((team: Team, index: number) => {});
    } catch (err) {
      console.error(`Error fetching ${league.name} standings:`, err);
    }
  }

  if (standings.length === 0) {
    console.warn("No standings data collected.");
  }

  return standings;
}
