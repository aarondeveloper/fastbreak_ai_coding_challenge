# Fastbreak AI Player Insights

A modern web application for tracking and analyzing Charlotte Hornets player statistics and game data.

## Features

- **Player Statistics Dashboard**
  - Real-time player performance metrics
  - Shooting efficiency analysis
  - Performance radar charts
  - Points distribution visualization

- **Game Tracking**
  - Current season game schedule
  - Win/loss records
  - Game-by-game statistics
  - Home and away game tracking

- **Authentication**
  - Secure login with Auth0
  - User profile management
  - Protected routes

## Tech Stack

- **Frontend**
  - Next.js 15.3.0
  - React 19
  - TypeScript
  - Tailwind CSS
  - Recharts for data visualization

- **Authentication**
  - Auth0 Next.js SDK

- **API Integration**
  - Ball Don't Lie API for NBA statistics

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Auth0 account
- Ball Don't Lie API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fastbreak-ai-player-insights.git
   cd fastbreak-ai-player-insights
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   AUTH0_SECRET='your-auth0-secret'
   AUTH0_ISSUER_BASE_URL='your-auth0-domain'
   AUTH0_CLIENT_ID='your-auth0-client-id'
   AUTH0_CLIENT_SECRET='your-auth0-client-secret'
   BALL_DONT_LIE_API_KEY='your-api-key'
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is configured for deployment on Vercel. To deploy:

1. Push your changes to the main branch
2. Vercel will automatically deploy the changes
3. Update environment variables in Vercel dashboard

## Environment Variables

- `AUTH0_SECRET`: Auth0 session secret
- `AUTH0_ISSUER_BASE_URL`: Auth0 domain
- `AUTH0_CLIENT_ID`: Auth0 application client ID
- `AUTH0_CLIENT_SECRET`: Auth0 application client secret
- `BALL_DONT_LIE_API_KEY`: API key for Ball Don't Lie API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Ball Don't Lie API](https://www.balldontlie.io/) for NBA statistics
- [Auth0](https://auth0.com/) for authentication
- [Next.js](https://nextjs.org/) for the framework
- [Recharts](https://recharts.org/) for data visualization
