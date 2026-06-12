import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Flag,
  Info,
  Lock,
  Phone,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { AnalysisResult, WarningSign } from "@/lib/scam-analyzer"
import { getTrustedPersonTemplate } from "@/lib/safe-share"

const RING_RADIUS = 48
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

type ExplanationMode = "simple" | "family" | "details"

type RecommendedAction = {
  title: string
  description: string
  icon: "phone" | "shield" | "flag" | "book"
  href?: string
  external?: boolean
  to?: string
}

function CircleScoreRing({ score, level }: { score: number; level: "low" | "suspicious" | "high" }) {
  const pct = Math.min(100, score) / 100
  const offset = RING_CIRCUMFERENCE * (1 - pct)
  const color = level === "high" ? "#ef4444" : level === "suspicious" ? "#f59e0b" : "#10b981"
  const trackColor = level === "high" ? "#fef2f2" : level === "suspicious" ? "#fffbeb" : "#f0fdf4"
  const textColor = level === "high" ? "text-red-600" : level === "suspicious" ? "text-amber-600" : "text-emerald-600"

  return (
    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center sm:h-32 sm:w-32">
      <svg width="100%" height="100%" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={RING_RADIUS} fill={trackColor} stroke={trackColor} strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-extrabold leading-none ${textColor}`}>{score}</span>
        <span className="mt-0.5 text-[10px] font-medium text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

function RiskBadge({ level, label }: { level: "low" | "suspicious" | "high"; label: string }) {
  const style =
    level === "high"
      ? "bg-red-100 text-red-700 border-red-200"
      : level === "suspicious"
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-emerald-100 text-emerald-700 border-emerald-200"
  const Icon = level === "low" ? CheckCircle : level === "suspicious" ? AlertCircle : AlertTriangle

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${style}`}>
      <Icon className="h-4 w-4" />
      {label}
    </span>
  )
}

function getPrimaryRecommendedAction(detectedSigns: WarningSign[]): RecommendedAction {
  const ids = new Set(detectedSigns.map((sign) => sign.id))
  const labels = detectedSigns.map((sign) => sign.label.toLowerCase()).join(" ")
  const has = (text: string) => labels.includes(text)

  if (ids.has("family_emergency_context") || ids.has("family_emergency_scam") || has("family emergency")) {
    return {
      title: "Call the Person Directly",
      description: "Use their known phone number, not the number or instructions in the message.",
      icon: "phone",
      href: "tel:+1",
    }
  }

  if (ids.has("package_delivery") || has("package") || has("delivery")) {
    return {
      title: "Track on the Official Website",
      description: "Go directly to USPS, UPS, FedEx, or the store website.",
      icon: "shield",
      href: "https://www.usps.com",
      external: true,
    }
  }

  if (ids.has("bank_impersonation") || has("bank")) {
    return {
      title: "Call Your Bank Directly",
      description: "Use the number on the back of your card or your official banking app.",
      icon: "phone",
      href: "tel:+1",
    }
  }

  if (ids.has("job_scam") || has("job") || has("payroll")) {
    return {
      title: "Do Not Pay a Recruiter",
      description: "Real employers do not ask for gift cards, transfer apps, or equipment fees before hiring.",
      icon: "shield",
      to: "/learning/payment-money-scams",
    }
  }

  return {
    title: "Verify Through an Official Channel",
    description: "Use a trusted website, official app, or known phone number before taking action.",
    icon: "shield",
    to: "/report",
  }
}

function ActionIcon({ icon }: { icon: RecommendedAction["icon"] }) {
  if (icon === "phone") return <Phone className="h-4 w-4" />
  if (icon === "flag") return <Flag className="h-4 w-4" />
  if (icon === "book") return <BookOpen className="h-4 w-4" />
  return <Shield className="h-4 w-4" />
}

