# JDRAID - Raid Shadow Legends Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive companion application for Raid: Shadow Legends players featuring Hero Finder, Performance Tracker, and Multi-Account Management.

## Features

### 🦸 Hero Finder
- **Comprehensive Hero Database**: Up-to-date database with all RSL heroes
- **Advanced Search**: Find heroes by name, faction, role, and affinity
- **Detailed Ratings**: Heroes rated separately for:
  - Campaign
  - Arena (PvP)
  - Dungeons
  - Boss Fights
  - Clan Boss
  - Overworld Boss
  - Overall Rating
- **Hero Information**:
  - Base stats
  - Skills and abilities
  - Build guides
  - Synergies and counters

### 📊 Performance Tracker
- **Account Progress Tracking**:
  - Campaign progression
  - Arena rank and points
  - Dungeon levels
  - Clan Boss stages
- **Hero Management**:
  - Track owned heroes
  - Monitor star ratings and levels
  - Record gear scores
  - Track skill levels and masteries
- **Resource Management**:
  - Silver and gold tracking
  - Shard inventory (Ancient, Void, Sacred, Fragment)
  - Resource usage history
- **Goal Setting**:
  - Create and track goals
  - Monitor progress
  - Set target dates
- **Focus Areas**:
  - Set priorities for what to focus on
  - Get AI-powered recommendations
  - Track achievement milestones

### 👥 Multi-Account Support
- **Multiple Account Management**:
  - Create and manage multiple accounts
  - Set default account
  - Independent progress tracking per account
  - Easy switching between accounts
- **Shared Features**:
  - Access hero database across all accounts
  - Share performance insights

### 🤖 Automation Features
- **Performance Recommendations**:
  - AI-generated suggestions based on account progress
  - Priority-based recommendations
  - Automated progress analysis
- **Activity Logging**:
  - Automatic progress logging
  - Performance history
  - Achievement tracking

## Tech Stack

### Backend
- **Node.js** + Express.js
- **MongoDB** for data persistence
- **JWT** for authentication
- **Mongoose** for data modeling

### Frontend (Coming Soon)
- React.js
- Redux for state management
- Material-UI components
- Responsive design

## Project Structure

```
JDRAID/
├── models/
│   ├── User.js
│   ├── Hero.js
│   ├── Account.js
│   └── PerformanceLog.js
├── routes/
│   ├── authRoutes.js
│   ├── heroRoutes.js
│   ├── accountRoutes.js
│   └── performanceRoutes.js
├── server.js
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/charAnreddy1237/JDRAID.git
cd JDRAID
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jdraid
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

5. Start MongoDB:
```bash
mongod
```

6. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Heroes
- `GET /api/heroes` - Get all heroes with filtering
- `GET /api/heroes/:id` - Get hero details
- `GET /api/heroes/search/query?q=query` - Search heroes
- `GET /api/heroes/filter/rating?minRating=8&category=arena` - Filter by rating

### Accounts
- `GET /api/accounts/user/:userId` - Get all user accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/:accountId` - Get account details
- `PUT /api/accounts/:accountId` - Update account
- `POST /api/accounts/:accountId/heroes` - Add hero to account
- `PUT /api/accounts/:accountId/progress` - Update progress
- `DELETE /api/accounts/:accountId` - Delete account

### Performance
- `POST /api/performance` - Log performance entry
- `GET /api/performance/account/:accountId` - Get performance logs
- `GET /api/performance/summary/:accountId` - Get account summary
- `GET /api/performance/recommendations/:accountId` - Get recommendations

## Usage Examples

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"player1","email":"player@example.com","password":"password123"}'
```

### Search for Heroes
```bash
curl http://localhost:5000/api/heroes?search=Galek&rarity=Rare
```

### Get High-Rated Arena Heroes
```bash
curl http://localhost:5000/api/heroes/filter/rating?minRating=8&category=arena
```

### Create an Account
```bash
curl -X POST http://localhost:5000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_id","accountName":"Main Account","accountLevel":50}'
```

## Roadmap

- [ ] Frontend React application
- [ ] User dashboard
- [ ] Real-time notifications
- [ ] Hero building calculator
- [ ] Gear optimization suggestions
- [ ] Community features
- [ ] Mobile app (React Native)
- [ ] Integration with RSL API (if available)
- [ ] Advanced analytics and statistics
- [ ] Raid automater tool integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Disclaimer

JDRAID is a fan-made companion application and is not affiliated with Plarium or Raid: Shadow Legends. All trademarks and copyrights are the property of their respective owners.
