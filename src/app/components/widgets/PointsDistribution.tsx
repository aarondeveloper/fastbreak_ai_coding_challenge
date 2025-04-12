import { Player } from '@/app/types/player';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';

interface PointsDistributionProps {
  players: Player[];
}

export default function PointsDistribution({ players }: PointsDistributionProps) {
  const formatPlayerName = (firstName: string, lastName: string) => {
    const formattedFirstName = firstName.length > 2 
      ? `${firstName.charAt(0)}.`
      : firstName;
    return `${formattedFirstName} ${lastName}`;
  };

  const data = players
    .sort((a, b) => b.stats.points_per_game - a.stats.points_per_game)
    .map(player => ({
      name: formatPlayerName(player.first_name, player.last_name),
      points: player.stats.points_per_game,
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
        <YAxis>
          <Label
            value="Points Per Game"
            angle={-90}
            position="insideLeft"
            offset={-10}
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <Tooltip />
        <Bar dataKey="points" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
} 