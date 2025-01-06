import getTeamInfoByTeamId from "@/app/services/getTeamInfoByTeamId";
import type { Fixture, Team } from "@/types/apiFootball";
import Image from "next/image";
import Fixtures from "./components/Fixtures";
import getFixturesByTeamId from "@/app/services/getFixturesByTeamId";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Team({ params }: PageProps) {
  const teamId = parseInt(params.id);

  // Fetching data
  const teamInfo: Team | undefined = await getTeamInfoByTeamId(teamId);
  const fixturesByTeamId: Fixture[] = await getFixturesByTeamId(teamId);

  // Handle no data case
  if (!teamInfo) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full justify-center text-neutral-100">
          Team Info Not Available
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center text-neutral-100">
      <div className="flex flex-col max-w-7xl p-5 w-full md:flex-row">
        {/* Team Info Section */}
        <div className="flex flex-col md:w-1/3 justify-center items-center bg-gray-800">
          <Image
            src={teamInfo.team.logo}
            alt="TeamLogo"
            width={150}
            height={150}
            className="p-3"
          />
          <div className="text-2xl">{teamInfo.team.name}</div>
          <div className="flex justify-center items-center w-full">
            <div className="w-1/3 text-center">
              {teamInfo.group}:#{teamInfo.rank}
            </div>
            <div className="w-1/3 flex flex-col justify-center items-center">
              <div className="text-center">Form</div>
              <div className="flex justify-center items-center">
                {teamInfo.form.split("").map((char, i) => (
                  <div
                    key={i}
                    className={`opacity-80 w-3 h-3 m-1 rounded-full ${
                      char === "L"
                        ? "bg-red-500"
                        : char === "D"
                        ? "bg-gray-500"
                        : "bg-green-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col w-full p-2 mt-10">
            <div className="flex w-full justify-center items-center text-xl font-bold">
              <div className="w-full text-center">P</div>
              <div className="w-full text-center">M</div>
              <div className="w-full text-center">W</div>
              <div className="w-full text-center">D</div>
              <div className="w-full text-center">L</div>
              <div className="w-full text-center">GF</div>
              <div className="w-full text-center">GA</div>
              <div className="w-full text-center">GD</div>
            </div>
            <div className="flex w-full justify-center items-center text-xl">
              <div className="w-full text-center font-bold">
                {teamInfo.points}
              </div>
              <div className="w-full text-center">{teamInfo.all.played}</div>
              <div className="w-full text-center">{teamInfo.all.win}</div>
              <div className="w-full text-center">{teamInfo.all.draw}</div>
              <div className="w-full text-center">{teamInfo.all.lose}</div>
              <div className="w-full text-center">{teamInfo.all.goals.for}</div>
              <div className="w-full text-center">
                {teamInfo.all.goals.against}
              </div>
              <div className="w-full text-center">{teamInfo.goalsDiff}</div>
            </div>
          </div>
        </div>

        {/* Fixtures Section */}
        <div className="flex flex-col md:w-2/3 justify-center items-center">
          <Fixtures fixturesByTeamId={fixturesByTeamId} teamId={teamId} />
        </div>
      </div>
    </div>
  );
}
