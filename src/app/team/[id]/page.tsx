import getTeamInfoByTeamId from "@/app/services/getTeamInfoByTeamId";
import type { Fixture, Team } from "@/types/apiFootball";
import Image from "next/image";
import Fixtures from "./components/Fixtures";
import getFixturesByTeamId from "@/app/services/getFixturesByTeamId";
import FavouriteButton from "./components/FavouriteButton"; // Import the client component

export default async function Team({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const teamId = parseInt((await params).id);

  let teamInfo: Team | undefined;
  let fixturesByTeamId: Fixture[] = [];

  try {
    teamInfo = await getTeamInfoByTeamId(teamId);

    // Fetch fixtures
    fixturesByTeamId = await getFixturesByTeamId(teamId);
    console.log("Fixtures:", fixturesByTeamId);
  } catch (err) {
    console.error(`Error fetching data for team ID ${teamId}:`, err);
  }

  // Handle no team info case
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
          <FavouriteButton teamId={teamId} />
          {teamInfo.team?.logo ? (
            <Image
              src={teamInfo.team.logo}
              alt="Team Logo"
              width={150}
              height={150}
              className="p-3"
            />
          ) : (
            <div>No Logo Available</div>
          )}
          <div className="text-2xl">
            {teamInfo.team?.name || "Unknown Team"}
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="w-1/3 text-center">
              {teamInfo.group
                ? `${teamInfo.group}:#${teamInfo.rank}`
                : "No Group/Rank"}
            </div>
            <div className="w-1/3 flex flex-col justify-center items-center">
              <div className="text-center">Форма</div>
              <div className="flex justify-center items-center">
                {teamInfo.form
                  ? teamInfo.form
                      .split("")
                      .map((char, i) => (
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
                      ))
                  : "No Form Data"}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col w-full p-2 mt-10">
            <div className="flex w-full justify-center items-center text-xl font-bold">
              <div className="w-full text-center">Т</div>
              <div className="w-full text-center">ИМ</div>
              <div className="w-full text-center">П</div>
              <div className="w-full text-center">Р</div>
              <div className="w-full text-center">З</div>
              <div className="w-full text-center">ОГ</div>
              <div className="w-full text-center">ДГ</div>
              <div className="w-full text-center">ГР</div>
            </div>
            <div className="flex w-full justify-center items-center text-xl">
              <div className="w-full text-center font-bold">
                {teamInfo.points || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.all?.played || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.all?.win || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.all?.draw || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.all?.lose || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.all?.goals?.for || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.all?.goals?.against || "0"}
              </div>
              <div className="w-full text-center">
                {teamInfo.goalsDiff || "0"}
              </div>
            </div>
          </div>
        </div>

        {/* Fixtures Section */}
        <div className="flex flex-col md:w-2/3 justify-center items-center">
          {fixturesByTeamId.length > 0 ? (
            <Fixtures fixturesByTeamId={fixturesByTeamId} teamId={teamId} />
          ) : (
            <div>No Fixtures Available</div>
          )}
        </div>
      </div>
    </div>
  );
}
