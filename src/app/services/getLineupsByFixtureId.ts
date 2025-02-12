import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = "https://v3.football.api-sports.io";

const getLineupsByFixtureId = async (fixtureId: number) => {
  try {
    const response = await axios.get(`${apiUrl}/fixtures/lineups`, {
      params: {
        fixture: fixtureId,
      },
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    console.log("API Response:", response.data);
    const lineups = response.data.response; // Ensure it matches the expected structure
    return lineups;
  } catch (error) {
    console.error("Error fetching lineups:", error);
    return undefined;
  }
};

export default getLineupsByFixtureId;
