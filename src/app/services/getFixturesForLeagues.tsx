import { AllFixtures } from "@/types/apiFootball";
import getFixtures from "./getFixtures";
import moment from "moment";

export default async function getFixturesForLeagues(): Promise<AllFixtures[]> {
  try {
    console.log("Fetching all fixtures...");
    const allFixturesByLeague = await getFixtures();

    console.log("All fixtures fetched:", allFixturesByLeague);

    // Filter leagues of interest
    const fixturesForLeagues: AllFixtures[] = [];
    for (const league of allFixturesByLeague) {
      if (
        league.name === "EPL" ||
        league.name === "La Liga" ||
        league.name === "Bundesliga" ||
        league.name === "Serie A" ||
        league.name === "Ligue 1" ||
        league.name === "Efbet League" ||
        league.name === "Second League"
      ) {
        console.log(`Including league: ${league.name}`);
        fixturesForLeagues.push(league);
      } else {
        console.log(`Excluding league: ${league.name}`);
      }
    }

    // Filter and limit fixtures for each league
    const filteredFixtures: AllFixtures[] = fixturesForLeagues.filter(
      (league) => {
        console.log(`Processing fixtures for league: ${league.name}`);

        // Filter fixtures by date
        league.fixtures = league.fixtures
          .filter((fixture) => {
            const isValidDate = moment(fixture.fixture.date).isSameOrAfter(
              moment().subtract(1, "day"),
              "day"
            );
            if (!isValidDate) {
              console
                .log
                //`Excluding outdated fixture: ${fixture.fixture.date} for league: ${league.name}`
                ();
            }
            return isValidDate;
          })
          .slice(0, 5); // Limit to the first 5 fixtures

        console.log(`Remaining fixtures for ${league.name}:`, league.fixtures);

        // Retain leagues that still have fixtures after filtering
        const hasFixtures = league.fixtures.length > 0;
        if (!hasFixtures) {
          console.log(`No remaining fixtures for ${league.name}`);
        }
        return hasFixtures;
      }
    );

    console.log("Filtered fixtures:", filteredFixtures);
    return filteredFixtures;
  } catch (error) {
    console.error("An error occurred while fetching fixtures:", error);
    throw error; // Re-throw for higher-level handling
  }
}
