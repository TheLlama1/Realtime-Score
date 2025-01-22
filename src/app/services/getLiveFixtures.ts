import { Fixture } from "@/types/apiFootball";

const API_KEY = process.env.API_FOOTBALL_KEY as string;

async function getLiveFixtures(): Promise<Fixture[]> {
  const liveUrl = `https://v3.football.api-sports.io/fixtures?live=all`; // URL to fetch live fixtures
  const options = {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY,
    },
  };

  try {
    const response = await fetch(liveUrl, options);
    const data = await response.json();
    const liveFixtures: Fixture[] = data.response;

    if (liveFixtures === null || liveFixtures === undefined) {
      return [];
    } else {
      console.log("Live fixtures:", liveFixtures);
      return liveFixtures;
    }
  } catch (err) {
    console.log(`Error fetching live fixtures: ${err}`);
    return [];
  }
}

export default getLiveFixtures;
