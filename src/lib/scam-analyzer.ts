import { PATTERN_LIBRARY_DETECTORS, getCategoryById } from "./scam-pattern-library"

export interface WarningSign {
  id: string
  label: string
  description: string
  detected: boolean
  severity: "high" | "medium" | "low"
}

export interface AnalysisResult {
  redactedText: string
  score: number
  riskLevel: "low" | "suspicious" | "high"
  riskLabel: string
  warningSigns: WarningSign[]
  explanation: string
  safeNextSteps: string[]
}

const REDACTION_PATTERNS: Array<{ pattern: RegExp; replacement: string }> = [
  {
    pattern: /\b(my name is|i am|this is|name:)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\b/gi,
    replacement: "$1 [NAME HIDDEN]",
  },
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: "[EMAIL HIDDEN]",
  },
  {
    pattern: /\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/g,
    replacement: "[PHONE HIDDEN]",
  },
  {
    pattern:
      /\b\d{1,5}\s+\w+(\s+\w+)*\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Circle|Cir|Way|Place|Pl)\b\.?,?\s+\w[\w\s]*,\s+[A-Z]{2}\s+\d{5}/gi,
    replacement: "[ADDRESS HIDDEN]",
  },
  {
    pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    replacement: "[BANK INFO HIDDEN]",
  },
  {
    pattern: /\b(routing|account)\s*(number|#|num)?:?\s*\d{8,17}\b/gi,
    replacement: "[BANK INFO HIDDEN]",
  },
  {
    pattern: /\b\d{6}\b(?=\s*(is your|verification|code|otp|pin|passcode))/gi,
    replacement: "[CODE HIDDEN]",
  },
  {
    pattern: /(?<=(verification|confirm|otp|code|pin|passcode)\s*(?:is|:)?\s*)\d{4,8}\b/gi,
    replacement: "[CODE HIDDEN]",
  },
  {
    pattern: /\bverification code:\s*\d{4,8}\b/gi,
    replacement: "verification code: [CODE HIDDEN]",
  },
  {
    pattern: /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b(?!\d)/g,
    replacement: "[SSN HIDDEN]",
  },
  {
    pattern:
      /\b(WM|PAY|UPSC|EXAM|HR|CASE|REF|ID|TKT|REC|APP|CONF|JOB|REWARD|ORDER|CLAIM|NRT|INV|MCF|SUB|BILL|RNW|USPS|CHASE|IRS)[-_][\w\d][-\w\d]{2,}\b/gi,
    replacement: "[REFERENCE ID HIDDEN]",
  },
]

const NORMAL_SCHEDULING_PATTERN =
  /\b(appointment reminder|scheduled for|arrive \d+\s*minutes? early|arrive early|during business hours|bring (a )?photo id|bring insurance card|reschedule|call our office directly|appointment with|location|suite|doctor|clinic|appointment)\b/i

