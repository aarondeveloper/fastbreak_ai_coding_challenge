import { Player } from '@/app/types/player';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
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
    'field_goal_percentage',
    'three_point_percentage',
  ] as const;

  type MetricKey = typeof metrics[number];

  const data = metrics.map((metric) => {
    const formattedMetric = metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const isPercentage = metric.includes('percentage');
    
    return {
      metric: formattedMetric,
      ...players.reduce((acc, player) => ({
        ...acc,
        [player.first_name + ' ' + player.last_name]: isPercentage 
          ? player.stats[metric as keyof Player['stats']] * 100 
          : player.stats[metric as keyof Player['stats']],
      }), {}),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis />
        <Tooltip 
          formatter={(value: number) => {
            const isPercentage = typeof value === 'number' && value <= 100 && value >= 0;
            return isPercentage ? `${value.toFixed(1)}%` : value.toFixed(1);
          }}
        />
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