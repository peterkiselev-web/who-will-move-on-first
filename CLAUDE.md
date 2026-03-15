RULES:
- Never hardcode API keys or secrets into code
- Always use process.env for sensitive variables
- Always create a .env.example file showing variable names without values
- Always add .env to .gitignore
- At the start of every new project, create a CLAUDE.md in the project folder with these same rules if one doesn't already exist

## Project: Who Will Move On First
Full-stack breakup tracker for Peter and Niloufar.
- Frontend: React + Vite on port 3000 (client/)
- Backend: Express on port 3001 (server/)
- Database: SQLite via better-sqlite3 (server/data.db)
- Auth: Hardcoded JWT credentials for Peter and Niloufar

Run with: npm run install:all && npm start
