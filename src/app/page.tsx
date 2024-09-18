import React from "react";
import MyNavbar from "@/components/navbar";
import SignIn from "@/app/sign-in/page";
export default function Home() {
  return (
    <>
      <MyNavbar /> {/* Include the Navbar component */}
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/4 p-4">
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Premier League</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/france-flag.svg')] bg-cover"></span>
                <button>Ligue 1</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/germany-flag.svg')] bg-cover"></span>
                <button>Bundesliga</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>La Liga</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Serie A</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Efbet League</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>MLS</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Saudi Pro League</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Champions League</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Europa League</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>Conference League</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>World Cup</button>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
                <button>European Championship</button>
              </li>
              {/* Add more leagues as needed */}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="w-3/4 p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-4">
                <button className="py-1 px-3 bg-gray-700 rounded">ALL</button>
                <button className="py-1 px-3 bg-red-700 rounded">LIVE</button>
                <button className="py-1 px-3 bg-gray-700 rounded">
                  FINISHED
                </button>
                <button className="py-1 px-3 bg-gray-700 rounded">
                  SCHEDULED
                </button>
              </div>
              <div className="bg-gray-700 py-1 px-3 rounded">
                <span>27/08 TU</span>
              </div>
            </div>

            {/* Match List */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    EUROPE: Champions League - Qualification
                  </h2>
                  <span className="text-sm">Draw</span>
                </div>
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span>22:00 Galatasaray (Tur) vs Young Boys (Sui)</span>
                    <button className="bg-gray-700 py-1 px-2 rounded">
                      PREVIEW
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>22:00 Salzburg (Aut) vs Dyn. Kyiv (Ukr)</span>
                    <button className="bg-gray-700 py-1 px-2 rounded">
                      PREVIEW
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>22:00 Sparta Prague (Cze) vs Malmo FF (Swe)</span>
                    <button className="bg-gray-700 py-1 px-2 rounded">
                      PREVIEW
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">SPAIN: LaLiga</h2>
                  <span className="text-sm">Standings</span>
                </div>
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span>20:00 Mallorca vs Sevilla</span>
                    <button className="bg-gray-700 py-1 px-2 rounded">
                      PREVIEW
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>22:30 Rayo Vallecano vs Barcelona</span>
                    <button className="bg-gray-700 py-1 px-2 rounded">
                      PREVIEW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}
