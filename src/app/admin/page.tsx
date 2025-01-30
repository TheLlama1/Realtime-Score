"use client";
import React, { useEffect, useState } from "react";
import { isAdmin } from "@/lib/admin"; // Adjust the import path as needed
import { auth, db } from "@/lib/firebase"; // Add db from your Firebase configuration
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"; // Import Firestore functions
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AdminPageProps {
  userId: string;
}

const AdminPage: React.FC<AdminPageProps> = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [league, setLeague] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedHomeTeam, setSelectedHomeTeam] = useState<string>("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState<string>("");
  const [fixtureDate, setFixtureDate] = useState<Date | null>(null);
  const [result, setResult] = useState<string>("");
  const [leagues, setLeagues] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [fixtures, setFixtures] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserId(user.uid);
      } else {
        setLoggedIn(false);
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLeagues = async () => {
      const leaguesSnapshot = await getDocs(collection(db, "leagues"));
      setLeagues(
        leaguesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeague) {
      const fetchTeams = async () => {
        const teamsSnapshot = await getDocs(
          collection(db, "leagues", selectedLeague, "teams")
        );
        setTeams(
          teamsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };

      fetchTeams();

      const fetchFixtures = async () => {
        const fixturesSnapshot = await getDocs(
          collection(db, "leagues", selectedLeague, "fixtures")
        );
        setFixtures(
          fixturesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };

      fetchFixtures();
    }
  }, [selectedLeague]);

  if (userId && !isAdmin(userId) && loggedIn) {
    return <h1 className="text-xl text-red-600">Access Denied</h1>;
  }

  const addLeague = async () => {
    try {
      await addDoc(collection(db, "leagues"), { name: league });
      alert("League added successfully!");
    } catch (error) {
      console.error("Error adding league: ", error);
    }
  };

  const addTeam = async () => {
    if (selectedLeague) {
      try {
        await addDoc(collection(db, "leagues", selectedLeague, "teams"), {
          name: team,
        });
        alert("Team added successfully!");
      } catch (error) {
        console.error("Error adding team: ", error);
      }
    } else {
      alert("Please select a league first!");
    }
  };

  const addFixture = async () => {
    if (selectedLeague && selectedHomeTeam && selectedAwayTeam && fixtureDate) {
      try {
        await addDoc(collection(db, "leagues", selectedLeague, "fixtures"), {
          homeTeam: selectedHomeTeam,
          awayTeam: selectedAwayTeam,
          date: fixtureDate.toISOString(),
        });
        alert("Fixture added successfully!");
      } catch (error) {
        console.error("Error adding fixture: ", error);
      }
    } else {
      alert("Please select a league, two teams, and a date first!");
    }
  };

  const updateFixtureResult = async (
    id: string,
    homeGoals: number,
    awayGoals: number
  ) => {
    try {
      const fixtureRef = doc(db, "leagues", selectedLeague, "fixtures", id);
      await updateDoc(fixtureRef, { homeGoals, awayGoals });
      alert("Fixture result updated successfully!");
      const updatedFixtures = fixtures.map((fixture) =>
        fixture.id === id ? { ...fixture, homeGoals, awayGoals } : fixture
      );
      setFixtures(updatedFixtures);
    } catch (error) {
      console.error("Error updating fixture result: ", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
      <p className="text-lg text-white mb-8">
        Welcome, Admin! Here you can manage the application settings and users.
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Add League</h2>
        <input
          type="text"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          placeholder="League Name"
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
        />
        <button
          onClick={addLeague}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Add League
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Add Team</h2>
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
        >
          <option value="">Select League</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Team Name"
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
        />
        <button
          onClick={addTeam}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Add Team
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Add Fixture</h2>
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
        >
          <option value="">Select League</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
        <select
          value={selectedHomeTeam}
          onChange={(e) => setSelectedHomeTeam(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
        >
          <option value="">Select Home Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
        <select
          value={selectedAwayTeam}
          onChange={(e) => setSelectedAwayTeam(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
        >
          <option value="">Select Away Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
        <DatePicker
          selected={fixtureDate}
          onChange={(date) => setFixtureDate(date)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-white"
          placeholderText="Select Date"
        />
        <button
          onClick={addFixture}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Add Fixture
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Edit Fixtures
        </h2>
        {fixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="mb-4 p-4 border rounded-md bg-gray-800 text-white"
          >
            <div className="mb-2">
              {fixture.homeTeam} vs {fixture.awayTeam} on{" "}
              {new Date(fixture.date).toLocaleDateString()}
            </div>
            <input
              type="number"
              value={fixture.homeGoals || ""}
              onChange={(e) =>
                setFixtures((prevFixtures) =>
                  prevFixtures.map((f) =>
                    f.id === fixture.id
                      ? { ...f, homeGoals: e.target.value }
                      : f
                  )
                )
              }
              placeholder="Home Team Goals"
              className="w-full p-2 mb-2 border rounded-md bg-gray-700 text-white"
            />
            <input
              type="number"
              value={fixture.awayGoals || ""}
              onChange={(e) =>
                setFixtures((prevFixtures) =>
                  prevFixtures.map((f) =>
                    f.id === fixture.id
                      ? { ...f, awayGoals: e.target.value }
                      : f
                  )
                )
              }
              placeholder="Away Team Goals"
              className="w-full p-2 mb-2 border rounded-md bg-gray-700 text-white"
            />
            <button
              onClick={() =>
                updateFixtureResult(
                  fixture.id,
                  Number(fixture.homeGoals),
                  Number(fixture.awayGoals)
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Result
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminPage;
