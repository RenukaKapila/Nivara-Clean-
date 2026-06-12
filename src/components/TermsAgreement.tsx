import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ACCEPT_KEY = "nivara_terms_acceptance_v1"

export function TermsAgreement({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setAccepted(localStorage.getItem(ACCEPT_KEY) === "true")
  }, [])

  if (accepted) return <>{children}</>

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Card>
          <CardHeader><CardTitle>Before you continue</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">I understand Nivara provides educational warning-sign guidance only and cannot guarantee scam detection.</p>
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={checked} onChange={(e)=>setChecked(e.target.checked)} />I understand and agree.</label>
            <div className="text-sm flex gap-3"><Link to="/terms" className="underline">Terms</Link><Link to="/privacy-policy" className="underline">Privacy Policy</Link><Link to="/disclaimer" className="underline">Disclaimer</Link></div>
            <Button disabled={!checked} onClick={() => { localStorage.setItem(ACCEPT_KEY, "true"); setAccepted(true) }}>Continue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
