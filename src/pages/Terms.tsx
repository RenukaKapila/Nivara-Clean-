export function Terms() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-3xl px-4 space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 10, 2026</p>

        <p>
          Nivara is a privacy-first scam learning MVP. It helps people pause, check suspicious messages, learn warning signs, and practice safer verification habits.
        </p>

        <div className="space-y-4 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">Educational Use Only</h2>
            <p>
              Nivara provides educational warning-sign guidance. It is not legal, financial, banking, cybersecurity, law-enforcement, or emergency advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">No Guarantee</h2>
            <p>
              Scam patterns change. Nivara may miss warning signs or mark something as risky when it is not. Always verify important decisions through official sources.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Local-First MVP</h2>
            <p>
              The current app is browser-only. Message checks use local rule-based analysis. Progress is saved in your browser storage. No account, payment, SMS, email sending, AI provider, or cloud history feature is active.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">High-Risk Situations</h2>
            <p>
              If money, account access, identity documents, personal safety, or urgent threats are involved, contact the relevant official organization directly. If you are in immediate danger, contact local emergency services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">External Resources</h2>
            <p>
              Nivara links to official resources such as ReportFraud.ftc.gov, IdentityTheft.gov, and IC3.gov. Those websites are separate services with their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">MVP Status</h2>
            <p>
              Nivara is still being prepared for public MVP use. These terms are clear product terms, not a substitute for review by a licensed attorney before a full public launch.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
