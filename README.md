# Nivara

Nivara is a privacy-first scam learning side project for everyday people. It helps users pause, check suspicious messages, learn warning signs, and practice realistic scam examples before they click, reply, pay, or share personal information.

Tagline: **Learn the red flags before they learn you.**

## Open the Website

Use the live project here:

**[Open Nivara](https://renukakapila.github.io/Nivara-Clean-/)**

## What It Does

Nivara is a browser-based learning tool for scam awareness. It is designed to be simple, practical, and privacy-friendly.

You can use it to:

- Paste a suspicious message and get a local warning-sign check
- Learn common scam patterns through short lessons
- Practice with realistic scam examples in the Scam Lab
- Browse a Scam Library of examples and safe actions
- Use the Before You Pay checklist before sending money
- Create a safer redacted version of a message with Safe Share
- Walk through family practice scenarios for safer conversations
- Find reporting and recovery resources if something already happened

## How to Use It

1. Open [Nivara](https://renukakapila.github.io/Nivara-Clean-/).
2. Start with **Check a Message** if you have a suspicious text, email, DM, or payment request.
3. Review the warning signs and safer next steps.
4. Visit **Learning Center** or **Scam Lab** to practice spotting red flags.
5. Use **Before You Pay** before sending money, gift cards, crypto, deposits, or account details.
6. Use **Safe Share** when you want to ask someone for help without exposing private information.

## Privacy Notes

Nivara is local-first in this MVP. Message checks run in the browser with local rules, and progress is stored only in the current browser using `localStorage`.

Nivara is educational. It cannot guarantee that something is or is not a scam. For important situations, verify through official websites, official apps, or known phone numbers.

## Project Status

This is a public MVP, not a full SaaS product. There is no real login, signup, payment processing, cloud history, AI provider call, email sending, SMS sending, or admin dashboard in this version.

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- Radix/shadcn-style UI components
- Vitest

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Scripts

```bash
npm run dev
npm run typecheck
npm run build
npm test
npm run preview
```

## Project Structure

```text
src/
  components/
    learning/
    practice-lab/
    ui/
  hooks/
  lib/
    before-you-pay.ts
    family-practice.ts
    help-flow.ts
    lessons.ts
    monthly-modules.ts
    practice-engine.ts
    progress.ts
    safe-share.ts
    scam-analyzer.ts
    scam-library.ts
    scam-lab.ts
    scam-pattern-library.ts
    support.ts
  pages/
    Home.tsx
    ScamCheck.tsx
    Results.tsx
    LearningCenter.tsx
    LessonDetail.tsx
    ScamLab.tsx
    Progress.tsx
    ScamLibrary.tsx
    BeforeYouPay.tsx
    SafeShare.tsx
    FamilyPractice.tsx
    SupportNivara.tsx
    ReportRecover.tsx
    PrivacySafety.tsx
    Terms.tsx
    PrivacyPolicy.tsx
    Disclaimer.tsx

docs/
  backend-setup.md
  content-guide.md
  github-launch-checklist.md
  launch-checklist.md
  privacy-model.md

supabase/
  schema.sql

.github/
  workflows/
    deploy.yml
```

## Privacy-First Design

Message checks run in the browser using local rules. Nivara attempts to redact common private details such as emails, phone numbers, account numbers, and verification codes before showing results.

Progress is stored only in the current browser using `localStorage`.

Nivara teaches warning signs. It cannot guarantee that something is or is not a scam. Users should verify important situations through official sources.

## Testing

The current tests cover:

- private-detail redaction
- scam analyzer risk output
- practice scoring
- payment checklist scoring
- Safe Share redaction and template copy
- help flow coverage
- monthly module link integrity
- progress storage behavior
- optional backend mock behavior

Run:

```bash
npm test
```

## Public MVP Verification

Run the full verification set before demo:

```bash
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

Then manually review the main routes listed in `docs/launch-checklist.md` on desktop and mobile widths.

## Support Nivara

Support is optional. Nivara has no paywall in this MVP, and support payments do not unlock extra safety access.

The Support Nivara page uses a hosted support URL configured through:

```bash
VITE_SUPPORT_URL=
```

Use a hosted provider link such as a GitHub Sponsors, Ko-fi, Buy Me a Coffee, Stripe Payment Link, or similar page. Nivara does not process payments inside the app.

For local testing, create `.env.local`:

```bash
VITE_SUPPORT_URL=https://example.com/your-support-page
```

Never commit payment secrets, Stripe secret keys, Supabase service-role keys, API keys, or private credentials. Keep only `.env.example` in the repo.

## Optional Backend

Nivara does not need a backend for the public MVP. Optional Supabase setup notes live in `docs/backend-setup.md`, with a starter schema in `supabase/schema.sql`.

Do not enable accounts, synced history, email, SMS, Stripe, or cloud message storage without updating the UI and privacy docs first.

## GitHub Pages Deployment

This Vite app supports a configurable base path:

```bash
VITE_BASE_PATH=/
```

For local development, keep `VITE_BASE_PATH=/`.

For a GitHub Pages project site named `Nivara-Clean-`, set:

```bash
VITE_BASE_PATH=/Nivara-Clean-/
```

The included GitHub Actions workflow at `.github/workflows/deploy.yml` runs on pushes to `main` and:

- installs dependencies with `npm ci`
- runs `npm run typecheck`
- runs `npm test`
- runs `npm run build`
- deploys `dist` to GitHub Pages only when deployment is enabled

Repository settings still need to be configured manually:

1. Go to repository Settings.
2. Go to Pages.
3. Choose GitHub Actions as the source.
4. Confirm the deployment URL after the workflow runs.

Optional repository variables:

- `VITE_BASE_PATH` can stay unset because the workflow defaults to `/Nivara-Clean-/`.
- `VITE_SUPPORT_URL` can be set to the hosted support page if you want the Support button enabled.

## Publishing to GitHub

Review changed files:

```bash
git status
git diff --stat
```

Create a launch branch:

```bash
git checkout -b launch-mvp
```

Commit the launch MVP:

```bash
git add .
git commit -m "Prepare Nivara launch MVP"
```

Connect to GitHub:

```bash
git remote add origin git@github.com:RenukaKapila/Nivara-Clean-.git
```

Push the branch:

```bash
git push -u origin launch-mvp
```

After reviewing the branch on GitHub, open a pull request into `main`, review the changed files, confirm the checklist in `docs/github-launch-checklist.md`, then merge to `main`.

Enable GitHub Pages:

1. Go to repository Settings.
2. Go to Pages.
3. Choose GitHub Actions as the source if using the included workflow.
4. Confirm the deployment URL after the workflow runs.

Configure support link:

1. Set `VITE_SUPPORT_URL` locally in `.env.local`.
2. If using GitHub Actions, add `VITE_SUPPORT_URL` as a repository variable or secret if needed.
3. Never commit secret payment keys.

## Roadmap

Good next steps:

- Add route rendering tests for critical pages
- Add more analyzer fixture tests
- Expand monthly modules
- Add optional account features only after the local-first MVP is stable
