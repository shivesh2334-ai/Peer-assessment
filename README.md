# Referral Confidence module

A drop-in Next.js (App Router) module. A referring physician rates a specialist on
the four headings of *5 Questions Patients Have but Never Ask* (JAMA Neurology, 2018),
reframed as what a colleague thinks but rarely asks when sending a patient for an opinion.

- 4 domains, 21 questions, each rated 0-5
- Domain score = mean of its answers (0-5); overall = mean of the four domain scores
- Levels: 4.5+ Exemplary, 3.5+ Trusted, 2.5+ Developing, below 2.5 Needs attention
- Results: overall score, radar chart, domain bars, "Start here" top-3 lowest behaviours with tips,
  and activity plans for any domain under 4.0
- Download results as JSON, print, edit answers, start over
- No data leaves the browser. No extra npm dependencies. No Tailwind needed.

## Add to your existing repository

Copy one folder:

```
referral-confidence-module/app/referral-confidence   ->   <your-repo>/app/referral-confidence
```

Then run your app and open `/referral-confidence`.

If your repo keeps routes under `src/app`, copy it to `src/app/referral-confidence` instead.

Optional: link to it from your navigation or home page:

```jsx
import Link from "next/link";
<Link href="/referral-confidence">Referral confidence</Link>
```

## Requirements

- Next.js 13.4+ with the App Router (`app/` directory), React 18+
- Nothing else. The component is a client component (`"use client"`) and uses a CSS Module.

## Deploy

Commit and push to GitHub; Vercel redeploys automatically.

```bash
git add app/referral-confidence
git commit -m "Add Referral Confidence module"
git push
```

## Files

```
app/referral-confidence/
  page.jsx                  route + metadata
  ReferralConfidence.jsx    UI (questions, results)
  RadarChart.jsx            dependency-free SVG chart
  referral.module.css       scoped styles (light/dark, print, mobile)
  data/questions.js         domains, questions, tips, action lists
  data/scoring.js           scoring, levels, focus items, plans
```

## Customising

- Edit wording, tips and action lists in `data/questions.js`. Adding a question needs only a new
  `{ id, text, tip }` entry, and scores update automatically.
- Change level cut-offs and messages in `LEVELS` in `data/scoring.js`.
- Change colours at the top of `referral.module.css` (`.page` variables).

## Note

This is a reflective tool based on perceived behaviours, not a validated instrument.

## Standalone application

The module is now unpacked at the repository root with a complete Next.js project.
Run `npm ci` and `npm run dev`. Both `/` and `/referral-confidence` show the assessment.
For production run `npm run build` then `npm start`.

### Vercel settings

Import `shivesh2334-ai/Peer-assessment`, select **Next.js**, and leave Root Directory
at the repository root. Install command: `npm ci`; build command: `npm run build`.
Leave Output Directory at the framework default. No environment variables are required.
The original ZIP is retained as a source backup; all assessment/scoring code is unchanged.
