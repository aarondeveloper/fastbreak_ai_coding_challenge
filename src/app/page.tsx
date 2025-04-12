'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import { Player } from './types/player';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        setPlayers(data);
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  const pointsData = players.map(player => ({
    name: `${player.first_name} ${player.last_name}`,
    points: player.stats.points_per_game,
  }));

  const shootingData = players.map(player => ({
    name: `${player.first_name} ${player.last_name}`,
    'FG%': player.stats.field_goal_percentage * 100,
    '3P%': player.stats.three_point_percentage * 100,
  }));

  const radarData = selectedPlayer ? [
    { subject: 'Points', A: selectedPlayer.stats.points_per_game },
    { subject: 'Rebounds', A: selectedPlayer.stats.rebounds_per_game },
    { subject: 'Assists', A: selectedPlayer.stats.assists_per_game },
    { subject: 'FG%', A: selectedPlayer.stats.field_goal_percentage * 100 },
    { subject: '3P%', A: selectedPlayer.stats.three_point_percentage * 100 },
    { subject: 'Minutes', A: selectedPlayer.stats.minutes_per_game },
  ] : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Points Per Game</h2>
            <BarChart width={500} height={300} data={pointsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Shooting Efficiency</h2>
            <BarChart width={500} height={300} data={shootingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="FG%" fill="#82ca9d" />
              <Bar dataKey="3P%" fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        {selectedPlayer && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
              {selectedPlayer.first_name} {selectedPlayer.last_name} - Performance Radar
            </h2>
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 30]} />
              <Radar
                name="Stats"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
