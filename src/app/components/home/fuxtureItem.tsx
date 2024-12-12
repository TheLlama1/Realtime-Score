"use client";

import { Fixture } from "@/types/apiFootball";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import LocalTime from "../localTime";

type PageProps = {
  match: Fixture;
  index: number;
};

export default function FixtureItem({ match, index }: PageProps) {
  const today = moment();
  const matchDate = moment(match.fixture.date);

  if (!today.isBefore(matchDate)) return null;

  return (
    <Link
      href={`/match/${match.fixture.id}`}
      className={`flex w-full p-2 justify-center items-center h-36 hover:bg-gray-500/50
                  ${index % 2 === 0 ? "bg-gray-900/40" : ""}`}
    >
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <Image
          src={match.teams.home.logo}
          alt={`${match.teams.home.name} logo`}
          width={70}
          height={70}
        />
        {match.teams.home.name}
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <div className="text-xs">
          <LocalTime fixture={match} />
        </div>
        <div>vs</div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <Image
          src={match.teams.away.logo}
          alt={`${match.teams.away.name} logo`}
          width={70}
          height={70}
        />
        {match.teams.away.name}
      </div>
    </Link>
  );
}
