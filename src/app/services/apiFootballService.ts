import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY as string;
const API_URL = "https://v3.football.api-sports.io/fixtures";

export interface Match {
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  matchTime: string;
}

export const getUpcomingMatches = async (): Promise<Match[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "x-apisports-key": API_KEY },
      params: { status: "NS", next: 10 }, // Взима 10 предстоящи мача
    });

    return response.data.response.map((match: any) => ({
      homeTeamId: match.teams.home.id,
      homeTeamName: match.teams.home.name,
      awayTeamId: match.teams.away.id,
      awayTeamName: match.teams.away.name,
      matchTime: match.fixture.date,
    }));
  } catch (error) {
    console.error("Грешка при извличане на мачове от API-Football:", error);
    return [];
  }
};
