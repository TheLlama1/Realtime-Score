import { Team } from "@/types/apiFootball";
import "server-only";
import getTeams from "./getTeams";

export default async function getTeamInfoByTeamId(
  id: number
): Promise<Team | undefined> {
  try {
    const teams: Team[] = await getTeams();

    for (const team of teams) {
      if (team.team.id === id) {
        return team;
      }
    }
    return undefined;
  } catch (error) {
    console.error(
      "An error occured while fetching team info by team id: ",
      error
    );
    throw error;
  }
}
