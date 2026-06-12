export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-3xl px-4 space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 10, 2026</p>

        <p>
          Nivara is designed as a local-first scam learning MVP. The current app is built to avoid collecting personal information unless a future version clearly adds a service that requires it.
        </p>

        <div className="space-y-4 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">What Stays Local</h2>
            <p>
              Message checks run in the browser using local rules. Practice progress, lesson progress, theme preference, and terms acceptance are stored in this browser with localStorage.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Message Redaction</h2>
            <p>
              Supported message checks try to hide common private details such as emails, phone numbers, account numbers, and verification codes before results are shown. Redaction is helpful but not perfect.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Inactive Features</h2>
            <p>
              Accounts, cloud history, saved contacts, email sending, SMS sending, payments, AI provider calls, analytics, and browser extension features are not active in this MVP.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">External Links</h2>
            <p>
              Official reporting links open websites outside Nivara. Those services may collect information according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Before Public Launch</h2>
            <p>
              If Nivara later adds accounts, payments, cloud storage, AI APIs, analytics, email, SMS, or family sharing, this policy must be updated before those features are enabled.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