const WARNING_SIGN_DETECTORS: Array<{
  id: string
  label: string
  description: string
  severity: "high" | "medium" | "low"
  detect: (text: string) => boolean
}> = [
  {
    id: "urgent_language",
    label: "Urgent Language",
    description: "Message creates artificial urgency to pressure immediate action.",
    severity: "medium",
    detect: (t) => {
      if (NORMAL_SCHEDULING_PATTERN.test(t)) return false

      const urgencyWords =
        /\b(urgent|immediately|right now|act now|don['’]?t delay|limited time|last chance|final notice|must respond|respond immediately|today only|act fast|hurry|time is running out|please don['’]?t|i['’]?m scared|i am scared|i['’]?m in trouble|i am in trouble)\b/i.test(t)

      const deadlineWithConsequence =
        /\b(within \d+ (minutes?|hours?)|expires? (in|today|soon)|\d+\s*minutes?|24 hours|hours? left|deadline is today|reserved for \d+)\b/i.test(t) &&
        /\b(close|closed|locked|suspended|cancelled|canceled|lost|lose|return|penalty|fee|charge|pay|payment|claim|verify|confirm|avoid|prevent|expire|expires|refund|reward|account|access|delivery|application|document)\b/i.test(t)

      return urgencyWords || deadlineWithConsequence
    },
  },
  {
    id: "time_pressure",
    label: "Tight Time Limit",
    description: "Message sets an artificial short deadline to force immediate action without time to verify.",
    severity: "high",
    detect: (t) => {
      if (NORMAL_SCHEDULING_PATTERN.test(t)) return false

      return (
        /\b(within \d+ (minutes?|hours?)|must complete|you have \d+ (minutes?|hours?)|expires in \d+|time sensitive|time is running out)\b/i.test(t) &&
        /\b(account|payment|fee|claim|verify|confirm|suspend|locked|closed|refund|reward|delivery|application|document|bank|card|money|prize|job)\b/i.test(t)
      )
    },
  },
  {
    id: "payment_pressure",
    label: "Payment Pressure",
    description: "Request for payment, money transfer, or financial information.",
    severity: "high",
    detect: (t) =>
      /\b(wire transfer|send money|send \$\d+|pay now|payment required|need money|zelle|venmo|cash app|bitcoin|crypto|western union|moneygram|gift card payment|prepaid card|pay via|payment method|processing fee|shipping fee|activation fee|redelivery fee|correction fee|equipment fee)\b/i.test(t),
  },
  {
    id: "gift_card",
    label: "Gift Card Request",
    description: "Asking for gift card numbers or codes as payment.",
    severity: "high",
    detect: (t) =>
      /\b(gift card|gift cards|itunes card|google play card|amazon card|steam card|apple gift cards|card number|card code|scratch.*card|text me the codes)\b/i.test(t),
  },
  {
    id: "suspicious_links",
    label: "Suspicious Links",
    description: "Contains unusual URLs, misspelled domains, or suspicious link patterns.",
    severity: "high",
    detect: (t) =>
      /\b(bit\.ly|tinyurl|shorturl|click here|verify.*link|confirm.*link|http[^\s]*\.(tk|ml|ga|cf|click|xyz|top|pw|info|link))\b/i.test(t) ||
      /\bhttps?:\/\/[^\s]*\.(tk|ml|ga|cf|xyz|pw|top|click|info|link)\b/i.test(t) ||
      /\bhttps?:\/\/[^\s]*(secure|verify|confirm|account|update|login|signin|support|billing|refund|center|review|claim|delivery|help)[^\s]*/i.test(t) ||
      /\bhttps?:\/\/[^\s]*(norton|mcafee|paypal|amazon|walmart|microsoft|apple|netflix|geeksquad|geek-squad|bestbuy|best-buy|cashapp|venmo|chase|bankofamerica|usps|ups|fedex|irs)[^\s]*(support|billing|refund|secure|verify|center|review|cancel|renewal|account|form|claim|update|delivery|help)[^\s]*/i.test(t),
  },
  {
    id: "verification_code",
    label: "Verification Code Request",
    description: "Asking you to share a verification or OTP code you received.",
    severity: "high",
    detect: (t) =>
      /\b(otp|one.time (password|code|pin)|verification code|confirm.*\bcode\b|share.*\bcode\b|send.*\bcode\b|give.*\bcode\b|provide.*\bcode\b|tell.*\bcode\b|what.*\bcode\b|security code|passcode|two.factor|2fa code|authenticator code)\b/i.test(t) &&
      !/\b(billing zip|zip code|postal code|last 4 digits|last four digits|card used|invoice|reference (id|number)|promo code|coupon code|discount code|area code)\b/i.test(t),
  },
  {
    id: "threats",
    label: "Threats or Consequences",
    description: "Threatens negative consequences such as arrest, account suspension, or legal action.",
    severity: "high",
    detect: (t) =>
      /\b(arrest|warrant|legal action|sue|lawsuit|suspended|terminated|shutdown|blocked|deleted|law enforcement|police|fbi|irs|penalty|fine|criminal|prosecute|seized)\b/i.test(t),
  },
  {
    id: "account_suspension",
    label: "Account Suspension Threat",
    description: "Threatens permanent account closure or suspension to create panic and urgency.",
    severity: "high",
    detect: (t) =>
      /\b(account.*locked|account.*suspended|account.*closure|permanently (closed|suspended|locked)|account.*will be (closed|terminated|deleted)|permanent (suspension|closure)|restore.*access|temporary suspension)\b/i.test(t),
  },
  {
    id: "do_not_contact",
    label: "Instructions to Avoid Official Channels",
    description: "Tells you not to call the real company or resolve the issue through normal channels.",
    severity: "high",
    detect: (t) =>
      /\b(do not call|don['’]?t call|cannot be resolved.*call|only.*through.*link|only.*via.*link|do not contact|cannot call|must use.*link|resolve.*only|only resolved)\b/i.test(t) ||
      /\b(do not contact your bank|do not visit a branch|do not call customer service|contacting your bank (may|will) (delay|cancel|void)|complete (the|this) (request|form|cancellation|review) first|before contacting|contact us first|do not dispute)\b/i.test(t),
  },
  {
    id: "secrecy",
    label: "Secrecy Request",
    description: "Asks you to keep the transaction or communication secret.",
    severity: "high",
    detect: (t) =>
      /\b(don['’]?t tell|keep.*secret|tell no one|between us|confidential|don['’]?t share|private.*matter|don['’]?t mention|no one else should know)\b/i.test(t),
  },
  {
    id: "family_emergency_context",
    label: "Family Emergency Scam",
    description: "Message claims a loved one is in trouble and asks for urgent money or secrecy.",
    severity: "high",
    detect: (t) =>
      /\b(mom|dad|grandma|grandpa|aunt|uncle|son|daughter|brother|sister)\b/i.test(t) &&
      /\b(in trouble|accident|lawyer|jail|police|hospital|using someone else['’]?s phone|don['’]?t call|don['’]?t tell|scared|need money|send \$\d+|gift card|gift cards|text me the codes)\b/i.test(t),
  },
  {
    id: "job_scam",
    label: "Job Scam Indicators",
    description: "Unsolicited job offer with unusually high pay or work-from-home requirements.",
    severity: "medium",
    detect: (t) =>
      /\b(work from home|make \$\d+|earn up to|per day|per week|no experience|no interview|immediate hire|remote job offer|easy money|passive income|side hustle|hired immediately|\$\d+\/hour|selected you for|training starts today)\b/i.test(t),
  },
  {
    id: "romance_scam",
    label: "Romance Scam Indicators",
    description: "Expressions of rapid romantic attachment combined with financial requests.",
    severity: "medium",
    detect: (t) =>
      /\b(i love you|soul mate|destiny|meant to be|military deployment|overseas|stuck.*country|emergency.*money|can't meet|camera broken|customs fee)\b/i.test(t),
  },
  {
    id: "government_impersonation",
    label: "Government Impersonation",
    description: "Impersonating a government agency such as the IRS, SSA, or Medicare.",
    severity: "high",
    detect: (t) =>
      /\b(irs|social security|medicare|medicaid|department of.*treasury|customs.*border|homeland security|fbi|dea|fdic|government.*benefit|stimulus|refund.*irs|tax.*debt|upsc|aadhaar|passport|pan)\b/i.test(t),
  },
  {
    id: "bank_impersonation",
    label: "Bank Impersonation",
    description: "Impersonating a bank or financial institution to obtain account information.",
    severity: "high",
    detect: (t) =>
      /\b(bank.*alert|account.*suspended|unusual.*activity|verify.*account|confirm.*identity|security.*alert|fraud.*department|bank.*security|call.*immediately|your.*account.*has|account.*locked|account.*temporarily|verify.*identity.*immediately|online banking|debit card)\b/i.test(t),
  },
  {
    id: "package_delivery",
    label: "Package Delivery Scam",
    description: "Fake delivery notification requiring payment or personal information.",
    severity: "medium",
    detect: (t) =>
      /\b(package.*delivery|delivery.*failed|parcel.*held|customs.*fee|delivery.*fee|redelivery fee|usps|fedex|ups|dhl).*\b(pay|fee|click|verify|confirm|update)\b/i.test(t) ||
      /\b(package.*await|unable.*deliver|reschedule.*delivery|delivery.*attempt|return to sender|tracking id)\b/i.test(t),
  },
]

export function redactText(text: string): string {
  const protectedUrls: string[] = []

  let redacted = text.replace(/https?:\/\/[^\s]+/gi, (url) => {
    protectedUrls.push(url)
    return `[URL_PLACEHOLDER_${protectedUrls.length - 1}]`
  })

  for (const { pattern, replacement } of REDACTION_PATTERNS) {
    redacted = redacted.replace(pattern, replacement)
  }

  redacted = redacted.replace(/\[URL_PLACEHOLDER_(\d+)\]/g, (_, index) => {
    return protectedUrls[Number(index)] ?? "[LINK HIDDEN]"
  })

  return redacted
}

const ALL_DETECTORS = (() => {
  const patternIds = new Set(PATTERN_LIBRARY_DETECTORS.map((d) => d.id))
  const base = WARNING_SIGN_DETECTORS.filter((d) => !patternIds.has(d.id))
  return [...base, ...PATTERN_LIBRARY_DETECTORS]
})()

export function analyzeText(text: string): AnalysisResult {
  const redactedText = redactText(text)
  const lowerText = text.toLowerCase()

  const warningSignResults: WarningSign[] = ALL_DETECTORS.map((detector) => ({
    id: detector.id,
    label: detector.label,
    description: detector.description,
    severity: detector.severity,
    detected: detector.detect(lowerText),
  }))

  const detected = warningSignResults.filter((w) => w.detected)
  const highCount = detected.filter((w) => w.severity === "high").length
  const mediumCount = detected.filter((w) => w.severity === "medium").length
  const lowCount = detected.filter((w) => w.severity === "low").length

  const detectedIds = new Set(detected.map((w) => w.id))

  let rawScore = highCount * 30 + mediumCount * 12 + lowCount * 5

  const hasGiftCard = detectedIds.has("gift_card") || detectedIds.has("gift_card_payment_scam")
  const hasPayment =
    detectedIds.has("payment_pressure") ||
    detectedIds.has("fee_request") ||
    detectedIds.has("billing_payment_pressure")
  const hasSecrecy = detectedIds.has("secrecy") || detectedIds.has("do_not_contact")
  const hasSuspiciousLink = detectedIds.has("suspicious_links")
  const hasPrizeReward = detectedIds.has("prize_reward_scam")
  const hasFamilyEmergency =
    detectedIds.has("family_emergency_scam") ||
    detectedIds.has("family_emergency_context") ||
    detectedIds.has("ai_voice_scam")
  const hasEquipmentFee = detectedIds.has("fake_equipment_fee")
  const hasNoInterview = detectedIds.has("no_interview_required")
  const hasSubscriptionRefund = detectedIds.has("subscription_refund_scam")
  const hasCardInfoRequest =
    detectedIds.has("card_info_request") ||
    detectedIds.has("personal_card_info_request") ||
    detectedIds.has("personal_information_request")
  const hasBrandImpersonation = detectedIds.has("brand_impersonation")
  const hasBank = detectedIds.has("bank_impersonation")
  const hasGovExam =
    detectedIds.has("govt_exam_impersonation") ||
    detectedIds.has("upsc_exam_scam") ||
    detectedIds.has("govt_job_fee_scam") ||
    detectedIds.has("admit_card_result_scam") ||
    detectedIds.has("exam_document_upload_scam") ||
    detectedIds.has("exam_refund_correction_fee_scam")
  const hasJob = detectedIds.has("job_scam") || detectedIds.has("fake_recruiter_scam") || detectedIds.has("fake_internship_scam")
  const hasPackage = detectedIds.has("package_delivery")

  if (hasGiftCard) rawScore = Math.max(rawScore, 82)
  if (hasPayment && hasSecrecy) rawScore = Math.max(rawScore, 80)
  if (hasPayment && hasSuspiciousLink) rawScore = Math.max(rawScore, 80)
  if (hasPrizeReward && (hasPayment || hasSuspiciousLink)) rawScore = Math.max(rawScore, 82)
  if (hasFamilyEmergency) rawScore = Math.max(rawScore, 90)
  if (hasEquipmentFee) rawScore = Math.max(rawScore, 80)
  if (highCount >= 3) rawScore = Math.max(rawScore, 78)
  if (hasNoInterview && hasPayment) rawScore = Math.max(rawScore, 80)
  if (hasSubscriptionRefund && (hasSuspiciousLink || hasCardInfoRequest || hasSecrecy)) rawScore = Math.max(rawScore, 85)
  if (hasBrandImpersonation && hasSuspiciousLink && hasCardInfoRequest) rawScore = Math.max(rawScore, 85)
  if (hasBank && hasSuspiciousLink) rawScore = Math.max(rawScore, 88)
  if (hasGovExam && (hasSuspiciousLink || hasPayment || hasSecrecy)) rawScore = Math.max(rawScore, 85)
  if (hasJob && hasPayment) rawScore = Math.max(rawScore, 82)
  if (hasPackage && hasSuspiciousLink) rawScore = Math.max(rawScore, 80)

  const score = Math.min(100, rawScore)

  let riskLevel: "low" | "suspicious" | "high"
  let riskLabel: string

  if (score >= 75) {
    riskLevel = "high"
    riskLabel = "High warning signs"
  } else if (score >= 35) {
    riskLevel = "suspicious"
    riskLabel = "Pause and verify"
  } else {
    riskLevel = "low"
    riskLabel = "Low signs found"
  }

  let explanation: string

  if (riskLevel === "low") {
    explanation =
      "No major warning signs detected. This message does not contain strong scam indicators. Still verify independently if anything feels unusual."
  } else if (riskLevel === "suspicious") {
    explanation = `Potential warning signs detected. This message contains ${detected.length} indicator${detected.length === 1 ? "" : "s"} that may require verification. Appears suspicious. Consider verifying independently before responding or taking any action.`
  } else {
    explanation = `Multiple warning signs detected. This message contains ${detected.length} indicator${detected.length === 1 ? "" : "s"} commonly associated with scam communications. May require verification with the official organization through independently confirmed contact details.`
  }

  const safeNextSteps: string[] = []

  if (riskLevel === "low") {
    safeNextSteps.push("If expected, follow normal instructions.")
    safeNextSteps.push("If unsure, contact the organization using a trusted phone number or website.")
    safeNextSteps.push("Do not share sensitive information unless you are sure you are using an official channel.")
  } else {
    safeNextSteps.push("Do not respond, click links, or take action based on this message.")
    safeNextSteps.push("Do not share any verification codes, passwords, or personal information.")

    if (detectedIds.has("payment_pressure")) {
      safeNextSteps.push("Never send money based on an unsolicited request. Contact your bank if needed.")
    }

    if (detectedIds.has("verification_code")) {
      safeNextSteps.push("Never share a verification code you received. Legitimate services will never ask for this.")
    }

    if (detectedIds.has("government_impersonation")) {
      safeNextSteps.push("Contact the agency directly using their official website or phone number, not the one in this message.")
    }

    if (detectedIds.has("bank_impersonation")) {
      safeNextSteps.push("Call your bank using the number on the back of your card, not any number in this message.")
    }

    if (hasGovExam) {
      const cat = getCategoryById("government_exam")
      if (cat) cat.safeNextSteps.forEach((s) => !safeNextSteps.includes(s) && safeNextSteps.push(s))
    }

    if (hasFamilyEmergency) {
      const cat = getCategoryById("family_emergency")
      if (cat) cat.safeNextSteps.forEach((s) => !safeNextSteps.includes(s) && safeNextSteps.push(s))
    }

    if (detectedIds.has("kyc_scam") || detectedIds.has("direct_deposit_scam")) {
      const cat = getCategoryById("banking_payment")
      if (cat) cat.safeNextSteps.forEach((s) => !safeNextSteps.includes(s) && safeNextSteps.push(s))
    }

    if (detectedIds.has("fake_recruiter_scam") || detectedIds.has("fake_internship_scam") || detectedIds.has("student_payroll_scam")) {
      const cat = getCategoryById("job_internship")
      if (cat) cat.safeNextSteps.forEach((s) => !safeNextSteps.includes(s) && safeNextSteps.push(s))
    }

    if (detectedIds.has("wrong_number_romance_scam") || detectedIds.has("crypto_investment_scam")) {
      const cat = getCategoryById("romance_wrong_number")
      if (cat) cat.safeNextSteps.forEach((s) => !safeNextSteps.includes(s) && safeNextSteps.push(s))
    }

    if (detectedIds.has("subscription_refund_scam")) {
      safeNextSteps.push("Do not use the cancellation link in this message.")
      safeNextSteps.push("Go directly to the company's official website or call the official number from your account or card statement.")
    }

    if (detectedIds.has("brand_impersonation")) {
      if (!safeNextSteps.some((s) => s.includes("official website"))) {
        safeNextSteps.push("Verify this message by going to the company's official website directly. Do not click links in the message.")
      }
    }

    if (hasGiftCard) {
      if (!safeNextSteps.some((s) => s.includes("gift card"))) {
        safeNextSteps.push("Never purchase gift cards as payment for anyone. This is never a legitimate payment method.")
      }
    }

    if (detectedIds.has("prize_reward_scam")) {
      safeNextSteps.push("Legitimate companies do not require a fee to release a prize or reward. Do not pay.")
      safeNextSteps.push("Verify any promotion directly through the brand's official website.")
    }

    if (detectedIds.has("fee_request")) {
      if (!safeNextSteps.some((s) => s.includes("fee"))) {
        safeNextSteps.push("Paying a small fee to receive money, a job, or a prize is a common scam tactic.")
      }
    }

    if (detectedIds.has("payroll_employer_impersonation")) {
      safeNextSteps.push("Contact your employer's HR or payroll department directly using contact info from official company sources.")
    }

    if (detectedIds.has("fake_equipment_fee")) {
      safeNextSteps.push("Legitimate employers do not ask you to purchase equipment out of pocket before starting.")
    }

    if (detectedIds.has("money_transfer_request")) {
      if (!safeNextSteps.some((s) => s.includes("send money"))) {
        safeNextSteps.push("Never send money to an employer or recruiter. This is a clear warning sign.")
      }
    }

    safeNextSteps.push("Report the message to the FTC at ReportFraud.ftc.gov.")

    if (riskLevel === "high") {
      safeNextSteps.push("Visit our Report & Recover page for guided next steps.")
    }
  }

  return {
    redactedText,
    score,
    riskLevel,
    riskLabel,
    warningSigns: warningSignResults,
    explanation,
    safeNextSteps,
  }
}
