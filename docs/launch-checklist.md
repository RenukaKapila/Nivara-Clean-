# Public MVP Demo Checklist

## Product

- [x] Home explains Nivara in non-technical language.
- [x] Main routes are Check, Learn, Practice, Progress, Help, Library, Privacy.
- [x] Unfinished login, signup, account, pricing, and early-access pages are hidden.
- [x] Scam claims use warning-sign language instead of guarantees.
- [x] Recovery pages link to official resources.
- [x] Family and Safe Share flows are visible.
- [x] Optional Support Nivara page is visible without creating a paywall.

## Privacy

- [x] Message checks run locally.
- [x] Redaction happens before sharing results.
- [x] Progress is local browser storage.
- [x] Backend is optional and documented.
- [x] No hardcoded secrets.
- [x] Local env files are ignored and `.env.example` is safe.

## Verification

Run before demo:

```bash
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

Then manually check on desktop and mobile widths:

- `/`
- `/check`
- `/learning`
- `/scam-lab`
- `/progress`
- `/library`
- `/before-you-pay`
- `/safe-share`
- `/family-practice`
- `/support`
- `/report`
- `/privacy`
- `/terms`
- `/disclaimer`
