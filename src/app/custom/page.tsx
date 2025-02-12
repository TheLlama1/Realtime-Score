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
  const [showAllLeagues, setShowAllLeagues] = useState(false);
  const [showAllTeams, setShowAllTeams] = useState(false);

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
      <h1 className="text-3xl font-bold mb-4">Admin Added Games</h1>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Upcoming Fixtures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fixtures
            .filter((fixture) => new Date(fixture.date) >= new Date())
            .map((fixture) => (
              <div
                key={`${fixture.id}_${fixture.leagueId}`}
                className="border p-4 rounded-lg shadow-lg bg-gray-800 text-white"
              >
                <div className="font-bold">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </div>
                <div className="text-sm">
                  {new Date(fixture.date).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Finished Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {finishedFixtures.map((fixture) => (
            <div
              key={`${fixture.id}_${fixture.leagueId}`}
              className="border p-4 rounded-lg shadow-lg bg-gray-800 text-white"
            >
              <div className="font-bold">
                {fixture.homeTeam}{" "}
                {fixture.homeGoals !== undefined ? fixture.homeGoals : ""} -{" "}
                {fixture.awayGoals !== undefined ? fixture.awayGoals : ""}{" "}
                {fixture.awayTeam}
              </div>
              <div className="text-sm">
                {new Date(fixture.date).toLocaleDateString()}
              </div>
              {fixture.homeGoals === undefined ||
              fixture.awayGoals === undefined ? (
                <div className="text-red-500">Result not available yet</div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Leagues</h2>
        <button
          onClick={() => setShowAllLeagues(!showAllLeagues)}
          className="mb-4 py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none"
        >
          {showAllLeagues ? "Hide All Leagues" : "Show All Leagues"}
        </button>
        {showAllLeagues && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leagues.map((league) => (
              <div
                key={league.id}
                className="border p-4 rounded-lg shadow-lg bg-gray-800 text-white"
              >
                {league.name}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Teams</h2>
        <button
          onClick={() => setShowAllTeams(!showAllTeams)}
          className="mb-4 py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none"
        >
          {showAllTeams ? "Hide All Teams" : "Show All Teams"}
        </button>
        {showAllTeams && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div
                key={`${team.id}_${team.leagueId}`}
                className="border p-4 rounded-lg shadow-lg bg-gray-800 text-white"
              >
                {team.name} - {getLeagueNameById(team.leagueId)}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
