"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface League {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  leagueId: string;
}

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  leagueId: string;
  homeGoals?: number;
  awayGoals?: number;
}

const Page = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [finishedFixtures, setFinishedFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const leaguesSnapshot = await getDocs(collection(db, "leagues"));
      const leaguesData = leaguesSnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as League)
      );
      setLeagues(leaguesData);

      let allTeams: Team[] = [];
      let allFixtures: Fixture[] = [];
      let finishedFixturesData: Fixture[] = [];

      for (const league of leaguesData) {
        const teamsSnapshot = await getDocs(
          collection(db, "leagues", league.id, "teams")
        );
        allTeams = [
          ...allTeams,
          ...teamsSnapshot.docs.map(
            (doc) =>
              ({ ...doc.data(), id: doc.id, leagueId: league.id } as Team)
          ),
        ];

        const fixturesSnapshot = await getDocs(
          collection(db, "leagues", league.id, "fixtures")
        );
        fixturesSnapshot.docs.forEach((doc) => {
          const fixture = {
            ...doc.data(),
            id: doc.id,
            leagueId: league.id,
          } as Fixture;
          allFixtures.push(fixture);
          const fixtureDate = new Date(fixture.date);
          if (fixtureDate < new Date()) {
            finishedFixturesData.push(fixture);
          }
        });
      }

      setTeams(allTeams);
      setFixtures(allFixtures);
      setFinishedFixtures(finishedFixturesData);
    };

    fetchData();
  }, []);

  const getLeagueNameById = (id: string) => {
    const league = leagues.find((league) => league.id === id);
    return league ? league.name : "Unknown League";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin added games</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Leagues</h2>
      <ul className="mb-6">
        {leagues.map((league) => (
          <li key={league.id} className="border p-2 mb-2">
            {league.name}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Teams</h2>
      <ul className="mb-6">
        {teams.map((team) => (
          <li key={`${team.id}_${team.leagueId}`} className="border p-2 mb-2">
            {team.name} - {getLeagueNameById(team.leagueId)}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Upcoming Fixtures</h2>
      <ul className="mb-6">
        {fixtures
          .filter((fixture) => new Date(fixture.date) >= new Date())
          .map((fixture) => (
            <li
              key={`${fixture.id}_${fixture.leagueId}`}
              className="border p-2 mb-2"
            >
              {fixture.homeTeam} vs {fixture.awayTeam} on{" "}
              {new Date(fixture.date).toLocaleDateString()}
            </li>
          ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Finished Games</h2>
      <ul>
        {finishedFixtures.map((fixture) => (
          <li
            key={`${fixture.id}_${fixture.leagueId}`}
            className="border p-2 mb-2"
          >
            {fixture.homeTeam}{" "}
            {fixture.homeGoals !== undefined ? fixture.homeGoals : ""} -{" "}
            {fixture.awayGoals !== undefined ? fixture.awayGoals : ""}{" "}
            {fixture.awayTeam} on {new Date(fixture.date).toLocaleDateString()}{" "}
            {fixture.homeGoals === undefined || fixture.awayGoals === undefined
              ? "(Result not available yet)"
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
