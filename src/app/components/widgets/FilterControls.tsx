import { Player } from '@/app/types/player';

interface FilterControlsProps {
  players: Player[];
  selectedPlayer: Player | null;
  onPlayerSelect: (player: Player | null) => void;
  viewMode: 'all' | 'single' | 'compare';
  onViewModeChange: (mode: 'all' | 'single' | 'compare') => void;
  comparedPlayers: Player[];
  onComparePlayersChange: (players: Player[]) => void;
}

export default function FilterControls({
  players,
  selectedPlayer,
  onPlayerSelect,
  viewMode,
  onViewModeChange,
  comparedPlayers,
  onComparePlayersChange,
}: FilterControlsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* View Mode Selection */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            View Mode
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onViewModeChange('all')}
              className={`px-4 py-2 rounded ${
                viewMode === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Players
            </button>
            <button
              onClick={() => onViewModeChange('single')}
              className={`px-4 py-2 rounded ${
                viewMode === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Single Player
            </button>
            <button
              onClick={() => onViewModeChange('compare')}
              className={`px-4 py-2 rounded ${
                viewMode === 'compare'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Compare Players
            </button>
          </div>
        </div>

        {/* Player Selection */}
        {viewMode === 'single' && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Player
            </label>
            <select
              value={selectedPlayer?.id || ''}
              onChange={(e) => {
                const player = players.find((p) => p.id === parseInt(e.target.value));
                onPlayerSelect(player || null);
              }}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.first_name} {player.last_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Player Comparison Selection */}
        {viewMode === 'compare' && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Players to Compare
            </label>
            <select
              multiple
              value={comparedPlayers.map((p) => p.id.toString())}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions);
                const selectedPlayers = selectedOptions
                  .map((option) => players.find((p) => p.id === parseInt(option.value)))
                  .filter((p): p is Player => p !== undefined);
                onComparePlayersChange(selectedPlayers);
              }}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              size={4}
            >
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.first_name} {player.last_name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Hold Ctrl/Cmd to select multiple players
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 