import { NextResponse } from 'next/server';

const BALL_DONT_LIE_API = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALL_DONT_LIE_API_KEY;
const HORNETS_TEAM_ID = 30; // Hardcoded Hornets team ID to avoid extra API call

interface Game {
  id: number;
  date: string;
  datetime: string;
  status: string;
  opponent: {
    name: string;
    city: string;
    abbreviation: string;
  };
  isHomeGame: boolean;
  hornetsScore: number;
  opponentScore: number;
  hornetsWon: boolean;
}

interface BallDontLieTeam {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

interface BallDontLieGame {
  id: number;
  date: string;
  datetime: string;
  season: number;
  status: string;
  period: number;
  time: string;
  postseason: boolean;
  home_team_score: number;
  visitor_team_score: number;
  home_team: BallDontLieTeam;
  visitor_team: BallDontLieTeam;
}

interface BallDontLieResponse {
  data: BallDontLieGame[];
  meta: {
    next_cursor: number | null;
    per_page: number;
  };
}

async function fetchAllGames(baseUrl: string, headers: HeadersInit): Promise<BallDontLieGame[]> {
  let allGames: BallDontLieGame[] = [];
  let nextCursor: number | null = null;
  
  do {
    const url: string = nextCursor 
      ? `${baseUrl}&cursor=${nextCursor}`
      : baseUrl;
    
    console.log('Fetching games from:', url);
    const response: Response = await fetch(url, { headers });

    if (!response.ok) {
      console.error('Games API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch games: ${response.status} ${response.statusText}`);
    }

    const data: BallDontLieResponse = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid games data format:', data);
      throw new Error('Invalid games data format');
    }

    allGames = [...allGames, ...data.data];
    nextCursor = data.meta?.next_cursor || null;
    
    console.log(`Fetched ${data.data.length} games, total: ${allGames.length}, next cursor: ${nextCursor}`);
  } while (nextCursor);

  return allGames;
}

export async function GET() {
  console.log('API Key present:', !!API_KEY);
  
  if (!API_KEY) {
    console.error('BALL_DONT_LIE_API_KEY is not set');
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  const headers = {
    'Authorization': API_KEY,
    'Accept': 'application/json'
  };

  try {
    // Build query parameters for current season games (2024-25 season)
    const queryParams = new URLSearchParams({
      'start_date': '2024-10-24', // NBA 2024-25 season start date
      'end_date': new Date().toISOString().split('T')[0], // Today's date
      'team_ids[]': HORNETS_TEAM_ID.toString(),
      'per_page': '100'
    });

    const gamesUrl = `${BALL_DONT_LIE_API}/games?${queryParams.toString()}`;
    console.log('Fetching games from URL:', gamesUrl);
    
    const allGames = await fetchAllGames(gamesUrl, headers);
    console.log(`Total games fetched: ${allGames.length}`);

    // Transform and sort games by date
    const games: Game[] = allGames.map((game: BallDontLieGame) => {
      const isHomeGame = game.home_team.id === HORNETS_TEAM_ID;
      const opponent = isHomeGame ? game.visitor_team : game.home_team;
      const hornetsScore = isHomeGame ? game.home_team_score : game.visitor_team_score;
      const opponentScore = isHomeGame ? game.visitor_team_score : game.home_team_score;

      return {
        id: game.id,
        date: game.date,
        datetime: game.datetime,
        status: game.status,
        opponent: {
          name: opponent.name,
          city: opponent.city,
          abbreviation: opponent.abbreviation
        },
        isHomeGame,
        hornetsScore,
        opponentScore,
        hornetsWon: hornetsScore > opponentScore
      };
    }).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

    // Calculate season record
    const seasonRecord = {
      wins: games.filter(game => game.hornetsWon).length,
      losses: games.filter(game => !game.hornetsWon).length
    };

    console.log(`Returning ${games.length} games with record: ${seasonRecord.wins}-${seasonRecord.losses}`);
    return NextResponse.json({ games, seasonRecord });

  } catch (error) {
    console.error('Error in /api/games:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 