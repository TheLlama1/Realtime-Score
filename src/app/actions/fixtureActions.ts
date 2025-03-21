// src/app/actions/fixtureActions.ts
"use server";

import { Fixture } from "@/types/apiFootball";
import getFixtures from "../services/getFixtures";

export async function getFixturesByFixtureId(
  id: number
): Promise<Fixture | undefined> {
  try {
    const allFixturesByLeague = await getFixtures();

    for (const league of allFixturesByLeague) {
      for (const fixture of league.fixtures) {
        if (fixture.fixture.id === id) {
          return fixture;
        }
      }
    }

    return undefined;
  } catch (error) {
    console.error(
      "Error occurred while fetching fixture by fixture Id: ",
      error
    );
    return undefined;
  }
}
