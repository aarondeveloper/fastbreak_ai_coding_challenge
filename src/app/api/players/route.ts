import { NextResponse } from 'next/server';
import { Player } from '../../types/player';

// Mock current Hornets roster with realistic stats
const MOCK_PLAYERS: Player[] = [
  {
    id: 1,
    first_name: "Brandon",
    last_name: "Miller",
    position: "SF",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 58,
      minutes_per_game: 32.8,
      points_per_game: 16.2,
      rebounds_per_game: 4.1,
      assists_per_game: 2.3,
      field_goal_percentage: 0.438,
      three_point_percentage: 0.371
    }
  },
  {
    id: 2,
    first_name: "LaMelo",
    last_name: "Ball",
    position: "PG",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 22,
      minutes_per_game: 32.4,
      points_per_game: 23.9,
      rebounds_per_game: 5.1,
      assists_per_game: 8.0,
      field_goal_percentage: 0.441,
      three_point_percentage: 0.385
    }
  },
  {
    id: 3,
    first_name: "Miles",
    last_name: "Bridges",
    position: "SF",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 37,
      minutes_per_game: 33.1,
      points_per_game: 21.5,
      rebounds_per_game: 7.2,
      assists_per_game: 3.2,
      field_goal_percentage: 0.462,
      three_point_percentage: 0.354
    }
  },
  {
    id: 4,
    first_name: "Grant",
    last_name: "Williams",
    position: "PF",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 44,
      minutes_per_game: 30.5,
      points_per_game: 13.1,
      rebounds_per_game: 4.8,
      assists_per_game: 2.4,
      field_goal_percentage: 0.451,
      three_point_percentage: 0.375
    }
  },
  {
    id: 5,
    first_name: "Nick",
    last_name: "Richards",
    position: "C",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 51,
      minutes_per_game: 18.2,
      points_per_game: 8.8,
      rebounds_per_game: 6.4,
      assists_per_game: 0.8,
      field_goal_percentage: 0.682,
      three_point_percentage: 0.000
    }
  },
  {
    id: 6,
    first_name: "Tre",
    last_name: "Mann",
    position: "PG",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 15,
      minutes_per_game: 17.5,
      points_per_game: 8.7,
      rebounds_per_game: 2.1,
      assists_per_game: 2.8,
      field_goal_percentage: 0.425,
      three_point_percentage: 0.348
    }
  },
  {
    id: 7,
    first_name: "Davis",
    last_name: "Bertans",
    position: "PF",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 15,
      minutes_per_game: 14.8,
      points_per_game: 7.2,
      rebounds_per_game: 2.1,
      assists_per_game: 0.8,
      field_goal_percentage: 0.438,
      three_point_percentage: 0.421
    }
  },
  {
    id: 8,
    first_name: "Cody",
    last_name: "Martin",
    position: "SF",
    team: {
      id: 30,
      name: "Hornets",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      abbreviation: "CHA",
      full_name: "Charlotte Hornets"
    },
    stats: {
      games_played: 31,
      minutes_per_game: 21.5,
      points_per_game: 5.2,
      rebounds_per_game: 3.8,
      assists_per_game: 1.8,
      field_goal_percentage: 0.412,
      three_point_percentage: 0.328
    }
  }
];

export async function GET() {
  try {
    // Sort players by points per game
    const players = [...MOCK_PLAYERS].sort((a, b) => b.stats.points_per_game - a.stats.points_per_game);
    console.log(`Returning ${players.length} mock players`);
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error in /api/players:', error);
    throw error;
  }
} 