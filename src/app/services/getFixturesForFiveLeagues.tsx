import { AllFixtures } from "@/types/apiFootball";
import getFixtures from "./getFixtures";
import moment from "moment";

export default async function getFixturesForFiveLeagues(): Promise<
  AllFixtures[]
> {
  try {
    const allFixturesByLeague = await getFixtures();

    const fixturesForFiveLeagues: AllFixtures[] = [];
    for (const league of allFixturesByLeague) {
      if (
        league.name === "EPL" ||
        league.name === "La Liga" ||
        league.name === "BundesLiga" ||
        league.name === "Serie A" ||
        league.name === "Ligue 1" ||
        league.name === "Efbet League"
      ) {
        fixturesForFiveLeagues.push(league);
      }
    }

    const filteredFixtures: AllFixtures[] = fixturesForFiveLeagues.filter(
      (league) => {
        league.fixtures = league.fixtures
          .filter((fixture) => {
            // Ensure proper date comparison with `moment`
            return moment(fixture.fixture.date).isSameOrAfter(
              moment().subtract(1, "day"),
              "day"
            );
          })
          .slice(0, 5); // Limit to the first 5 fixtures

        // Retain leagues that still have fixtures after filtering
        return league.fixtures.length > 0;
      }
    );
    return filteredFixtures;
  } catch (error) {
    console.error("An error occured while fetching fixtures: ", error);
    throw error;
  }
}
