import { useState } from "react"
import { Link } from "react-router-dom"
import { AlertOctagon, ArrowRight, CheckCircle, ExternalLink, Flag, HeartHandshake, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getHelpPath, helpPaths } from "@/lib/help-flow"

const resources = [
  {
    name: "FTC ReportFraud.gov",
    description: "Report fraud, scams, and bad business practices to the Federal Trade Commission.",
    href: "https://reportfraud.ftc.gov",
  },
  {
    name: "IdentityTheft.gov",
    description: "Get a personal recovery plan if identity information was stolen.",
    href: "https://identitytheft.gov",
  },
  {
    name: "FBI IC3",
    description: "Report internet-facilitated crimes including online fraud and phishing.",
    href: "https://ic3.gov",
  },
  {
    name: "CISA Secure Our World",
    description: "Plain-language cybersecurity guidance from the U.S. Cybersecurity and Infrastructure Security Agency.",
    href: "https://www.cisa.gov/secure-our-world",
  },
]

function StepList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3"><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
            <span>{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function ReportRecover() {
  const [selectedId, setSelectedId] = useState(helpPaths[0].id)
  const selected = getHelpPath(selectedId)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <AlertOctagon className="h-6 w-6 text-red-600" />
          </div>
          <Badge className="mb-3 border-red-200 bg-red-100 text-red-700">What should I do now?</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Help & Recovery</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Choose what happened and get calm next steps. Nivara is educational and not an emergency, legal, financial, or law-enforcement service.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <Card className="h-fit border-border shadow-sm">
            <CardHeader><CardTitle className="text-base">Choose a situation</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {helpPaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setSelectedId(path.id)}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                    selectedId === path.id
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-border hover:bg-muted/30"
                  }`}
                >
                  {path.label}
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardContent className="p-5">
                <h2 className="text-2xl font-bold">{selected.label}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start with the immediate steps below. If anyone is in immediate danger, contact local emergency services.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <StepList title="Immediate next steps" items={selected.immediateSteps} />
              <StepList title="What not to do" items={selected.whatNotToDo} />
              <StepList title="Who to contact" items={selected.whoToContact} />
              <StepList title="What to save" items={selected.whatToSave} />
            </div>

            <Card className="border-brand-teal/20 bg-brand-teal-light/20 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-semibold"><HeartHandshake className="h-4 w-4" /> You are not alone.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Scammers pressure people on purpose. Asking for help quickly is a strong next step.</p>
                </div>
                <Link to="/safe-share">
                  <Button variant="outline" className="bg-white">Safely ask for help</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold">Official resources</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {resources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-brand-blue">{resource.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/check" className="flex-1">
            <Button className="w-full gap-2 bg-brand-blue text-white hover:bg-brand-blue/90">
              Check a Message <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="tel:+1" className="flex-1">
            <Button variant="outline" className="w-full gap-2 border-brand-blue/30 text-brand-blue">
              <Phone className="h-4 w-4" /> Call official support directly
            </Button>
          </a>
          <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Flag className="h-4 w-4" /> Report to FTC
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
