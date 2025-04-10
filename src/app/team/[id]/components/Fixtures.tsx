"use client";

import getFixturesByTeamId from "@/app/services/getFixturesByTeamId";
import { Fixture } from "@/types/apiFootball";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import LocalTime from "@/app/components/localTime";
import { useState } from "react";
import Navbar from "@/app/components/navbar";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import next from "next";

type PageProps = {
  fixturesByTeamId: Fixture[];
  teamId: number;
};

export default function Fixtures({ fixturesByTeamId, teamId }: PageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);

  const handleShowMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 5);
  };

  const today = moment().format("YYYY-MM-DD");
  const fixturesDone = fixturesByTeamId.filter((fixture) => {
    const fixtureDate = moment(fixture.fixture.date).format("YYYY-MM-DD");
    return fixtureDate < today;
  });
  const fixturesToday = fixturesByTeamId.filter((fixture) => {
    const fixtureDate = moment(fixture.fixture.date).format("YYYY-MM-DD");
    return fixtureDate === today;
  });
  const fixturesFuture = fixturesByTeamId.filter((fixture) => {
    const fixtureDate = moment(fixture.fixture.date).format("YYYY-MM-DD");
    return fixtureDate > today;
  });

  const firstItemsFixturesFixture = fixturesFuture.slice(0, 5);
  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };
  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === firstItemsFixturesFixture.length - 1
        ? firstItemsFixturesFixture.length - 1
        : prevIndex + 1
    );
  };
  const getTranslateX = (index: number) => {
    return `-${index * 100}%`;
  };

  const reversedFixturesDoneData = [...fixturesDone].reverse();

  const firstItemFixturesDone = reversedFixturesDoneData.slice(
    0,
    visibleItemsCount
  );

  return (
    <div className="flex flex-col w-full justify-center items-center text-neutral-100">
      <div className="flex w-full justify-center items-center p-2 bg-gray-800">
        Предстоящи срещи
      </div>
      <div className="flex items-center justify-center relative overflow-hidden w-full">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
          onClick={prevItem}
        >
          <ChevronDoubleLeftIcon
            className={`h-10 w-10 ${
              currentIndex === 0 ? "text gray-600" : "text-neutral-100"
            }`}
          />
        </button>
        <div
          className="flex transition-transform duration-500 w-full"
          style={{ transform: `translateX(${getTranslateX(currentIndex)})` }}
        >
          {firstItemsFixturesFixture.map((fixture, i) => (
            <Link
              href={`/match/${fixture.fixture.id}`}
              key={fixture.fixture.id}
              className="w-full flex-shrink-0 flex text-neutral-100 items-center h-36 bg-gray-800 hover:bg-gray-500"
            >
              <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                <Image
                  src={fixture.teams.home.logo}
                  alt="HomeLogo"
                  width={70}
                  height={70}
                />
                <div className="text-center">{fixture.teams.home.name}</div>
              </div>

              <div className="flex flex-col justify-center items-center w-1/2">
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  {fixture.league.name}
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  <LocalTime fixture={fixture} />
                </div>
                <div className="flex w-full justify-center items-center h-2/6 md:text-2xl">
                  <div className="flex flex-col justify-center items-center">
                    {fixture.score.penalty.home !== null ? (
                      <div className="flex flex-col justify-center items-center md:text-xs text-[8px]">
                        <div>Extra Time: {fixture.score.extratime.home}</div>
                        <div>Penalty: {fixture.score.penalty.home}</div>
                      </div>
                    ) : fixture.score.extratime.home !== null ? (
                      <div className="text-sm">
                        Extra Time:{fixture.score.extratime.home}
                      </div>
                    ) : null}
                  </div>
                  <span className="block text-xl font-bold">-</span>
                  <div className="flex flex-col justify-center items-center">
                    {fixture.score.penalty.away !== null ? (
                      <div className="flex flex-col justify-center items-center md:text-xs text-[8px]">
                        <div>Extra Time: {fixture.score.extratime.away}</div>
                        <div>Penalties: {fixture.score.penalty.away}</div>
                      </div>
                    ) : fixture.score.extratime.away !== null ? (
                      <div className="text-sm">
                        Extra Time{fixture.score.extratime.away}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  {fixture.fixture.venue.name}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                <Image
                  src={fixture.teams.away.logo}
                  alt="AwayLogo"
                  width={70}
                  height={70}
                />
                <div className="text-center">{fixture.teams.away.name}</div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
          onClick={nextItem}
        >
          <ChevronDoubleRightIcon
            className={`h-10 w-10 ${
              currentIndex === 0 ? "text gray-600" : "text-neutral-100"
            }`}
          />
        </button>
      </div>
      <div className="flex flex-col w-full justify-center items-center bg-gray-800">
        <div className="flex w-full justify-center items-center p-2 bg-gray-800">
          Резултати
        </div>
        {firstItemFixturesDone.map((fixture, i) => (
          <div
            key={i}
            className="flex w-full text-neutral-100 items-center h-36
                        bg-gray-800 hover:bg-gray-500"
          >
            <Link
              href={`/match/${fixture.fixture.id}`}
              key={fixture.fixture.id}
              className="w-full flex text-neutral-100 items-center h-36 bg-gray-800 hover:bg-gray-500"
            >
              <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                <Image
                  src={fixture.teams.home.logo}
                  alt="HomeLogo"
                  width={70}
                  height={70}
                />
                <div className="text-center">{fixture.teams.home.name}</div>
              </div>

              <div className="flex flex-col justify-center items-center w-1/2">
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  {fixture.league.name}
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  <LocalTime fixture={fixture} />
                </div>
                <div className="flex w-full justify-center items-center h-2/6 md:text-2xl">
                  <div className="flex flex-col justify-center items-center">
                    {fixture.score.fulltime.home}
                    {fixture.score.penalty.home !== null ? (
                      <div className="flex flex-col justify-center items-center md:text-xs text-[8px]">
                        <div>Extra Time: {fixture.score.extratime.home}</div>
                        <div>Penalties: {fixture.score.penalty.home}</div>
                      </div>
                    ) : fixture.score.extratime.home !== null ? (
                      <div className="text-sm">
                        Extra Time: {fixture.score.extratime.home}
                      </div>
                    ) : null}
                  </div>
                  <span className="block text-xl font-bold">-</span>
                  <div className="flex flex-col justify-center items-center">
                    {fixture.score.fulltime.away}
                    {fixture.score.penalty.away !== null ? (
                      <div className="flex flex-col justify-center items-center md:text-xs text-[8px]">
                        <div>Extra Time:{fixture.score.extratime.away}</div>
                        <div>Penalties: {fixture.score.penalty.away}</div>
                      </div>
                    ) : fixture.score.extratime.away !== null ? (
                      <div className="text-sm">
                        (et.){fixture.score.extratime.away}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  {fixture.fixture.venue.name}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                <Image
                  src={fixture.teams.away.logo}
                  alt="AwayLogo"
                  width={70}
                  height={70}
                />
                <div className="text-center">{fixture.teams.away.name}</div>
              </div>
            </Link>
            <div
              className={`w-[2%] h-full ${
                !fixture.teams.home.winner && !fixture.teams.away.winner
                  ? "bg-slate-600"
                  : (fixture.teams.home.winner &&
                      fixture.teams.home.id === teamId) ||
                    (fixture.teams.away.winner &&
                      fixture.teams.away.id === teamId)
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            ></div>
          </div>
        ))}
        {visibleItemsCount < fixturesByTeamId.length && (
          <div className="p2">
            <button
              className="bg-gray-800 hover:gray-500 p-4"
              onClick={handleShowMore}
            >
              Покажи още
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
