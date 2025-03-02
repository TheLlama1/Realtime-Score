import LocalTime from "@/app/components/localTime";
import getFixturesByFixtureId from "@/app/services/getFixtureByFixtureId";
import getLineupsByFixtureId from "@/app/services/getLineupsByFixtureId";
import getEventsByFixtureId from "@/app/services/getEvents";
import { Fixture } from "@/types/apiFootball";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Match({ params }: PageProps) {
  const fixtureId = parseInt(params.id);
  let fixtureByFixtureId: Fixture | undefined = await getFixturesByFixtureId(
    fixtureId
  );
  let lineups: any | undefined = await getLineupsByFixtureId(fixtureId);
  let events: any | undefined = await getEventsByFixtureId(fixtureId);
  console.log("Fixture Data:", fixtureByFixtureId);
  console.log("Lineups Data:", lineups);
  console.log("Events Data:", events);

  if (!fixtureByFixtureId) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          No Fixture Info Available
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center items-center py-10 md:p-10 text-neutral-100">
      {/* Match Info */}
      <div className="flex w-full max-w-7xl items-center justify-center perspective pb-10 md:pb-20">
        <div className="w-1/4 flex justify-center rounded-full  logo-shadow">
          <Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
            <Image
              src={fixtureByFixtureId.teams.home.logo}
              alt="HomeLogoMatch"
              width={150}
              height={150}
              className=" shadow-lg hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center text-center space-y-2">
          <div className="text-sm md:text-lg text-gray-300 bg-gray-900 px-4 py-2 rounded-lg shadow-md">
            <LocalTime fixture={fixtureByFixtureId} />
          </div>
          <div className="flex items-center md:text-4xl text-xl font-semibold space-x-2">
            <div className="flex flex-col items-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
              {fixtureByFixtureId.score.fulltime.home}
              {fixtureByFixtureId.score.penalty.home !== null && (
                <div className="text-sm text-gray-400">
                  <div>
                    Extra Time {fixtureByFixtureId.score.extratime.home}
                  </div>
                  <div>Penalty {fixtureByFixtureId.score.penalty.home}</div>
                </div>
              )}
            </div>
            <span className="px-2">-</span>
            <div className="flex flex-col items-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
              {fixtureByFixtureId.score.fulltime.away}
              {fixtureByFixtureId.score.penalty.away !== null && (
                <div className="text-sm text-gray-400">
                  <div>
                    Extra Time: {fixtureByFixtureId.score.extratime.away}
                  </div>
                  <div>Penalties: {fixtureByFixtureId.score.penalty.away}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-center rounded-full  logo-shadow">
          <Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
            <Image
              src={fixtureByFixtureId.teams.away.logo}
              alt="AwayLogoMatch"
              width={150}
              height={150}
              className=" shadow-lg hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
      {/* Additional Match Info */}
      <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg space-y-4">
        <div className="py-2 bg-gray-900 px-4 rounded-lg shadow-md">
          <div className="text-lg md:text-xl font-semibold">
            {fixtureByFixtureId.league.name}
          </div>
          <div className="text-sm text-gray-400">
            {fixtureByFixtureId.league.round}
          </div>
        </div>
        <div className="flex w-full justify-between text-lg md:text-xl mt-3">
          <div className="w-1/2 text-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
            {fixtureByFixtureId.teams.home.name}
          </div>
          <div className="w-1/2 text-center bg-gray-900 px-4 py-2 rounded-lg shadow-md">
            {fixtureByFixtureId.teams.away.name}
          </div>
        </div>
      </div>
      {/* In-Game Events */}
      {events && events.length > 0 && (
        <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg mt-6">
          <h3 className="text-lg md:text-xl font-semibold">In-Game Events</h3>
          <div className="bg-gray-900 rounded-lg p-4 shadow-md">
            <ul className="mt-2 space-y-1">
              {events.map((event: any, index: number) => {
                let eventDescription = "";
                if (event.type === "Goal") {
                  eventDescription = `GOAL ${event.player.name} ${
                    event.detail === "Penalty"
                      ? "(P)"
                      : event.detail === "Own Goal"
                      ? "(OG)"
                      : ""
                  }`;
                } else if (event.type === "subst") {
                  eventDescription = `Substitution: ${event.assist.name} for ${event.player.name}`;
                } else {
                  eventDescription = `${event.detail} ${event.player.name}`;
                }
                return (
                  <li
                    key={`${event.time.elapsed}-${event.team.id}-${event.player.id}-${index}`}
                    className="hover:text-gray-600"
                  >
                    <span className="font-bold">{event.time.elapsed}'</span> -{" "}
                    {event.team.name}: {eventDescription}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {/* Lineups */}
      {lineups && (
        <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg mt-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Lineups</h3>
          <div className="flex w-full justify-between text-lg md:text-xl">
            {lineups.length > 0 &&
              lineups[0] &&
              lineups[0].team.id === fixtureByFixtureId.teams.home.id && (
                <div className="w-1/2 px-3">
                  <h4 className="text-md font-semibold mb-2">
                    {fixtureByFixtureId.teams.home.name}
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
            {lineups.length > 0 &&
              lineups[1] &&
              lineups[1].team.id === fixtureByFixtureId.teams.away.id && (
                <div className="w-1/2 px-3">
                  <h4 className="text-md font-semibold  mb-2">
                    {fixtureByFixtureId.teams.away.name}
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
