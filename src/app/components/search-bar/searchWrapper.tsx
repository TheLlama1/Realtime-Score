import Navbar from "../navbar";
import getTeams from "@/app/services/getTeams";
import { Team } from "@/types/apiFootball";

export async function getServerSideProps() {
  const teamsData = await getTeams();
  return {
    props: { teamsData },
  };
}

export default function HomePage({ teamsData }: { teamsData: Team[] }) {
  return <Navbar teamsData={teamsData} />;
}
