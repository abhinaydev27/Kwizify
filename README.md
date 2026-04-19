# Kwizer

A polished quiz website starter built with React, Vite, TypeScript, and Tailwind CSS. It includes:

- Landing page
- Login, signup, and forgot password flows
- Dashboard with search, stats, history, and leaderboard preview
- Timed quiz flow with mark-for-review
- Results page with chart and answer review
- Profile/settings with theme toggle and password update

## Demo account

- Email: `demo@quizflow.app`
- Password: `Password123`

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Project structure

```text
src/
  components/
  context/
  data/
  lib/
  pages/
  styles/
public/
```

## Notes

- User accounts, session state, preferences, and quiz history are stored in `localStorage`.
- This keeps the app fully functional without needing a separate backend for the starter version.
