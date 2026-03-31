<<<<<<< HEAD
# Naija Complaints

A public complaint board where Nigerians can post their grievances and read others'. Built with React, Express, and SQLite.

## Features

- Post anonymous complaints (max 500 characters)
- Choose from categories like Government, NEPA/Power, Roads, etc.
- View all complaints in a feed, newest first
- React to complaints with 😤 Vex, 😭 Cry, 😂 Laugh
- Filter by category and search by keyword
- Mobile responsive design with Nigerian Pidgin flavor

## Setup

1. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

   This will start both the backend server on port 3001 and the frontend dev server.

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Routes

- `GET /api/complaints` - Fetch complaints (supports `?category=` and `?search=` params)
- `POST /api/complaints` - Submit a new complaint
- `POST /api/complaints/:id/react` - Add a reaction to a complaint

## Tech Stack

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: SQLite (better-sqlite3)

The database is automatically seeded with 5 sample complaints on first run.
