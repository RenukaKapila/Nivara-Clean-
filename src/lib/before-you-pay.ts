export interface PaymentCheckAnswers {
  unexpectedContact: boolean
  rushed: boolean
  secrecy: boolean
  irreversiblePayment: boolean
  verifiedIndependently: boolean
  personalInfo: boolean
  tooGood: boolean
}

export type PaymentRiskLevel = "lower" | "pause" | "high"

export const beforeYouPayQuestions: Array<{
  id: keyof PaymentCheckAnswers
  label: string
  riskWhen: boolean
}> = [
  { id: "unexpectedContact", label: "Did they contact you unexpectedly?", riskWhen: true },
  { id: "rushed", label: "Are they rushing you or setting a deadline?", riskWhen: true },
  { id: "secrecy", label: "Are they asking you not to tell anyone?", riskWhen: true },
  { id: "irreversiblePayment", label: "Are they asking for gift cards, crypto, wire transfer, Zelle, Cash App, Venmo, or another hard-to-reverse payment?", riskWhen: true },
  { id: "verifiedIndependently", label: "Did you verify using a phone number or website you found yourself?", riskWhen: false },
  { id: "personalInfo", label: "Are they asking for personal or account information?", riskWhen: true },
  { id: "tooGood", label: "Does the offer seem too good to be true?", riskWhen: true },
]

export function scoreBeforeYouPay(answers: PaymentCheckAnswers) {
  const warningCount = beforeYouPayQuestions.filter((question) => answers[question.id] === question.riskWhen).length
  const hasStrongPaymentRisk = answers.irreversiblePayment || answers.secrecy

  let level: PaymentRiskLevel = "lower"
  if (warningCount >= 4 || (hasStrongPaymentRisk && warningCount >= 2)) level = "high"
  else if (warningCount >= 1) level = "pause"

  const title =
    level === "high"
      ? "High warning signs - do not pay yet"
      : level === "pause"
        ? "Pause and double-check"
        : "Looks lower risk, still verify"

  const nextSteps =
    level === "high"
      ? [
          "Do not send money yet.",
          "Verify through an official website or a phone number you found yourself.",
          "Ask a trusted person to review the request.",
          "If money was already sent, contact your bank or payment provider quickly.",
        ]
      : level === "pause"
        ? [
            "Slow down before paying.",
            "Verify outside the message or call.",
            "Use protected payment methods when possible.",
          ]
        : [
            "Keep using official payment methods.",
            "Save receipts and confirmation details.",
            "Ask for help if anything changes or starts to feel rushed.",
          ]

  return { warningCount, level, title, nextSteps }
}
