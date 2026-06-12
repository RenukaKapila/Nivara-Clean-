import { ExternalLink, HeartHandshake, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supportUrl } from "@/lib/support"

export function SupportNivara() {
  const supportConfigured = Boolean(supportUrl)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Support Nivara</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nivara is free to use. Optional support helps keep the project moving, but it never unlocks extra safety access or changes the guidance you receive.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-brand-blue" />
                Optional Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you find Nivara useful, you can support the project through an external hosted support page configured by the project owner.
              </p>
              {supportConfigured ? (
                <a href={supportUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2 bg-brand-blue text-white hover:bg-brand-blue/90">
                    Open Support Link
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                  Support is not configured for this build. Set <code>VITE_SUPPORT_URL</code> to enable this button.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-teal" />
                Safety Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Nivara has no paywall in this MVP.</li>
                <li>Support is voluntary and not required to use the app.</li>
                <li>Nivara does not process payments inside the app.</li>
                <li>No charity, donation, or tax-deductible claim is made here.</li>
                <li>Never commit payment secrets or private keys to this repo.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5 text-sm text-muted-foreground">
          Nivara provides educational warning-sign guidance only. It does not guarantee scam detection and is not legal, financial, banking, law-enforcement, or emergency advice.
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/privacy">
            <Button variant="outline" className="border-brand-blue/30 text-brand-blue">
              Review Privacy & Safety
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
