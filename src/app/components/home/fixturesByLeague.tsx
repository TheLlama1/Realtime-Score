import { Fixture } from "@/types/apiFootball";
import FixtureItem from "./fuxtureItem";

type PageProps = {
  fixturesData: Fixture[];
};

export default function FixturesByLeague({ fixturesData }: PageProps) {
  if (fixturesData.length > 0) {
    return fixturesData.slice(0, 4).map((match, i) => {
      return <FixtureItem match={match} index={i} key={match.fixture.id} />;
    });
  }
}
