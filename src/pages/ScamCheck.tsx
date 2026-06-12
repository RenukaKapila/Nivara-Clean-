import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Lock, AlertCircle, ArrowRight, X, Lightbulb, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { analyzeText } from "@/lib/scam-analyzer"

const exampleMessages = [
  {
    label: "Bank Alert",
    text: "ALERT from Chase Bank: Unusual activity detected on your account ending in 4472. Your account has been temporarily suspended. Verify your identity immediately to restore access: http://chase-secure-verify.xyz/confirm. Failure to verify within 2 hours may result in permanent closure.",
  },
  {
    label: "IRS Notice",
    text: "Final Notice: The IRS has filed a lawsuit against you. An arrest warrant has been issued in your name due to unpaid taxes of $4,823. Call our tax resolution officer at 800-555-0192 immediately to avoid arrest. This is your last opportunity to resolve this matter.",
  },
  {
    label: "Package Delivery",
    text: "USPS: Your package could not be delivered. A $2.99 re-delivery fee is required. Pay here within 24 hours to avoid return to sender: http://usps-delivery-fee.com/pay",
  },
]

const steps = [
  { num: 1, icon: Eye, label: "Paste Message" },
  { num: 2, icon: Lock, label: "Private Details Hidden" },
  { num: 3, icon: Zap, label: "Review Warning Signs" },
]

function StepFlow({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => {
        const Icon = step.icon
        const isActive = step.num === activeStep
        const isDone = step.num < activeStep
        return (
          <div key={step.num} className="flex items-center flex-1">
            <div className={`flex flex-col items-center gap-1.5 flex-1 ${i === 0 ? "items-start" : i === steps.length - 1 ? "items-end" : "items-center"}`}>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isDone
                    ? "bg-brand-teal border-brand-teal text-white"
                    : isActive
                    ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-white border-border text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap hidden sm:block ${
                  isActive ? "text-brand-blue" : isDone ? "text-brand-teal" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 transition-all duration-300 ${isDone ? "bg-brand-teal" : "bg-border"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function ScamCheck() {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const navigate = useNavigate()

  const activeStep = isAnalyzing ? (loadingStep >= 1 ? 3 : 2) : text.trim() ? 1 : 1

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setIsAnalyzing(true)
    setLoadingStep(0)
    setTimeout(() => setLoadingStep(1), 400)
    setTimeout(() => {
      const result = analyzeText(text)
      navigate("/results", { state: { result, originalText: text } })
    }, 1200)
  }

  function loadExample(msg: string) {
    setText(msg)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Check a Message</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Paste any suspicious text below. Private information is automatically hidden before analysis.
          </p>
        </div>

        {/* 3-Step flow */}
        <StepFlow activeStep={activeStep} />

        {/* Privacy notice */}
        <div className="flex items-start gap-3 rounded-xl border border-brand-teal/30 bg-brand-teal-light/40 p-4 mb-6">
          <Lock className="h-4 w-4 text-brand-teal mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Your privacy is protected first</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Emails, phone numbers, account details, and verification codes are automatically hidden before any
              analysis begins. Nothing is stored or sent anywhere.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the suspicious text here. Private details are hidden before analysis."
              className="min-h-[200px] resize-none text-sm leading-relaxed pr-8 border-border focus:border-brand-teal focus:ring-brand-teal/30 bg-white"
              disabled={isAnalyzing}
            />
            {/* Loading overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 rounded-xl bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                  <div className="text-center space-y-1">
                    <p className={`text-sm font-medium transition-all duration-300 ${loadingStep === 0 ? "text-brand-teal" : "text-muted-foreground"}`}>
                      {loadingStep === 0 ? "Hiding private details…" : "✓ Private details hidden"}
                    </p>
                    <p className={`text-sm font-medium transition-all duration-300 ${loadingStep >= 1 ? "text-brand-blue" : "text-muted-foreground/50"}`}>
                      {loadingStep >= 1 ? "Analyzing warning signs…" : "Analyzing warning signs…"}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {text && !isAnalyzing && (
              <button
                type="button"
                onClick={() => setText("")}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear text"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {text && !isAnalyzing && (
            <p className="text-xs text-muted-foreground text-right">{text.length} characters</p>
          )}

          <Button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white gap-2 h-11 transition-all duration-150 hover:shadow-md disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                Analyze for Warning Signs
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {!text.trim() && !isAnalyzing && (
            <p className="text-xs text-muted-foreground text-center">Paste a message above to get started</p>
          )}
        </form>

        {/* Example messages */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-medium">Try an example message:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {exampleMessages.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => loadExample(example.text)}
                className="text-xs px-3 py-1.5 rounded-full border border-brand-blue/30 text-brand-blue bg-brand-blue-light hover:bg-brand-blue/10 transition-colors font-medium"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* What we check */}
        <div className="mt-10 rounded-xl border border-border bg-muted/30 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4 text-brand-blue" />
            <h3 className="text-sm font-semibold text-foreground">What Nivara checks for</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              "Urgent language",
              "Payment pressure",
              "Gift card requests",
              "Suspicious links",
              "Verification codes",
              "Threats or consequences",
              "Secrecy requests",
              "Job scam patterns",
              "Romance scam patterns",
              "Government impersonation",
              "Bank impersonation",
              "Package delivery scams",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Risk levels */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Low signs found", range: "0-34", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "Pause and verify", range: "35-74", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "High warning signs", range: "75-100", color: "bg-red-50 text-red-700 border-red-200" },
          ].map((level) => (
            <div key={level.label} className={`rounded-lg border p-3 text-center ${level.color}`}>
              <p className="text-xs font-semibold">{level.label}</p>
              <p className="text-xs opacity-70 mt-0.5">Score {level.range}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Nivara helps identify potential scam warning signs. It does not guarantee scam detection and is not a
            substitute for professional legal, financial, banking, law-enforcement, or emergency services.
          </p>
        </div>

        {/* Privacy badge */}
        <div className="mt-4 flex justify-center">
          <Badge variant="secondary" className="gap-1.5 text-xs">
            <Lock className="h-3 w-3" />
            Analysis runs in your browser. Nothing is sent or stored.
          </Badge>
        </div>
      </div>
    </div>
  )
}
