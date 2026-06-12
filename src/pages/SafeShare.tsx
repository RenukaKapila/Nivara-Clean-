import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Copy, Lock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getSafeShareText, getTrustedPersonTemplate } from "@/lib/safe-share"

export function SafeShare() {
  const [text, setText] = useState("")
  const redacted = useMemo(() => getSafeShareText(text), [text])
  const template = useMemo(() => getTrustedPersonTemplate(redacted || "[paste a redacted message here]"), [redacted])
  const [copied, setCopied] = useState("")

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(`Copied ${label}.`)
    } catch {
      setCopied("Copy did not work here. Select the text and copy it manually.")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal text-white">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Safe Share</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Remove common private details before asking someone you trust for help. Redaction helps, but review before sharing.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Paste the message</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                rows={10}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste the suspicious message here."
                aria-label="Original suspicious message"
              />
              <p className="text-xs text-muted-foreground">Nivara does not upload this text. Redaction runs in your browser.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Redacted preview</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="min-h-[15rem] whitespace-pre-wrap rounded-lg border border-border bg-muted/20 p-3 text-sm">
                {redacted || "Your redacted message will appear here."}
              </div>
              <Button disabled={!redacted} onClick={() => copy(redacted, "redacted message")} className="w-full gap-2 bg-brand-blue text-white hover:bg-brand-blue/90">
                <Copy className="h-4 w-4" /> Copy Redacted Message
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-5">
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Trusted person template</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="whitespace-pre-wrap rounded-lg border border-border bg-muted/20 p-3 text-sm">{template}</div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button disabled={!redacted} onClick={() => copy(template, "template")} className="bg-brand-teal text-white hover:bg-brand-teal/90">
                Copy Template
              </Button>
              <Link to="/family-practice">
                <Button variant="outline">Practice as a family</Button>
              </Link>
            </div>
            {copied && <p className="text-sm text-brand-teal">{copied}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
