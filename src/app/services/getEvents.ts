import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = "https://v3.football.api-sports.io";

const getEvents = async (fixtureId: number) => {
  try {
    const response = await axios.get(`${apiUrl}/fixtures/events`, {
      params: {
        fixture: fixtureId,
      },
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    return response.data.response;
  } catch (error) {
    console.error("Error fetching events:", error);
    return undefined;
  }
};

export default getEvents;
