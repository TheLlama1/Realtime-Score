"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LocalTime from "@/app/components/localTime";
import Image from "next/image";
import Link from "next/link";
import { Fixture } from "@/types/apiFootball";

export default function Match() {
  // Use useParams hook from next/navigation
  const params = useParams();
  const fixtureId = parseInt(params.id as string, 10);

  // State for data
  const [fixture, setFixture] = useState<Fixture | undefined>(undefined);
  const [lineups, setLineups] = useState<any[] | undefined>(undefined);
  const [events, setEvents] = useState<any[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [fixtureError, setFixtureError] = useState<string | null>(null);
  const [lineupsError, setLineupsError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setFixtureError(null);
      setLineupsError(null);
      setEventsError(null);

      try {
        // Fetch fixture data
        const fixtureResponse = await fetch(`/api/fixture/${fixtureId}`);

        // Check if fixture exists (404 or empty response)
        if (!fixtureResponse.ok || fixtureResponse.status === 404) {
          setFixtureError(
            "Възникна грешка при зареждането на информацията за мача. Моля, опитайте отново по-късно."
          );
          setLoading(false);
          return;
        }

        const fixtureData = await fixtureResponse.json();

        // Check if fixture data is empty or null
        if (
          !fixtureData ||
          (Array.isArray(fixtureData) && fixtureData.length === 0)
        ) {
          setFixtureError(
            "Възникна грешка при зареждането на информацията за мача. Моля, опитайте отново по-късно."
          );
          setLoading(false);
          return;
        }

        setFixture(fixtureData);

        // Fetch lineups
        try {
          const lineupsResponse = await fetch(`/api/lineups/${fixtureId}`);
          if (lineupsResponse.ok) {
            const lineupsData = await lineupsResponse.json();
            if (lineupsData && lineupsData.length > 0) {
              setLineups(lineupsData);
            } else {
              setLineupsError(
                "Няма налична информация за състави за този мач."
              );
            }
          } else {
            setLineupsError(
              "Възникна проблем при зареждането на състави. Моля, опитайте отново по-късно."
            );
          }
        } catch (lineupsErr) {
          setLineupsError(
            "Възникна проблем при зареждането на състави. Моля, опитайте отново по-късно."
          );
        }

        // Fetch events
        try {
          const eventsResponse = await fetch(`/api/events/${fixtureId}`);
          if (eventsResponse.ok) {
            const eventsData = await eventsResponse.json();
            if (eventsData && eventsData.length > 0) {
              setEvents(eventsData);
            } else {
              setEventsError("Няма налична информация за събития за този мач.");
            }
          } else {
            setEventsError(
              "Възникна проблем при зареждането на събития. Моля, опитайте отново по-късно."
            );
          }
        } catch (eventsErr) {
          setEventsError(
            "Възникна проблем при зареждането на събития. Моля, опитайте отново по-късно."
          );
        }
      } catch (error) {
        console.error("Error fetching match data:", error);
        setFixtureError(
          "Възникна грешка при зареждането на информацията за мача."
        );
      } finally {
        setLoading(false);
      }
    }

    if (fixtureId) {
      fetchData();
    }
  }, [fixtureId]);

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          Зареждане на информацията за мача...
        </div>
      </div>
    );
  }

  if (fixtureError) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          <div className="w-full text-center text-white py-8">
            {fixtureError}
          </div>
        </div>
      </div>
    );
  }

  if (!fixture) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          Няма налична информация за този мач в момента.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center items-center py-10 md:p-10 text-neutral-100">
      {/* Match Info */}
      <div className="flex w-full max-w-7xl items-center justify-center perspective pb-10 md:pb-20">
        <div className="w-1/4 flex justify-center rounded-full logo-shadow">
          <Link href={`../team/${fixture.teams.home.id}`}>
            <Image
              src={fixture.teams.home.logo}
              alt="HomeLogoMatch"
              width={150}
              height={150}
              className="shadow-lg hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center text-center space-y-2">
          <div className="text-sm md:text-lg text-gray-300 bg-gray-900 px-4 py-2 rounded-lg shadow-md">
            <LocalTime fixture={fixture} />
          </div>
          <div className="flex items-center md:text-4xl text-xl font-semibold space-x-2">
            <div className="flex flex-col items-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
              {fixture.score.fulltime.home}
              {fixture.score.penalty.home !== null && (
                <div className="text-sm text-gray-400">
                  <div>Extra Time {fixture.score.extratime.home}</div>
                  <div>Penalty {fixture.score.penalty.home}</div>
                </div>
              )}
            </div>
            <span className="px-2">-</span>
            <div className="flex flex-col items-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
              {fixture.score.fulltime.away}
              {fixture.score.penalty.away !== null && (
                <div className="text-sm text-gray-400">
                  <div>Extra Time: {fixture.score.extratime.away}</div>
                  <div>Penalties: {fixture.score.penalty.away}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-center rounded-full logo-shadow">
          <Link href={`../team/${fixture.teams.away.id}`}>
            <Image
              src={fixture.teams.away.logo}
              alt="AwayLogoMatch"
              width={150}
              height={150}
              className="shadow-lg hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
      {/* Additional Match Info */}
      <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg space-y-4">
        <div className="py-2 bg-gray-900 px-4 rounded-lg shadow-md">
          <div className="text-lg md:text-xl font-semibold">
            {fixture.league.name}
          </div>
          <div className="text-sm text-gray-400">{fixture.league.round}</div>
        </div>
        <div className="flex w-full justify-between text-lg md:text-xl mt-3">
          <div className="w-1/2 text-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
            {fixture.teams.home.name}
          </div>
          <div className="w-1/2 text-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
            {fixture.teams.away.name}
          </div>
        </div>
      </div>
      {/* In-Game Events */}
      {events && events.length > 0 && (
        <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg mt-6">
          <h3 className="text-lg md:text-xl font-semibold">Моменти в мача</h3>
          <div className="bg-gray-900 rounded-lg p-4 shadow-md">
            <ul className="mt-2 space-y-1">
              {events.map((event: any, index: number) => {
                let eventDescription = "";
                if (event.type === "Goal") {
                  eventDescription = `ГОЛ ${event.player.name} ${
                    event.detail === "Penalty"
                      ? "(Д)"
                      : event.detail === "Own Goal"
                      ? "(АГ)"
                      : ""
                  }`;
                } else if (event.type === "subst") {
                  eventDescription = `Смяна: ${event.assist.name} на мястото на ${event.player.name}`;
                } else {
                  eventDescription = `${event.detail} ${event.player.name}`;
                }
                return (
                  <li
                    key={`${event.time.elapsed}-${event.team.id}-${event.player.id}-${index}`}
                    className="hover:text-gray-600"
                  >
                    <span className="font-bold">
                      {event.time.elapsed}&apos;
                    </span>{" "}
                    - {event.team.name}: {eventDescription}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {/* Lineups */}
      {lineups && lineups.length > 0 && (
        <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg mt-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Стартови състави
          </h3>
          <div className="flex w-full justify-between text-lg md:text-xl">
            {lineups[0] && lineups[0].team.id === fixture.teams.home.id && (
              <div className="w-1/2 px-3">
                <h4 className="text-md font-semibold mb-2">
                  {fixture.teams.home.name}
                </h4>
                <div className="bg-gray-900 rounded-lg p-4 shadow-md">
                  <h5 className="font-bold mb-2">Starting XI</h5>
                  <ul className="space-y-1 mb-4">
                    {lineups[0].startXI.map((player: any) => (
                      <li
                        key={player.player.id}
                        className="hover:text-gray-600"
                      >
                        <span className="font-bold">
                          {player.player.number}
                        </span>{" "}
                        - {player.player.name} ({player.player.pos})
                      </li>
                    ))}
                  </ul>
                  <h5 className="font-bold mb-2">Substitutes</h5>
                  <ul className="space-y-1">
                    {lineups[0].substitutes
                      .sort((a: any, b: any) => {
                        const positions = ["G", "D", "M", "F"];
                        return (
                          positions.indexOf(a.player.pos) -
                          positions.indexOf(b.player.pos)
                        );
                      })
                      .map((player: any) => (
                        <li
                          key={player.player.id}
                          className="hover:text-gray-600"
                        >
                          <span className="font-bold">
                            {player.player.number}
                          </span>{" "}
                          - {player.player.name} ({player.player.pos})
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
            {lineups[1] && lineups[1].team.id === fixture.teams.away.id && (
              <div className="w-1/2 px-3">
                <h4 className="text-md font-semibold mb-2">
                  {fixture.teams.away.name}
                </h4>
                <div className="bg-gray-900 rounded-lg p-4 shadow-md">
                  <h5 className="font-bold mb-2">Starting XI</h5>
                  <ul className="space-y-1 mb-4">
                    {lineups[1].startXI.map((player: any) => (
                      <li
                        key={player.player.id}
                        className="hover:text-gray-600"
                      >
                        <span className="font-bold">
                          {player.player.number}
                        </span>{" "}
                        - {player.player.name} ({player.player.pos})
                      </li>
                    ))}
                  </ul>
                  <h5 className="font-bold mb-2">Substitutes</h5>
                  <ul className="space-y-1">
                    {lineups[1].substitutes
                      .sort((a: any, b: any) => {
                        const positions = ["G", "D", "M", "F"];
                        return (
                          positions.indexOf(a.player.pos) -
                          positions.indexOf(b.player.pos)
                        );
                      })
                      .map((player: any) => (
                        <li
                          key={player.player.id}
                          className="hover:text-gray-600"
                        >
                          <span className="font-bold">
                            {player.player.number}
                          </span>{" "}
                          - {player.player.name} ({player.player.pos})
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
