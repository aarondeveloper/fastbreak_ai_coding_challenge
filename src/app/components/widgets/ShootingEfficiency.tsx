import { Player } from '../../types/player';
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
    'Field Goal %': player.field_goal_percentage,
    '3PT %': player.three_point_percentage,
    'Free Throw %': player.free_throw_percentage,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Field Goal %" fill="#8884d8" />
        <Bar dataKey="3PT %" fill="#82ca9d" />
        <Bar dataKey="Free Throw %" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ShootingEfficiency; 