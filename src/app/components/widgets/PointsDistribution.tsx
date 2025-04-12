import { Player } from '../../types/player';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PointsDistributionProps {
  players: Player[];
}

export default function PointsDistribution({ players }: PointsDistributionProps) {
  const data = players
    .sort((a, b) => b.stats.points_per_game - a.stats.points_per_game)
    .map(player => ({
      name: `${player.first_name} ${player.last_name}`,
      points: player.stats.points_per_game,
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
        />
        <YAxis 
          label={{ value: 'Points Per Game', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Bar dataKey="points" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
} 