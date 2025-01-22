import LocalTime from "@/app/components/localTime";
import getFixturesByFixtureId from "@/app/services/getFixtureByFixtureId";
import { Fixture } from "@/types/apiFootball";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Match({ params }: PageProps) {
  let fixtureByFixtureId: Fixture | undefined = await getFixturesByFixtureId(
    parseInt(params.id)
  );

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
        <div className="w-1/4 flex justify-center rounded-full animate-logo-pop-left logo-shadow">
          <Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
            <Image
              src={fixtureByFixtureId.teams.home.logo}
              alt="HomeLogoMatch"
              width={150}
              height={150}
            />
          </Link>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center text-center">
          <div className="text-sm md:text-lg">
            <LocalTime fixture={fixtureByFixtureId} />
          </div>
          <div className="flex items-center md:text-4xl text-xl font-semibold">
            <div className="flex flex-col items-center">
              {fixtureByFixtureId.score.fulltime.home}
              {fixtureByFixtureId.score.penalty.home !== null && (
                <div className="text-sm">
                  <div>
                    Extra Time {fixtureByFixtureId.score.extratime.home}
                  </div>
                  <div>Penalty {fixtureByFixtureId.score.penalty.home}</div>
                </div>
              )}
            </div>
            <span className="px-2">-</span>
            <div className="flex flex-col items-center">
              {fixtureByFixtureId.score.fulltime.away}
              {fixtureByFixtureId.score.penalty.away !== null && (
                <div className="text-sm">
                  <div>
                    Extra Time: {fixtureByFixtureId.score.extratime.away}
                  </div>
                  <div>Penalties: {fixtureByFixtureId.score.penalty.away}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-center rounded-full animate-logo-pop-right logo-shadow">
          <Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
            <Image
              src={fixtureByFixtureId.teams.away.logo}
              alt="AwayLogoMatch"
              width={150}
              height={150}
            />
          </Link>
        </div>
      </div>

      {/* Additional Match Info */}
      <div className="flex flex-col w-full max-w-5xl bg-gray-800 rounded-lg py-5 px-3 text-center shadow-lg">
        <div className="py-2">
          <div className="text-lg md:text-xl font-semibold">
            {fixtureByFixtureId.league.name}
          </div>
          <div className="text-sm text-gray-400">
            {fixtureByFixtureId.league.round}
          </div>
        </div>
        <div className="flex w-full justify-between text-lg md:text-xl mt-3">
          <div className="w-1/2 text-center">
            {fixtureByFixtureId.teams.home.name}
          </div>
          <div className="w-1/2 text-center">
            {fixtureByFixtureId.teams.away.name}
          </div>
        </div>
      </div>
    </div>
  );
}
