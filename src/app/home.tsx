import Head from "next/head";
import { countries } from "country-flag-icons";
import { DE } from "country-flag-icons/react/3x2";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Head>
        <title>Football Scores</title>
      </Head>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 p-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Premier League</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/france-flag.svg')] bg-cover"></span>
              <span>Ligue 1</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/germany-flag.svg')] bg-cover"></span>
              <span>Bundesliga</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>La Liga</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Serie A</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Efbet League</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>MLS</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Saudi Pro League</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Champions League</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Europa League</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>Conference League</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>World Cup</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-4 h-4 bg-[url('/path/to/england-flag.svg')] bg-cover"></span>
              <span>European Championship</span>
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
    </div>
  );
}
