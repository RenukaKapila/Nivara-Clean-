# Optional Backend Setup

Nivara works as a local-first browser app without an account, database, email, SMS, Stripe, or AI provider.

Use this backend only when you are ready to add real accounts or synced history. Do not enable cloud storage for message checks unless the privacy policy and UI clearly explain what is stored.

## Current MVP Behavior

- Message checks run in the browser.
- Redaction runs in the browser.
- Progress uses `localStorage`.
- Auth routes are hidden.
- `src/lib/supabase-client.ts` returns mock behavior unless Supabase environment variables exist.

## Environment Variables

Create a local `.env` file only when testing an actual backend:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Never commit `.env` files or service-role keys.

## Suggested Supabase Steps

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Keep row level security enabled.
4. Add auth only when the UI has a real account experience.
5. Keep message content out of cloud tables by default.

## Launch Rule

If a feature requires cloud storage, it must be visible, optional, and documented before release.
