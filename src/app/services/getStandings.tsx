import "server-only";
import { Standing } from "@/types/apiFootball";
import moment from "moment";
import { USE_SAMPLE } from "../sampleData/newSample";
import getStandingsSample from "../sampleData/getStandingsSample";

export default async function getStandings(): Promise<Standing[]> {
  if (USE_SAMPLE) {
    return getStandingsSample();
  }

  const currentTime = moment();
  const month = currentTime.month();
  let year;

  if (month < 6) {
    year = currentTime.year() - 1;
  } else {
    year = currentTime.year();
  }

  const API_KEY: string = process.env.API_KEY as string;

  const options = {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
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
  ];

  for (const league of leagues) {
    let url = `https://v3.football.api-sports.io/standings?league=${league.id}&season=${year}`;

    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const standing = data.response[0];
        if (standing) {
          standings.push(standing);
        }
      })
      .catch((err) => {
        console.error(`Error fetching ${league.name} standings ${err}`);
      });
  }

  return standings;
}
