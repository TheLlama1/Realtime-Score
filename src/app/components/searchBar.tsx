import React, { useState, useEffect } from "react";

interface Team {
  id: number;
  name: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  const leagues = [
    { name: "EPL", id: 39 },
    { name: "La Liga", id: 140 },
    { name: "Bundesliga", id: 78 },
    { name: "Serie A", id: 135 },
    { name: "Ligue 1", id: 61 },
    { name: "Efbet League", id: 172 },
  ];

  const season = "2024";

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const requests = leagues.map((league) =>
          fetch(
            `https://v3.football.api-sports.io/teams?league=${
              league.id
            }&season=${2024}`,
            {
              headers: { "x-apisports-key": apiKey || "" },
            }
          ).then((response) => response.json())
        );

        const responses = await Promise.all(requests);
        const allTeams = responses.flatMap((data) =>
          data.response.map((team: any) => ({
            id: team.team.id,
            name: team.team.name,
          }))
        );

        setTeams(allTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [season]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = teams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(results);
    } else {
      setFilteredTeams([]);
    }
  }, [searchTerm, teams]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a team..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-800 p-2 border border-gray-300 rounded-lg"
      />
      {filteredTeams.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-gray-800 border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
          {filteredTeams.map((team) => {
            const teamId = team.id.toString();
            return (
              <div key={team.id} className="p-2 hover:bg-gray-500">
                <a href={`team/${teamId}`}>{team.name}</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
