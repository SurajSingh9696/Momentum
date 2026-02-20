# Momentum Backend API

Backend API for the Momentum habit tracking application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and JWT secret.

4. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Habits
- `GET /api/habits` - Get user's habits (protected)
- `POST /api/habits` - Create new habit (protected)
- `PUT /api/habits/:id` - Update habit (protected)
- `DELETE /api/habits/:id` - Delete habit (protected)
- `GET /api/habits/stats` - Get user statistics (protected)

### Challenges
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/my` - Get user's joined challenges (protected)
- `POST /api/challenges` - Create challenge (protected)
- `POST /api/challenges/:id/join` - Join challenge (protected)
- `POST /api/challenges/:id/leave` - Leave challenge (protected)

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create post (protected)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
