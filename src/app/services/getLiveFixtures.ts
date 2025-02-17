import axios from "axios";
import { AllFixtures, Fixture } from "@/types/apiFootball";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = "https://v3.football.api-sports.io";

const getLiveFixtures = async (): Promise<AllFixtures[]> => {
  try {
    const response = await axios.get(`${apiUrl}/fixtures`, {
      params: {
        live: "all",
      },
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    const liveFixtures: Fixture[] = response.data.response;

    // Log API response for debugging
    console.log("API Response:", response.data);

    // Group fixtures by league
    const groupedFixtures = liveFixtures.reduce((acc: any, fixture) => {
      const leagueName = fixture.league.name;
      if (!acc[leagueName]) {
        acc[leagueName] = [];
      }
      acc[leagueName].push(fixture);
      return acc;
    }, {});

    // Convert grouped fixtures to AllFixtures format
    const allFixtures: AllFixtures[] = Object.keys(groupedFixtures).map(
      (leagueName) => ({
        name: leagueName,
        fixtures: groupedFixtures[leagueName],
      })
    );

    // Log grouped fixtures for debugging
    console.log("Grouped Fixtures:", allFixtures);

    return allFixtures;
  } catch (error) {
    console.error("Error fetching live fixtures:", error);
    return [];
  }
};

export default getLiveFixtures;
