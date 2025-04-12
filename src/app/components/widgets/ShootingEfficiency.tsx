import { Player } from '@/app/types/player';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ShootingEfficiencyProps {
  players: Player[];
}

const ShootingEfficiency: React.FC<ShootingEfficiencyProps> = ({ players }) => {
  const data = players.map((player) => ({
    name: `${player.first_name} ${player.last_name}`,
    'Field Goal %': (player.stats.field_goal_percentage * 100).toFixed(1),
    '3PT %': (player.stats.three_point_percentage * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="Field Goal %" fill="#8884d8" />
        <Bar dataKey="3PT %" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ShootingEfficiency; 