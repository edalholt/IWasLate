<a href="https://late.dalholt.no/" target="_blank"><img src="https://therealsujitk-vercel-badge.vercel.app/?app=i-was-late&style=flat-square" /></a>

## About
This is an app to keep track of who arrives late when, for example, working on a group project. A unique URL is generated for every group (/group/[id]), where the user can add group members and register when someone arrives late.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The server is running at [http://localhost:3000](http://localhost:3000)

 The backend is a combination of a firebase firestore database and API routes in NEXT.js, firebase service account credentials is required to develop locally. Example .env can be found [here](.env.local.example) (remove ".example")
