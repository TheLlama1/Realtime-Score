interface TeamResult {
  id: number;
  name: string;
  logo: string;
}

/**
 * Search for teams by name using API-Football
 * @param query Search query string
 * @returns Array of team results
 */
export default async function getTeamsBySearchQuery(
  query: string
): Promise<TeamResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    console.error("API-Football key is missing");
    return [];
  }

  try {
    // Коригиран URL за API заявка
    const url = `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data?.response && Array.isArray(data.response)) {
      return data.response.map((item: any) => ({
        id: item.team?.id ?? 0,
        name: item.team?.name ?? "Unknown",
        logo: item.team?.logo ?? "",
      }));
    }

    return [];
  } catch (error) {
    console.error("Team search error:", error);
    return [];
  }
}
