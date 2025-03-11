"use client";

import { Fixture } from "@/types/apiFootball";
import Link from "next/link";
import Image from "next/image";

type LiveFixtureItemProps = {
  match: Fixture;
  index: number;
};

export default function LiveFixtureItem({
  match,
  index,
}: LiveFixtureItemProps) {
  return (
    <Link
      href={`/match/${match.fixture.id}`}
      className={`flex w-full p-4 justify-between items-center h-24 hover:bg-gray-500/50
                  ${index % 2 === 0 ? "bg-gray-900/40" : ""}`}
    >
      <div className="w-1/3 flex items-center space-x-4">
        <Image
          src={match.teams.home.logo}
          alt={`${match.teams.home.name} logo`}
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start">
          <span className="font-semibold">{match.teams.home.name}</span>
          <span className="text-lg font-bold">{match.goals.home}</span>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <div className="text-sm">{match.fixture.status.elapsed}&apos;</div>
        <div className="text-base">vs</div>
      </div>
      <div className="w-1/3 flex items-center space-x-4 justify-end">
        <div className="flex flex-col items-end">
          <span className="font-semibold">{match.teams.away.name}</span>
          <span className="text-lg font-bold">{match.goals.away}</span>
        </div>
        <Image
          src={match.teams.away.logo}
          alt={`${match.teams.away.name} logo`}
          width={40}
          height={40}
        />
      </div>
    </Link>
  );
}
