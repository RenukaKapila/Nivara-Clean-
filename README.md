# Nivara

Nivara is a privacy-first scam learning MVP for everyday people. It helps users pause, check suspicious messages, learn warning signs, and practice realistic scam examples before they click, reply, pay, or share personal information.

Tagline: **Learn the red flags before they learn you.**

## Website

Open the public MVP: [https://renukakapila.github.io/Nivara-clean/](https://renukakapila.github.io/Nivara-clean/)

## MVP Status

Nivara is currently a local-first browser MVP. It is not a full SaaS product yet.

Active in this MVP:

- Local message warning-sign analysis
- Private-detail redaction for common patterns
- Scam learning lessons
- Practice Lab scenarios
- Scam Library examples
- Before You Pay checklist
- Safe Share redaction template
- Family Practice flow
- Optional Support Nivara page configured by `VITE_SUPPORT_URL`
- Local progress tracking
- Monthly modules and badges
- Help and recovery guidance
- Privacy, terms, and disclaimer pages

Not active yet:

- Real login or signup
- Supabase auth
- Email sending
- SMS sending
- Stripe payments
- In-app payment processing
- AI provider calls
- Cloud history
- Saved contacts
- Browser extension
- Admin dashboard

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

For a GitHub Pages project site named `Nivara-clean`, set:

```bash
VITE_BASE_PATH=/Nivara-clean/
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
4. Add repository variables:
   - `ENABLE_GITHUB_PAGES_DEPLOY` set to `true` after Pages is enabled.
   - `VITE_BASE_PATH` set to `/Nivara-clean/` for a project Pages site. The workflow also defaults to `/Nivara-clean/` if this variable is missing.
   - `VITE_SUPPORT_URL` set to the hosted support page if you want the Support button enabled.
5. Confirm the deployment URL after the workflow runs.

Until `ENABLE_GITHUB_PAGES_DEPLOY=true` is set, the workflow will still run install, typecheck, tests, and build, but it will skip the Pages API calls. This avoids a GitHub Pages setup error before the repository has Pages enabled.

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
git remote add origin https://github.com/RenukaKapila/Nivara-clean.git
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
