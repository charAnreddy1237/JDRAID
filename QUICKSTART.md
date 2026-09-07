# Quick Start Guide - JDRAID

Get up and running with JDRAID in minutes!

## Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) OR use Docker
- **Git** - [Download](https://git-scm.com/)

## Method 1: Automated Setup (Recommended)

### Step 1: Clone the Repository
```bash
git clone https://github.com/charAnreddy1237/JDRAID.git
cd JDRAID
```

### Step 2: Run Setup Script
```bash
# On macOS/Linux
chmod +x setup.sh
./setup.sh

# On Windows
# Run the commands manually from setup.sh
npm install
copy .env.example .env
```

### Step 3: Configure Environment Variables
Edit `.env` file with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/jdraid
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

### Step 4: Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Docker
docker run -d -p 27017:27017 --name jdraid-mongo mongo:5.0
```

### Step 5: Seed the Database (Optional)
```bash
node seeds/seedHeroes.js
```

### Step 6: Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

**Server is running at:** `http://localhost:5000`

---

## Method 2: Docker Setup (Easiest)

### Step 1: Clone the Repository
```bash
git clone https://github.com/charAnreddy1237/JDRAID.git
cd JDRAID
```

### Step 2: Start with Docker Compose
```bash
docker-compose up
```

This will start both MongoDB and the API server automatically.

**Server is running at:** `http://localhost:5000`

---

## Method 3: Manual Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/jdraid
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

### Step 3: Start MongoDB
```bash
mongod
```

### Step 4: Seed Database (Optional)
```bash
node seeds/seedHeroes.js
```

### Step 5: Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

---

## Verify Installation

### Check API Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "JDRAID API is running"
}
```

### Test Hero Endpoint
```bash
curl http://localhost:5000/api/heroes
```

---

## Common Commands

### Development
```bash
npm run dev          # Start with auto-reload
npm run client       # Start React frontend (future)
npm test            # Run tests
```

### Database
```bash
node seeds/seedHeroes.js   # Seed hero data
```

### Docker
```bash
docker-compose up          # Start all services
docker-compose down        # Stop all services
docker-compose logs -f     # View logs
```

---

## Troubleshooting

### Issue: MongoDB Connection Failed
**Solution:**
- Ensure MongoDB is running (`mongod` or `docker run -p 27017:27017 mongo`)
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB is listening on port 27017

### Issue: Port 5000 Already in Use
**Solution:**
```bash
# Change PORT in .env file
PORT=5001

# Or kill the process using port 5000
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: npm install Fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: JWT_SECRET Not Set
**Solution:**
- Create a strong secret key
- Add it to `.env` file: `JWT_SECRET=your_strong_secret_key`
- Default is provided for development: `JWT_SECRET=jdraid_dev_secret_key_12345`

---

## Next Steps

1. **Explore the API**: Visit `/api/heroes` to see available heroes
2. **Register a User**: Use the `/api/auth/register` endpoint
3. **Create an Account**: Use `/api/accounts` to create a game account
4. **Track Progress**: Start logging performance with `/api/performance`
5. **Frontend Development**: Build the React frontend (coming soon)

---

## Directory Structure

```
JDRAID/
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Hero.js
│   ├── Account.js
│   └── PerformanceLog.js
├── routes/              # API endpoints
│   ├── authRoutes.js
│   ├── heroRoutes.js
│   ├── accountRoutes.js
│   └── performanceRoutes.js
├── utils/               # Utilities
│   ├── authMiddleware.js
│   ├── validators.js
│   └── heroDatabase.js
├── config/              # Configuration
│   └── database.js
├── seeds/               # Database seeds
│   └── seedHeroes.js
├── docs/                # Documentation
│   ├── API.md
│   └── FEATURES.md
├── server.js            # Main application
├── package.json         # Dependencies
├── Dockerfile           # Docker image
├── docker-compose.yml   # Docker compose
└── README.md            # Project documentation
```

---

## Getting Help

- **Documentation**: See `/docs/API.md` for detailed API documentation
- **Features**: See `/docs/FEATURES.md` for feature descriptions
- **Contributing**: See `CONTRIBUTING.md` for contribution guidelines
- **Issues**: Open an issue on GitHub for bugs or feature requests

---

## API Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/heroes` | Get all heroes |
| GET | `/api/accounts/user/:userId` | Get user accounts |
| POST | `/api/accounts` | Create new account |
| POST | `/api/performance` | Log performance |
| GET | `/api/health` | Health check |

See `/docs/API.md` for complete API documentation.

---

**Happy tracking! 🎮🏆**
