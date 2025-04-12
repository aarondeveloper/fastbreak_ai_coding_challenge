import { Player } from '@/app/types/player';

interface PlayerLeaderboardProps {
  players: Player[];
}

export default function PlayerLeaderboard({ players }: PlayerLeaderboardProps) {
  const formatPlayerName = (firstName: string, lastName: string) => {
    // If first name is longer than 2 characters, abbreviate it
    const formattedFirstName = firstName.length > 2 
      ? `${firstName.charAt(0)}.`
      : firstName;
    return `${formattedFirstName} ${lastName}`;
  };

  const getPlayerStats = (category: keyof Player['stats'], label: string, isPercentage: boolean = false) => {
    const sortedPlayers = [...players].sort((a, b) => b.stats[category] - a.stats[category]);

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
              {sortedPlayers.map((player, index) => (
                <tr 
                  key={player.id}
                  className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {formatPlayerName(player.first_name, player.last_name)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {isPercentage 
                      ? `${(player.stats[category] * 100).toFixed(1)}%`
                      : player.stats[category].toFixed(1)}
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
      {getPlayerStats('points_per_game', 'Points Per Game')}
      {getPlayerStats('rebounds_per_game', 'Rebounds Per Game')}
      {getPlayerStats('assists_per_game', 'Assists Per Game')}
      {getPlayerStats('field_goal_percentage', 'Field Goal %', true)}
      {getPlayerStats('minutes_per_game', 'Minutes Per Game')}
    </div>
  );
} 