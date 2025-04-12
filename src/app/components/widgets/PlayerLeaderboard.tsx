import { Player } from '../../types/player';

interface PlayerLeaderboardProps {
  players: Player[];
}

export default function PlayerLeaderboard({ players }: PlayerLeaderboardProps) {
  // Get top 5 players for each category
  const getTopPlayers = (category: keyof Player['stats'], label: string) => {
    const sortedPlayers = [...players].sort((a, b) => b.stats[category] - a.stats[category]);
    const top5 = sortedPlayers.slice(0, 5);

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{label}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Player</th>
                <th className="px-4 py-2 text-right">{label}</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((player, index) => (
                <tr 
                  key={player.id}
                  className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
                >
                  <td className="px-4 py-2">
                    {player.first_name} {player.last_name}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {player.stats[category].toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {getTopPlayers('points_per_game', 'Points Per Game')}
      {getTopPlayers('rebounds_per_game', 'Rebounds Per Game')}
      {getTopPlayers('assists_per_game', 'Assists Per Game')}
      {getTopPlayers('field_goal_percentage', 'Field Goal %')}
      {getTopPlayers('minutes_per_game', 'Minutes Per Game')}
    </div>
  );
} 