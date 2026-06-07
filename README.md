# Crevia Backend API

![Status](https://img.shields.io/badge/status-in%20development-orange)

The backend service for Crevia (Creator OS), built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js** with **Express 5**
- **MongoDB** via **Mongoose**
- **JWT** for authentication
- **Zod** for request validation
- **OpenAI** for AI content generation

## Project Structure

```
src/
├── config/        # Environment and database setup
├── middlewares/   # Auth, error handling, request middleware
├── modules/       # Feature modules (auth, profile, content, generation)
├── utils/         # Helpers (OpenAI client, prompts, API errors)
└── zodSchema/     # Request validation schemas
```

## Health Check

Once running, you can verify the server is up at:

```
GET /health
```

---

_This README will be expanded as the project develops._
