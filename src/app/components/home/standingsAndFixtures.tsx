"use client";
import { AllFixtures, Standing } from "@/types/apiFootball";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FixturesByLeague from "./fixturesByLeague";
import getLiveFixtures from "@/app/services/getLiveFixtures";
import LiveFixtureItem from "@/app/components/home/liveFixturesItem";

export default function StandingsAndFixtures({
  standingsData,
  filteredFixtures,
}: {
  standingsData: Standing[];
  filteredFixtures: AllFixtures[];
}) {
  const menuItems = [
    "Висша Лига",
    "Ла Лига",
    "Бундеслига",
    "Серия А",
    "Лига 1",
    "А група",
    "Б група",
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [liveFixtures, setLiveFixtures] = useState<AllFixtures[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToTab = (index: number) => {
    const container = menuRef.current;
    if (container) {
      const tab = container.children[index] as HTMLElement;
      tab?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    scrollToTab(index);
  };

  const fetchLiveFixtures = async () => {
    const liveFixturesData = await getLiveFixtures();
    console.log("Live Fixtures Data:", liveFixturesData); // Debug log for live fixtures data
    setLiveFixtures(liveFixturesData);
  };

  useEffect(() => {
    fetchLiveFixtures();
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey) {
        event.preventDefault();
      }
    };

    const container = menuRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-7xl bg-gray-900 text-white mx-auto p-2 sm:p-5 rounded-xl">
      <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0">
        {/* Standings Section */}
        <div className="flex-1 lg:w-3/5 md:p-6 p-3 py-4 bg-gray-800 rounded-xl">
          <div className="flex flex-col justify-center items-center w-full text-neutral-100">
            <div className="p-2 text-lg font-bold">Standings</div>
            {/* Desktop Tabs (hidden on mobile) */}
            <div className="hidden sm:flex justify-center w-full mb-4">
              {menuItems.map((leagueName, i) => (
                <button
                  key={i}
                  className={`w-full p-4 rounded-t-lg text-base font-bold transition-all duration-300 ${
                    i === activeTab
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  }`}
                  onClick={() => handleTabClick(i)}
                >
                  {leagueName}
                </button>
              ))}
            </div>

            {/* Mobile Tabs (hidden on desktop) */}
            <div className="flex sm:hidden overflow-x-auto w-full mb-4 scrollbar-none">
              <div className="flex min-w-full">
                {menuItems.map((leagueName, i) => (
                  <button
                    key={i}
                    className={`flex-shrink-0 p-2 rounded-t-lg text-xs font-bold transition-all duration-300 ${
                      i === activeTab
                        ? "bg-gray-700 text-white"
                        : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                    }`}
                    onClick={() => handleTabClick(i)}
                  >
                    {leagueName}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={menuRef}
              className="w-full flex overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-sm"
            >
              {standingsData.map((responseData, i) => (
                <div
                  key={responseData.league.id}
                  className="flex-shrink-0 w-full snap-center flex justify-center items-center"
                >
                  <div className="flex flex-col justify-between p-1 sm:p-2 w-full bg-gray-700 rounded-lg shadow-lg">
                    <div className="flex w-full p-1 text-[10px] sm:text-xs">
                      <div className="w-[8%] sm:w-1/12"></div>
                      <div className="w-[32%] sm:w-3/12"></div>
                      <div className="w-[45%] sm:w-6/12 flex justify-evenly">
                        <div className="w-full text-center">M</div>
                        <div className="w-full text-center">W</div>
                        <div className="w-full text-center">D</div>
                        <div className="w-full text-center">L</div>
                        <div className="w-full text-center font-bold">P</div>
                        <div className="hidden sm:block w-full text-center">
                          GF
                        </div>
                        <div className="hidden sm:block w-full text-center">
                          GA
                        </div>
                        <div className="hidden sm:block w-full text-center">
                          GD
                        </div>
                      </div>
                      <div className="w-[15%] sm:w-2/12 text-center">Form</div>
                    </div>
                    {responseData.league.standings[0].map((team, j) => (
                      <Link
                        href={`/team/${team.team.id}`}
                        key={team.team.name + j}
                        className={`flex w-full p-1 hover:bg-gray-600 ${
                          j % 2 === 0 ? "bg-gray-800" : ""
                        }`}
                      >
                        <div className="w-[8%] sm:w-1/12 flex px-1 sm:px-2 justify-center items-center text-[10px] sm:text-xs">
                          {j + 1}
                        </div>
                        <div className="w-[32%] sm:w-3/12 flex text-[10px] sm:text-xs items-center truncate">
                          {team.team.name}
                        </div>
                        <div className="w-[45%] sm:w-6/12 flex justify-center items-center text-[10px] sm:text-xs">
                          <div className="w-full text-center">
                            {team.all.played}
                          </div>
                          <div className="w-full text-center">
                            {team.all.win}
                          </div>
                          <div className="w-full text-center">
                            {team.all.draw}
                          </div>
                          <div className="w-full text-center">
                            {team.all.lose}
                          </div>
                          <div className="w-full text-center font-bold">
                            {team.points}
                          </div>
                          <div className="hidden sm:block w-full text-center">
                            {team.all.goals.for}
                          </div>
                          <div className="hidden sm:block w-full text-center">
                            {team.all.goals.against}
                          </div>
                          <div className="hidden sm:block w-full text-center">
                            {team.goalsDiff}
                          </div>
                        </div>
                        {/* Form section */}
                        <div className="w-[15%] sm:w-2/12 flex justify-center items-center">
                          {team.form?.split("").map((char, i) => (
                            <div
                              key={char + i}
                              className={`opacity-80 w-2 h-2 sm:w-3 sm:h-3 m-[1px] rounded-full ${
                                char === "L"
                                  ? "bg-red-500"
                                  : char === "D"
                                  ? "bg-gray-500"
                                  : "bg-green-500"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Fixtures Section */}
        <div className="flex-1 lg:w-2/5 pt-5 lg:pt-10 lg:pr-10 pb-5 lg:pb-10 lg:pl-10">
          <div className="flex flex-col justify-center items-center bg-gray-800 w-full text-neutral-100 rounded-3xl h-full">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="p-2 text-lg font-bold mb-4">Предстоящи срещи</div>
              <div className="flex flex-col w-full justify-center items-center pb-5 overflow-hidden">
                {menuItems.map((leagueName, i) => {
                  return (
                    activeTab === i &&
                    filteredFixtures.map((league, j) => {
                      if (league.name === leagueName) {
                        return (
                          <FixturesByLeague
                            fixturesData={league.fixtures}
                            key={league.name + j}
                          />
                        );
                      }
                    })
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Fixtures Section */}
      <div className="mt-6 lg:mt-10 flex flex-col w-full bg-gray-700 rounded-lg shadow-lg p-3 sm:p-4">
        <div className="text-lg font-bold mb-3 sm:mb-4">На живо</div>
        {liveFixtures.length > 0 ? (
          liveFixtures.map((league, i) => (
            <div
              key={i}
              className="w-full flex flex-col justify-center items-center pb-3 sm:pb-5"
            >
              <div className="p-2 text-base sm:text-xl font-bold text-center mb-2 sm:mb-4 bg-gray-800 w-full rounded-lg">
                {league.name}
              </div>
              {league.fixtures.map((fixture, j) => (
                <LiveFixtureItem
                  match={fixture}
                  index={j}
                  key={fixture.fixture.id + j}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="text-center p-2">No live fixtures available</div>
        )}
      </div>
    </div>
  );
}
