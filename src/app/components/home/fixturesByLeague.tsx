import { Fixture } from "@/types/apiFootball";
import FixtureItem from "./fuxtureItem";

type PageProps = {
  fixturesData: Fixture[];
};

export default function FixturesByLeague({ fixturesData }: PageProps) {
  return (
    <div className="flex flex-col w-full">
      {fixturesData.length > 0 ? (
        fixturesData
          .slice(0, 4)
          .map((match, index) => (
            <FixtureItem match={match} index={index} key={match.fixture.id} />
          ))
      ) : (
        <div className="text-center text-gray-500">No fixtures to display.</div>
      )}
    </div>
  );
}
