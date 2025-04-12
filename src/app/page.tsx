'use client';

import { useEffect, useState } from 'react';
import { Player } from '@/app/types/player';
import DashboardLayout from '@/app/components/DashboardLayout';
import PlayerLeaderboard from '@/app/components/widgets/PlayerLeaderboard';
import ShootingEfficiency from '@/app/components/widgets/ShootingEfficiency';
import PerformanceRadar from '@/app/components/widgets/PerformanceRadar';
import PointsDistribution from '@/app/components/widgets/PointsDistribution';
import FilterControls from '@/app/components/widgets/FilterControls';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'single' | 'compare'>('all');
  const [comparedPlayers, setComparedPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        setPlayers(data);
        setFilteredPlayers(data);
        if (data.length > 0) {
          setSelectedPlayer(data[0]);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const getDisplayedPlayers = () => {
    switch (viewMode) {
      case 'single':
        return selectedPlayer ? [selectedPlayer] : [];
      case 'compare':
        return comparedPlayers;
      default:
        return filteredPlayers;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  const displayedPlayers = getDisplayedPlayers();
  const showStats = displayedPlayers.length > 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <FilterControls
          players={players}
          selectedPlayer={selectedPlayer}
          onPlayerSelect={setSelectedPlayer}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          comparedPlayers={comparedPlayers}
          onComparePlayersChange={setComparedPlayers}
          onFilteredPlayersChange={setFilteredPlayers}
        />

        {showStats ? (
          <>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6">Player Statistics</h2>
              <PlayerLeaderboard players={displayedPlayers} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Points Per Game</h2>
                <PointsDistribution players={displayedPlayers} />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Shooting Efficiency</h2>
                <ShootingEfficiency players={displayedPlayers} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Performance Radar</h2>
              <PerformanceRadar players={displayedPlayers} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            Please select a player to view their statistics.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
