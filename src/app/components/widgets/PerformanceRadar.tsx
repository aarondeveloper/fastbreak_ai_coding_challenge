import { Player } from '../../types/player';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceRadarProps {
  players: Player[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

const PerformanceRadar: React.FC<PerformanceRadarProps> = ({ players }) => {
  const metrics = [
    'points_per_game',
    'rebounds_per_game',
    'assists_per_game',
    'steals_per_game',
    'blocks_per_game',
  ];

  const data = metrics.map((metric) => ({
    metric: metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    ...players.reduce((acc, player) => ({
      ...acc,
      [player.first_name + ' ' + player.last_name]: player[metric as keyof Player],
    }), {}),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis />
        {players.map((player, index) => (
          <Radar
            key={player.id}
            name={`${player.first_name} ${player.last_name}`}
            dataKey={`${player.first_name} ${player.last_name}`}
            stroke={COLORS[index % COLORS.length]}
            fill={COLORS[index % COLORS.length]}
            fillOpacity={0.6}
          />
        ))}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceRadar; 