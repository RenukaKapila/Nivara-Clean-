import { Link } from "react-router-dom"
import { Lock, Shield, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const redactionTypes = [
  { before: "your.email@example.com", after: "[EMAIL HIDDEN]", label: "Email Addresses" },
  { before: "555-867-5309", after: "[PHONE HIDDEN]", label: "Phone Numbers" },
  { before: "123 Main Street, Springfield", after: "[ADDRESS HIDDEN]", label: "Mailing Addresses" },
  { before: "4111 1111 1111 1111", after: "[BANK INFO HIDDEN]", label: "Credit Card Numbers" },
  { before: "Routing: 021000021", after: "[BANK INFO HIDDEN]", label: "Bank/Routing Numbers" },
  { before: "Your code is: 847291", after: "[CODE HIDDEN]", label: "Verification Codes" },
  { before: "SSN: 123-45-6789", after: "[SSN HIDDEN]", label: "Social Security Numbers" },
]

export function PrivacySafety() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <Badge className="mb-3 bg-brand-blue-light text-brand-blue border-brand-blue/20">
            <Shield className="mr-1.5 h-3 w-3" />
            Privacy First
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy & Safety</h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Understanding how Nivara is designed to handle information in the current MVP.
          </p>
        </div>

        {/* Core Privacy Principle */}
        <Card className="mb-8 border-brand-blue/20 bg-brand-blue-light/20 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <EyeOff className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-foreground">Current MVP local/demo design</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Nivara is currently designed for local/demo use. Supported features are designed to redact private details before analysis. Future architecture may change, and this page should be updated before launch changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redaction Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-2">
            Private Information Is Hidden First
          </h2>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Before any scam analysis begins, Nivara automatically scans your pasted text and replaces sensitive
            information with neutral labels. This is a design principle, not an afterthought. You can see exactly
            what was redacted so you remain informed.
          </p>

          <div className="space-y-3">
            {redactionTypes.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-3 shadow-sm"
              >
                <p className="text-xs font-medium text-muted-foreground mb-2">{item.label}</p>
                <div className="flex items-center gap-3 font-mono text-sm flex-wrap">
                  <span className="text-destructive line-through opacity-70">{item.before}</span>
                  <span className="text-muted-foreground text-xs">→</span>
                  <span className="text-brand-teal font-semibold">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Only */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-brand-blue" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">Educational Tool Only</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                title: "No guarantee of scam detection",
                desc: "Nivara uses heuristic pattern matching to identify common warning signs. It cannot detect every scam and will not catch every threat. Results should be treated as guidance, not as definitive conclusions.",
              },
              {
                title: "We never say 'This is definitely a scam'",
                desc: "Our language is intentionally careful. We say things like 'potential warning signs detected' and 'appears suspicious.' This is deliberate. We want to inform, not alarm.",
              },
              {
                title: "Always verify independently",
                desc: "If you receive a suspicious message from what appears to be your bank, utility company, or a government agency, contact them directly using a number or address you find independently. Do not use a number or link provided in the message.",
              },
              {
                title: "Not a substitute for professional services",
                desc: "Nivara is not a substitute for professional legal, financial, banking, law-enforcement, or emergency services. If you are in immediate danger, contact your local emergency services.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <CheckCircle className="h-4 w-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cookies / Analytics */}
        <section className="mb-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-2">Cookies & Analytics</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The current MVP is designed to limit data collection. If analytics, backend storage, or external APIs are added later, policy language should be updated before release.
          </p>
        </section>

        {/* Disclaimer Block */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Important Disclaimer</p>
              <p className="mt-1 text-sm text-amber-800 leading-relaxed">
                Nivara helps identify potential scam warning signs. It does not guarantee scam detection and is not a
                substitute for professional legal, financial, banking, law-enforcement, or emergency services.
                Results are provided for educational purposes only. Always verify independently and consult
                professionals when needed.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/check" className="flex-1">
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-colors w-full">
              Check a Message <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
          <Link to="/report" className="flex-1">
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-brand-blue/30 text-brand-blue text-sm font-medium hover:bg-brand-blue-light transition-colors w-full">
              Report & Recover
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
