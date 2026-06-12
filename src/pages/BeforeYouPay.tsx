import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, CreditCard, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { beforeYouPayQuestions, scoreBeforeYouPay, type PaymentCheckAnswers } from "@/lib/before-you-pay"

const initialAnswers: PaymentCheckAnswers = {
  unexpectedContact: false,
  rushed: false,
  secrecy: false,
  irreversiblePayment: false,
  verifiedIndependently: false,
  personalInfo: false,
  tooGood: false,
}

const paymentMethods = ["Zelle", "Cash App", "Venmo", "Bank transfer", "Gift card", "Crypto", "Marketplace deposit", "Card or official portal"]

export function BeforeYouPay() {
  const [method, setMethod] = useState(paymentMethods[0])
  const [amount, setAmount] = useState("")
  const [requester, setRequester] = useState("")
  const [answers, setAnswers] = useState<PaymentCheckAnswers>(initialAnswers)
  const result = useMemo(() => scoreBeforeYouPay(answers), [answers])

  const tone =
    result.level === "high"
      ? "border-red-200 bg-red-50 text-red-800"
      : result.level === "pause"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-emerald-200 bg-emerald-50 text-emerald-800"

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
            <CreditCard className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Before You Pay</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Use this checklist before sending money. Nivara teaches warning signs; always verify through official sources before paying.
          </p>
        </div>

        <Card>
          <CardHeader><CardTitle>Payment request</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Payment amount" placeholder="Amount (example: 500)" value={amount} onChange={(event) => setAmount(event.target.value)} />
            <Input aria-label="Requester" placeholder="Who is requesting payment?" value={requester} onChange={(event) => setRequester(event.target.value)} />
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-medium">Payment method</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((item) => (
                  <Button key={item} type="button" variant={item === method ? "default" : "outline"} onClick={() => setMethod(item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader><CardTitle>Checklist</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {beforeYouPayQuestions.map((question) => (
              <label key={question.id} className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
                <span className="text-sm leading-relaxed">{question.label}</span>
                <input
                  type="checkbox"
                  checked={answers[question.id]}
                  onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.checked }))}
                  className="mt-1 h-4 w-4"
                />
              </label>
            ))}
          </CardContent>
        </Card>

        <Card className={`mt-5 border ${tone}`}>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="text-xl font-bold">{result.title}</p>
                <p className="mt-1 text-sm opacity-80">
                  Requester: {requester || "not provided"} | Amount: {amount || "not provided"} | Method: {method}
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {result.nextSteps.map((step) => (
                <li key={step} className="flex gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/safe-share">
                <Button variant="outline" className="w-full bg-white sm:w-auto">Ask a trusted person</Button>
              </Link>
              <Link to="/report">
                <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 sm:w-auto">
                  What should I do now? <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
