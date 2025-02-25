# Live Scoreboard API Module

## Overview

The Live Scoreboard API Module is a backend service designed to manage and update a live scoreboard for a website. The scoreboard displays the top 10 users based on their scores, which are incremented when users complete a specific action. This module ensures real-time updates and includes security measures to prevent unauthorized score manipulation.

## Purpose

This module provides an API endpoint to:
- Accept score update requests from authenticated users.
- Update user scores in a database.
- Broadcast the updated top 10 scores to connected clients in real-time.
- Prevent malicious score increases through authentication and validation.

## Requirements

- **Language:** Backend language Node.js, Typescript with WebSocket support.
- **Database:** A relational PostgreSQL database to store user scores.
- **Authentication:** JWT (JSON Web Token) or equivalent for user verification.
- **Real-time Communication:** WebSocket protocol for live updates to the scoreboard.
- **Dependencies:**
  - Web framework: Express.js.
  - WebSocket library: Socket.IO.
  - Database client library.

## API Endpoints

### 1. Update User Score
- **Endpoint:** `POST /api/score/update`
- **Description:** Updates the score of an authenticated user upon completing an action.
- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "userId": "string",
    "scoreIncrement": "integer"
  }

#### Response:
  Success (200 OK):
  ```json
  {
    "status": "success",
    "message": "Score updated",
    "newScore": "integer"
  }

  Error (401 Unauthorized):
  ```json
  {
    "status": "error",
    "message": "Invalid or missing token"
  }

  Error (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Invalid request data"
  }

### 2. Get Top 10 Scores (WebSocket)
  Connection: wss://<server-url>/scoreboard
  Description: Establishes a WebSocket connection to receive real-time updates of the top 10 scores.
  Message Format (Server to Client):
  ```json
  {
    "event": "scoreboardUpdate",
    "data": [
      { "userId": "string", "username": "string", "score": "integer" },
      ...
    ]
}


## Authentication: Requires a valid JWT token passed during the WebSocket handshake.
  Architecture
    Client-Side:
      Sends a POST /api/score/update request when a user completes an action.
      Maintains a WebSocket connection to receive live scoreboard updates.
    Server-Side:
      Validates the JWT token for each request.
      Updates the user's score in the database.
      Retrieves the updated top 10 scores.
      Broadcasts the updated scoreboard to all connected WebSocket clients.

## Database:
  Stores user data (e.g., userId, username, score).
  Supports efficient querying for top 10 scores (e.g., indexed score column).

## Security
  Authentication: All requests must include a valid JWT token.
  Input Validation: Ensure scoreIncrement is a positive integer and userId matches the token.
  Rate Limiting: Limit the frequency of score updates per user to prevent abuse (e.g., 1 update per second).
  Data Integrity: Use transactions or atomic operations to ensure consistent score updates.

## Additional Comments for Improvement

1. **Scalability:**
   - For high traffic, implement a load balancer and horizontally scale the server instances.
   - Use a distributed cache (e.g., Redis) to store the top 10 scores and reduce database queries.

2. **Security Enhancements:**
   - Implement IP-based rate limiting alongside user-based limits.

3. **Performance:**
   - Batch WebSocket updates if multiple score changes occur simultaneously to reduce network overhead.

4. **Monitoring:**
   - Add logging for all score update requests to track potential abuse.
   - Integrate metrics (APM) to monitor API performance and WebSocket connection stability.