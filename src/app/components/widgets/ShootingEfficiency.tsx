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
  Label
} from 'recharts';

interface ShootingEfficiencyProps {
  players: Player[];
}

const ShootingEfficiency: React.FC<ShootingEfficiencyProps> = ({ players }) => {
  const formatPlayerName = (firstName: string, lastName: string) => {
    const formattedFirstName = firstName.length > 2 
      ? `${firstName.charAt(0)}.`
      : firstName;
    return `${formattedFirstName} ${lastName}`;
  };

  const data = players.map((player) => ({
    name: formatPlayerName(player.first_name, player.last_name),
    'Field Goal %': (player.stats.field_goal_percentage * 100).toFixed(1),
    '3PT %': (player.stats.three_point_percentage * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 30,
          bottom: 70
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={120}
          interval={0}
          tick={{ fontSize: 14 }}
        />
        <YAxis domain={[0, 100]}>
          <Label
            value="Percentage (%)"
            angle={-90}
            position="insideLeft"
            offset={-10}
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Field Goal %" fill="#8884d8" />
        <Bar dataKey="3PT %" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ShootingEfficiency; 