# JDRAID API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request Body:
```json
{
  "username": "player1",
  "email": "player@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "username": "player1",
    "email": "player@example.com"
  }
}
```

### Login User
**POST** `/auth/login`

Request Body:
```json
{
  "email": "player@example.com",
  "password": "password123"
}
```

### Get Current User
**GET** `/auth/me`

Headers:
```
Authorization: Bearer <token>
```

---

## Hero Endpoints

### Get All Heroes
**GET** `/heroes`

Query Parameters:
- `search` (string): Search by hero name
- `rarity` (string): Filter by rarity
- `faction` (string): Filter by faction
- `role` (string): Filter by role
- `sortBy` (string): Sort by rating

Example:
```
GET /heroes?search=Arbiter&rarity=Legendary&sortBy=overall
```

### Get Hero Details
**GET** `/heroes/:id`

### Search Heroes
**GET** `/heroes/search/query?q=query`

### Filter Heroes by Rating
**GET** `/heroes/filter/rating?minRating=8&category=arena`

Parameters:
- `minRating` (number): Minimum rating (0-10)
- `category` (string): arena, campaign, dungeons, boss, clanBoss

---

## Account Endpoints

### Get User Accounts
**GET** `/accounts/user/:userId`

### Create Account
**POST** `/accounts`

Request Body:
```json
{
  "userId": "user_id",
  "accountName": "Main Account",
  "accountLevel": 1,
  "powerLevel": 0
}
```

### Get Account Details
**GET** `/accounts/:accountId`

### Update Account
**PUT** `/accounts/:accountId`

### Add Hero to Account
**POST** `/accounts/:accountId/heroes`

### Update Account Progress
**PUT** `/accounts/:accountId/progress`

### Delete Account
**DELETE** `/accounts/:accountId`

---

## Performance Endpoints

### Log Performance Entry
**POST** `/performance`

### Get Performance Logs
**GET** `/performance/account/:accountId?limit=50&category=Campaign`

### Get Performance Summary
**GET** `/performance/summary/:accountId`

### Get Recommendations
**GET** `/performance/recommendations/:accountId`

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Description of what went wrong"
}
```

### 401 Unauthorized
```json
{
  "error": "Token is not valid"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Something went wrong!"
}
```
