import { NextResponse } from 'next/server';
import { Player } from '../../types/player';

const BALL_DONT_LIE_API = 'https://www.balldontlie.io/api/v1';

// Mock data for development/testing
const mockPlayers: Player[] = [
  {
    id: 1,
    first_name: "LaMelo",
    last_name: "Ball",
    position: "PG",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 58,
      minutes_per_game: 35.2,
      points_per_game: 23.3,
      rebounds_per_game: 6.4,
      assists_per_game: 8.4,
      field_goal_percentage: 0.411,
      three_point_percentage: 0.376
    }
  },
  {
    id: 2,
    first_name: "Miles",
    last_name: "Bridges",
    position: "SF",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 65,
      minutes_per_game: 35.5,
      points_per_game: 20.2,
      rebounds_per_game: 7.0,
      assists_per_game: 3.8,
      field_goal_percentage: 0.491,
      three_point_percentage: 0.349
    }
  },
  {
    id: 3,
    first_name: "Terry",
    last_name: "Rozier",
    position: "SG",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 63,
      minutes_per_game: 35.3,
      points_per_game: 21.1,
      rebounds_per_game: 4.1,
      assists_per_game: 5.1,
      field_goal_percentage: 0.425,
      three_point_percentage: 0.359
    }
  },
  {
    id: 4,
    first_name: "Brandon",
    last_name: "Miller",
    position: "SF",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 55,
      minutes_per_game: 32.5,
      points_per_game: 16.8,
      rebounds_per_game: 4.2,
      assists_per_game: 2.3,
      field_goal_percentage: 0.438,
      three_point_percentage: 0.365
    }
  },
  {
    id: 5,
    first_name: "Gordon",
    last_name: "Hayward",
    position: "SF",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 48,
      minutes_per_game: 31.8,
      points_per_game: 14.5,
      rebounds_per_game: 4.7,
      assists_per_game: 4.6,
      field_goal_percentage: 0.468,
      three_point_percentage: 0.362
    }
  },
  {
    id: 6,
    first_name: "Mark",
    last_name: "Williams",
    position: "C",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 42,
      minutes_per_game: 28.5,
      points_per_game: 12.7,
      rebounds_per_game: 9.7,
      assists_per_game: 1.2,
      field_goal_percentage: 0.632,
      three_point_percentage: 0.000
    }
  },
  {
    id: 7,
    first_name: "P.J.",
    last_name: "Washington",
    position: "PF",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 58,
      minutes_per_game: 31.2,
      points_per_game: 13.6,
      rebounds_per_game: 5.3,
      assists_per_game: 2.2,
      field_goal_percentage: 0.445,
      three_point_percentage: 0.328
    }
  },
  {
    id: 8,
    first_name: "Nick",
    last_name: "Richards",
    position: "C",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 45,
      minutes_per_game: 18.5,
      points_per_game: 8.2,
      rebounds_per_game: 6.4,
      assists_per_game: 0.8,
      field_goal_percentage: 0.675,
      three_point_percentage: 0.000
    }
  },
  {
    id: 9,
    first_name: "Cody",
    last_name: "Martin",
    position: "SF",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 40,
      minutes_per_game: 24.8,
      points_per_game: 5.5,
      rebounds_per_game: 3.8,
      assists_per_game: 2.0,
      field_goal_percentage: 0.432,
      three_point_percentage: 0.345
    }
  },
  {
    id: 10,
    first_name: "JT",
    last_name: "Thor",
    position: "PF",
    team: {
      id: 1,
      abbreviation: "CHA",
      city: "Charlotte",
      conference: "East",
      division: "Southeast",
      full_name: "Charlotte Hornets",
      name: "Hornets"
    },
    stats: {
      games_played: 52,
      minutes_per_game: 14.2,
      points_per_game: 4.8,
      rebounds_per_game: 2.9,
      assists_per_game: 0.6,
      field_goal_percentage: 0.418,
      three_point_percentage: 0.312
    }
  }
];

export async function GET() {
  try {
    // First, get the Charlotte Hornets team ID
    const teamsResponse = await fetch(`${BALL_DONT_LIE_API}/teams`);
    
    if (!teamsResponse.ok) {
      console.warn('Failed to fetch teams data, using mock data instead');
      return NextResponse.json(mockPlayers);
    }

    const teamsData = await teamsResponse.json();
    const hornets = teamsData.data.find((team: any) => team.full_name === 'Charlotte Hornets');
    
    if (!hornets) {
      console.warn('Charlotte Hornets team not found, using mock data instead');
      return NextResponse.json(mockPlayers);
    }

    // Get players for the Hornets
    const playersResponse = await fetch(`${BALL_DONT_LIE_API}/players?team_ids[]=${hornets.id}`);
    
    if (!playersResponse.ok) {
      console.warn('Failed to fetch players data, using mock data instead');
      return NextResponse.json(mockPlayers);
    }

    const playersData = await playersResponse.json();

    // Get season averages for each player
    const playersWithStats = await Promise.all(
      playersData.data.map(async (player: any) => {
        const statsResponse = await fetch(
          `${BALL_DONT_LIE_API}/season_averages?player_ids[]=${player.id}&season=2023`
        );
        
        if (!statsResponse.ok) {
          return {
            ...player,
            stats: {
              games_played: 0,
              minutes_per_game: 0,
              points_per_game: 0,
              rebounds_per_game: 0,
              assists_per_game: 0,
              field_goal_percentage: 0,
              three_point_percentage: 0,
            },
          };
        }

        const statsData = await statsResponse.json();
        
        return {
          ...player,
          stats: statsData.data[0] || {
            games_played: 0,
            minutes_per_game: 0,
            points_per_game: 0,
            rebounds_per_game: 0,
            assists_per_game: 0,
            field_goal_percentage: 0,
            three_point_percentage: 0,
          },
        };
      })
    );

    return NextResponse.json(playersWithStats);
  } catch (error) {
    console.error('Error fetching player data:', error);
    // Return mock data in case of any error
    return NextResponse.json(mockPlayers);
  }
} 