function ActionCard({ action, accent = "blue" }: { action: RecommendedAction; accent?: "blue" | "amber" | "teal" }) {
  const iconClass =
    accent === "amber"
      ? "bg-amber-50 text-amber-600"
      : accent === "teal"
        ? "bg-brand-teal-light text-brand-teal"
        : "bg-brand-blue-light text-brand-blue"

  const inner = (
    <>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
        <ActionIcon icon={action.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground transition-colors group-hover:text-brand-blue">{action.title}</p>
        <p className="text-xs text-muted-foreground">{action.description}</p>
      </div>
      {action.external ? (
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
      ) : (
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </>
  )

  const className = "group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"

  if (action.to) {
    return (
      <Link to={action.to} className={className}>
        {inner}
      </Link>
    )
  }

  return (
    <a
      href={action.href || "#"}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {inner}
    </a>
  )
}

function getExplanationText(result: AnalysisResult, detectedSigns: WarningSign[], mode: ExplanationMode) {
  if (mode === "family") {
    if (result.riskLevel === "low") {
      return "This message did not show strong warning signs, but it is still okay to pause and ask a trusted person if something feels strange."
    }
    return "This message has signs that someone may be trying to rush, scare, or pressure you. Pause, do not click or pay, and ask a trusted person to check it with you."
  }

  if (mode === "details") {
    const names = detectedSigns.map((sign) => sign.label).join(", ")
    return detectedSigns.length
      ? `Nivara found these warning-sign patterns: ${names}. This is rule-based guidance, not a guaranteed decision.`
      : "Nivara did not find strong warning-sign patterns in this text. This does not prove the message is safe."
  }

  return result.explanation
}

function getRelatedLessonPath(detectedSigns: WarningSign[]) {
  const text = detectedSigns.map((sign) => `${sign.id} ${sign.label}`).join(" ").toLowerCase()
  if (text.includes("package") || text.includes("delivery") || text.includes("link")) return "/learning/phishing-fake-websites"
  if (text.includes("bank") || text.includes("verification") || text.includes("password")) return "/learning/passwords-mfa-account-safety"
  if (text.includes("job") || text.includes("payment") || text.includes("gift card")) return "/learning/payment-money-scams"
  if (text.includes("family") || text.includes("romance")) return "/learning/social-engineering"
  return "/learning"
}

export function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [explanationMode, setExplanationMode] = useState<ExplanationMode>("simple")
  const state = location.state as { result: AnalysisResult; originalText: string } | null

  if (!state?.result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="px-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
            <Shield className="h-6 w-6" />
          </div>
          <p className="mb-4 text-muted-foreground">No analysis results found.</p>
          <Link to="/check">
            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90">Go to Scam Check</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { result } = state
  const detectedSigns = result.warningSigns.filter((warning) => warning.detected)
  const isLowRisk = result.riskLevel === "low"
  const primaryAction = getPrimaryRecommendedAction(detectedSigns)
  const trustedPersonTemplate = getTrustedPersonTemplate(result.redactedText)
  const relatedLessonPath = getRelatedLessonPath(detectedSigns)
  const explanationText = getExplanationText(result, detectedSigns, explanationMode)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="-ml-2 mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Check
        </Button>

        <div className="mb-6 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Warning Sign Review</h1>
          <p className="mt-1 text-sm text-muted-foreground">A private, local review of possible warning signs.</p>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            No tool can guarantee scam detection. Nivara teaches possible warning signs so you can pause and verify through official sources.
          </p>
        </div>

        <Card className="mb-6 border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-foreground">Assessment</h2>
              <RiskBadge level={result.riskLevel} label={result.riskLabel} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-5">
              <CircleScoreRing score={result.score} level={result.riskLevel} />
              <div className="min-w-0 flex-1 space-y-2">
                {[
                  { label: "Low signs found", from: 0, to: 34, color: "bg-emerald-500" },
                  { label: "Pause and verify", from: 35, to: 74, color: "bg-amber-400" },
                  { label: "High warning signs", from: 75, to: 100, color: "bg-red-500" },
                ].map((band) => (
                  <div key={band.label} className="flex items-center gap-2">
                    <div className={`h-2 w-2 shrink-0 rounded-full ${band.color}`} />
                    <span className="flex-1 text-xs text-muted-foreground">{band.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {band.from}-{band.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {[
                { value: "simple", label: "Simple" },
                { value: "family", label: "Family" },
                { value: "details", label: "Details" },
              ].map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setExplanationMode(mode.value as ExplanationMode)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    explanationMode === mode.value
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-border bg-white text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{explanationText}</p>
          </CardContent>
        </Card>

        {detectedSigns.length > 0 && !isLowRisk && (
          <Card className="mb-6 border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <h2 className="text-base font-semibold text-foreground">Warning Signs ({detectedSigns.length})</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectedSigns.map((sign) => (
                <div key={sign.id} className="rounded-lg border border-border border-l-4 border-l-amber-400 bg-white p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{sign.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {sign.severity} severity
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{sign.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="mb-6 border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h2 className="text-base font-semibold text-foreground">What Not To Do</h2>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {[
              "Do not click links in the message.",
              "Do not share passwords, codes, or account details.",
              "Do not send money before verifying another way.",
              "Do not call phone numbers from the message.",
            ].map((step) => (
              <div key={step} className="rounded-lg border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                {step}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6 border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-brand-teal" />
              <h2 className="text-base font-semibold text-foreground">Redacted Message</h2>
            </div>
            <p className="text-xs text-muted-foreground">Private information was hidden before this review.</p>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs leading-relaxed text-foreground">
              {result.redactedText}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-blue" />
              <h2 className="text-base font-semibold text-foreground">Safe Next Steps</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.safeNextSteps.map((step) => (
              <div key={step} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-xs font-bold text-brand-blue">
                  +
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6 border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-blue" />
              <h2 className="text-base font-semibold text-foreground">Ask Someone You Trust</h2>
            </div>
            <p className="text-xs text-muted-foreground">Use this version if you want a second opinion without sharing private details.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="whitespace-pre-wrap rounded-lg border border-border bg-muted/20 p-3 text-xs leading-relaxed">
              {trustedPersonTemplate}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link to="/safe-share" className="flex-1">
                <Button variant="outline" className="w-full border-brand-blue/30 text-brand-blue">
                  Open Safe Share
                </Button>
              </Link>
              <Link to={relatedLessonPath} className="flex-1">
                <Button variant="outline" className="w-full border-brand-teal/40 text-brand-teal">
                  Learn This Pattern
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {!isLowRisk && (
          <Card className="mb-6 border-border shadow-sm">
            <CardHeader className="pb-3">
              <h2 className="text-base font-semibold text-foreground">Recommended Actions</h2>
            </CardHeader>
            <CardContent className="space-y-2">
              <ActionCard action={primaryAction} accent="blue" />
              <ActionCard
                action={{
                  title: "Report to the FTC",
                  description: "ReportFraud.ftc.gov. Official U.S. fraud reporting.",
                  icon: "flag",
                  href: "https://reportfraud.ftc.gov",
                  external: true,
                }}
                accent="amber"
              />
              <ActionCard
                action={{
                  title: "Practice This Pattern",
                  description: "Try realistic examples in the Practice Lab.",
                  icon: "book",
                  to: "/scam-lab",
                }}
                accent="teal"
              />
            </CardContent>
          </Card>
        )}

        {!isLowRisk && (
          <Card className="mb-6 border-border shadow-sm">
            <CardHeader className="pb-3">
              <h2 className="text-base font-semibold text-foreground">Official Resources</h2>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { label: "FTC ReportFraud.ftc.gov", href: "https://reportfraud.ftc.gov", desc: "Report fraud and scams" },
                { label: "IdentityTheft.gov", href: "https://identitytheft.gov", desc: "Identity theft recovery plan" },
                { label: "FBI IC3 (ic3.gov)", href: "https://ic3.gov", desc: "Report internet crime" },
              ].map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground transition-colors group-hover:text-brand-blue">{resource.label}</p>
                    <p className="text-xs text-muted-foreground">{resource.desc}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => navigate("/check")} className="flex-1 gap-2 bg-brand-blue text-white hover:bg-brand-blue/90">
            Check Another Message
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link to="/report" className="flex-1">
            <Button variant="outline" className="w-full gap-2 border-brand-blue/30 text-brand-blue">
              <BookOpen className="h-4 w-4" />
              Help & Recovery
            </Button>
          </Link>
        </div>

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>
            Nivara helps identify potential warning signs. It does not guarantee scam detection and is not a substitute
            for professional legal, financial, banking, law-enforcement, or emergency services.
          </p>
        </div>
      </div>
    </div>
  )
}
