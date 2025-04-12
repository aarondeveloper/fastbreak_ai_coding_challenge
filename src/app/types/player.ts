export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  stats: {
    games_played: number;
    minutes_per_game: number;
    points_per_game: number;
    rebounds_per_game: number;
    assists_per_game: number;
    field_goal_percentage: number;
    three_point_percentage: number;
  };
} 