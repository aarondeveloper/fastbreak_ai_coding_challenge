'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '@/app/components/DashboardLayout';

interface Game {
  id: number;
  date: string;
  datetime: string;
  status: string;
  opponent: {
    name: string;
    city: string;
    abbreviation: string;
  };
  isHomeGame: boolean;
  hornetsScore: number;
  opponentScore: number;
  hornetsWon: boolean;
}

interface SeasonRecord {
  wins: number;
  losses: number;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [record, setRecord] = useState<SeasonRecord>({ wins: 0, losses: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        console.log('Fetching games...');
        const response = await fetch('/api/games');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `Failed to fetch games: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Games data received:', data);
        
        if (!data.games || !Array.isArray(data.games)) {
          throw new Error('Invalid games data format');
        }
        
        setGames(data.games);
        setRecord(data.seasonRecord);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching games');
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <div className="text-xl text-gray-600">Loading games...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Games</h2>
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Charlotte Hornets Games</h1>
          <div className="text-gray-600 dark:text-gray-400">2024-25 Season</div>
        </div>

        {/* Season Record Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Season Record</div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">{record.wins} - {record.losses}</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Win Percentage: {((record.wins / (record.wins + record.losses)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map(game => (
            <div key={game.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(game.date), 'MMM d, yyyy')}
                  </div>
                  <div className={`px-2 py-1 rounded text-sm font-medium ${
                    game.hornetsWon ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {game.hornetsWon ? 'W' : 'L'}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="font-bold text-gray-900 dark:text-white">CHA</div>
                    <div className="mx-2 text-gray-500 dark:text-gray-400">vs</div>
                    <div className="font-bold text-gray-900 dark:text-white">{game.opponent.abbreviation}</div>
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {game.hornetsScore} - {game.opponentScore}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {game.isHomeGame ? 'Home' : 'Away'} • {game.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 