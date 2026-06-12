# GitHub Launch Checklist

## Verification

- [ ] Typecheck passes with `npm run typecheck`
- [ ] Tests pass with `npm test`
- [ ] Build passes with `npm run build`
- [ ] Production dependency audit passes with `npm audit --omit=dev`
- [ ] Core routes load locally
- [ ] Mobile QA completed

## Repository Safety

- [ ] No secrets committed
- [ ] `.env`, `.env.local`, `.env.production`, and other local env files are ignored
- [ ] `.env.example` is safe and contains only blank example values
- [ ] `VITE_SUPPORT_URL=` is documented
- [ ] No Supabase service role keys, Stripe secret keys, API keys, or private credentials are committed
- [ ] README is accurate for the current MVP

## Product And Legal

- [ ] Support page has no charity or tax-deductible claims
- [ ] Support payments are optional
- [ ] No paywall exists
- [ ] App works without login
- [ ] Legal, privacy, terms, and disclaimer pages reviewed
- [ ] Scam guidance avoids guaranteed detection claims

## GitHub Pages

- [ ] `vite.config.ts` supports `VITE_BASE_PATH`
- [ ] `VITE_BASE_PATH` is `/` locally
- [ ] GitHub Pages project deployment uses `/Nivara-Clean-/` if needed
- [ ] GitHub Actions Pages source is enabled in repository settings
- [ ] Repository variable `ENABLE_GITHUB_PAGES_DEPLOY` is set to `true` only after Pages is enabled
- [ ] Deployment URL checked after workflow runs
