// Scam Pattern Library
// Each category defines keywords, phrases, requested actions, red flags, and safe next steps.
// Detectors are exported separately and consumed by the scam analyzer.

export interface ScamCategory {
  id: string
  name: string
  description: string
  keywords: string[]
  suspiciousPhrases: string[]
  requestedActions: string[]
  redFlags: string[]
  safeNextSteps: string[]
}

export interface ScamPatternDetector {
  id: string
  label: string
  description: string
  severity: "high" | "medium" | "low"
  categoryId: string
  detect: (text: string) => boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export const SCAM_CATEGORIES: ScamCategory[] = [
  {
    id: "student_university",
    name: "Student and University Scams",
    description:
      "Scams targeting students and university applicants with fake scholarships, payroll offers, or enrollment fees.",
    keywords: [
      "scholarship",
      "grant",
      "student",
      "university",
      "college",
      "enrollment",
      "tuition",
      "financial aid",
      "stipend",
      "payroll",
      "campus",
      "department",
      "faculty",
    ],
    suspiciousPhrases: [
      "you have been selected for a scholarship",
      "claim your student grant",
      "student payroll enrollment",
      "university financial assistance",
      "complete your scholarship application",
      "your application has been approved",
      "deposit required to secure your place",
    ],
    requestedActions: [
      "Pay a processing fee",
      "Provide bank account for direct deposit",
      "Share SSN or student ID",
      "Click a link to claim the scholarship",
      "Purchase gift cards to release funds",
    ],
    redFlags: [
      "Unsolicited scholarship or grant offer",
      "Requests bank details for payroll before starting",
      "Asks for personal ID before any formal process",
      "Pressure to act before a tight deadline",
      "Poor grammar or unofficial-looking communication",
    ],
    safeNextSteps: [
      "Contact your university's financial aid office directly.",
      "Never pay fees to claim a scholarship. Legitimate scholarships do not charge processing fees.",
      "Verify any job or payroll offer through the university's official HR department.",
      "Report suspicious offers to your university's security or IT office.",
    ],
  },
  {
    id: "job_internship",
    name: "Job and Internship Scams",
    description:
      "Fake job offers, internship listings, and recruiter messages designed to collect personal information or money.",
    keywords: [
      "job offer",
      "internship",
      "recruiter",
      "remote work",
      "work from home",
      "hiring",
      "employment",
      "salary",
      "commission",
      "onboarding",
      "direct deposit",
      "task-based",
    ],
    suspiciousPhrases: [
      "earn up to $500 per day",
      "no experience required",
      "immediate hire",
      "work from home and earn",
      "we found your profile online",
      "simple tasks, high pay",
      "reply YES to apply",
      "keep this confidential",
      "you will be reimbursed",
      "please purchase equipment",
    ],
    requestedActions: [
      "Provide bank account for direct deposit",
      "Purchase equipment with personal funds",
      "Deposit a check and wire back funds",
      "Share SSN for onboarding",
      "Pay a registration or training fee",
    ],
    redFlags: [
      "Job offer arrived without applying",
      "Unusually high pay for minimal or vague work",
      "Interview conducted entirely by text or chat",
      "Asked to purchase equipment or cards",
      "Check sent before starting with instructions to wire money back",
    ],
    safeNextSteps: [
      "Search the company name with the word 'scam' or 'review' before proceeding.",
      "Never deposit a check from a company you haven't fully verified.",
      "Never pay fees as part of a job application or onboarding process.",
      "Verify the recruiter through the company's official website or LinkedIn.",
    ],
  },
  {
    id: "family_emergency",
    name: "Family Emergency Scams",
    description:
      "Scams that impersonate a family member, friend, or official claiming a loved one is in danger.",
    keywords: [
      "emergency",
      "accident",
      "arrested",
      "hospital",
      "bail",
      "grandson",
      "granddaughter",
      "son",
      "daughter",
      "lawyer",
      "police",
      "injured",
      "urgent help",
    ],
    suspiciousPhrases: [
      "I'm in trouble and need your help",
      "please don't tell anyone",
      "I was in an accident",
      "I need bail money",
      "I lost my phone",
      "don't call mom or dad",
      "send money right away",
      "I'm in the hospital",
      "wire me money now",
      "I'm stuck abroad",
    ],
    requestedActions: [
      "Send bail or legal fees immediately",
      "Wire money or send gift cards",
      "Keep the situation secret from others",
      "Act before verifying with the person directly",
    ],
    redFlags: [
      "Claims to be a family member but sounds different",
      "Asks you to keep situation secret",
      "Pressure to act before calling the person directly",
      "Requests payment by gift card, wire, or crypto",
      "Story keeps changing or escalating",
    ],
    safeNextSteps: [
      "Hang up and call the person directly on their known number before taking any action.",
      "Contact other family members to verify the situation.",
      "No legitimate emergency requires gift cards or wire transfers.",
      "Consider setting up a family code word for emergencies.",
    ],
  },
  {
    id: "government_exam",
    name: "Government and Exam Scams",
    description:
      "Scams impersonating government bodies, exam authorities, or official portals with fake notifications, fees, and document requests.",
    keywords: [
      "UPSC",
      "exam",
      "admit card",
      "result",
      "application",
      "government job",
      "document",
      "verification",
      "correction",
      "fee",
      "refund",
      "portal",
      "notification",
      "SSC",
      "IBPS",
      "civil services",
      "hallticket",
      "hall ticket",
      "roll number",
      "merit list",
      "selection list",
      "Aadhaar",
      "PAN",
      "passport",
    ],
    suspiciousPhrases: [
      "your result has been declared",
      "admit card correction required",
      "document verification pending",
      "application fee refund",
      "complete your government job form",
      "your selection is confirmed pending fee",
      "upload documents via WhatsApp",
      "pay fee to correct your admit card",
      "your registration is incomplete",
      "contact officer on Telegram",
      "exam rescheduling fee",
      "submit Aadhaar details to verify",
    ],
    requestedActions: [
      "Pay a fee to correct or claim documents",
      "Upload Aadhaar, PAN, or passport via chat",
      "Click a link to download admit card",
      "Contact a WhatsApp or Telegram number",
      "Pay refund processing fee",
    ],
    redFlags: [
      "Official exam body contacted via WhatsApp or Telegram",
      "Request to pay fee for admit card correction or result release",
      "Unofficial or misspelled website domain",
      "Urgent deadline for document submission",
      "Requests Aadhaar, PAN, bank details, or login credentials",
    ],
    safeNextSteps: [
      "Go directly to the official website by typing the address yourself. Do not use links from the message.",
      "Check official notices only at the exam body's verified website.",
      "Legitimate exam authorities do not contact candidates via WhatsApp or Telegram for fees.",
      "Report the message to the exam authority's official helpline.",
    ],
  },
  {
    id: "banking_payment",
    name: "Banking and Payment Scams",
    description:
      "Scams impersonating banks, payment apps, or financial services to steal account credentials or money.",
    keywords: [
      "bank",
      "account",
      "transaction",
      "transfer",
      "OTP",
      "verification",
      "UPI",
      "NEFT",
      "IMPS",
      "debit",
      "credit",
      "wallet",
      "payment",
      "KYC",
    ],
    suspiciousPhrases: [
      "your account has been suspended",
      "complete KYC to avoid account freeze",
      "unusual activity detected",
      "verify your account immediately",
      "your card will be blocked",
      "confirm your identity to restore access",
      "share OTP to complete verification",
      "click link to update account",
    ],
    requestedActions: [
      "Share OTP or PIN",
      "Click a link to verify account",
      "Call a number to prevent account freeze",
      "Provide full card or account details",
      "Complete KYC by sharing personal documents",
    ],
    redFlags: [
      "Bank contacts you first via text or chat",
      "Requests OTP, PIN, or full card number",
      "Link does not match official bank domain",
      "Urgent threat of account closure or freezing",
      "Asks you to install an app or grant screen access",
    ],
    safeNextSteps: [
      "Call your bank directly using the number on the back of your card.",
      "Never share OTP, PIN, or passwords with anyone, including bank staff.",
      "Log into your bank only through the official app or website you type yourself.",
      "Report the message to your bank's official fraud helpline.",
    ],
  },
  {
    id: "delivery_toll_qr",
    name: "Delivery, Toll, and QR Scams",
    description:
      "Fake delivery notifications, unpaid toll alerts, or QR codes requiring payment or personal details.",
    keywords: [
      "package",
      "parcel",
      "delivery",
      "shipment",
      "tracking",
      "USPS",
      "FedEx",
      "UPS",
      "DHL",
      "toll",
      "fastag",
      "QR code",
      "scan",
      "customs",
      "re-delivery",
    ],
    suspiciousPhrases: [
      "your package could not be delivered",
      "pay delivery fee to release parcel",
      "scan QR code to confirm delivery",
      "unpaid toll balance due",
      "customs clearance fee required",
      "your shipment is on hold",
      "re-schedule delivery by paying fee",
    ],
    requestedActions: [
      "Pay a small delivery or customs fee",
      "Scan QR code to confirm identity",
      "Click link to update delivery address",
      "Provide card details for re-delivery",
    ],
    redFlags: [
      "Unexpected delivery notification for unordered package",
      "Small fee designed to seem insignificant",
      "Link does not go to official carrier website",
      "QR code from unknown source",
      "Urgent deadline to avoid return",
    ],
    safeNextSteps: [
      "Go directly to the carrier's official website to check your tracking number.",
      "Never pay delivery fees by clicking links in texts or emails.",
      "Scan QR codes only from trusted printed sources you requested.",
      "Report smishing to 7726 (SPAM) and to the FTC.",
    ],
  },
  {
    id: "romance_wrong_number",
    name: "Romance and Wrong-Number Scams",
    description:
      "Scammers build trust through friendly or romantic messages before requesting money or investments.",
    keywords: [
      "hello stranger",
      "wrong number",
      "hi friend",
      "investment",
      "crypto",
      "trading",
      "love",
      "relationship",
      "overseas",
      "military",
      "oil rig",
      "medical mission",
      "destiny",
      "soul mate",
    ],
    suspiciousPhrases: [
      "sorry, wrong number, but you seem nice",
      "I found a great investment opportunity",
      "let's connect on WhatsApp",
      "I am overseas right now",
      "I need help with customs fees",
      "I can teach you how to trade crypto",
      "you are the one I have been looking for",
      "send me a small amount to test the platform",
    ],
    requestedActions: [
      "Move conversation to private chat app",
      "Invest in a trading or crypto platform",
      "Send money for emergency or customs",
      "Share personal or financial details",
    ],
    redFlags: [
      "Unsolicited friendly message from unknown number",
      "Pushes to move to WhatsApp or Telegram quickly",
      "Claims to be overseas or in unusual circumstances",
      "Introduces investment or money opportunity early",
      "Refuses or avoids live video calls",
    ],
    safeNextSteps: [
      "Do not engage with unsolicited friendly messages from unknown numbers.",
      "Reverse image search profile photos at images.google.com.",
      "Ask for a live video call. Scammers will typically find excuses to avoid this.",
      "Never invest money through a platform introduced by someone you met online.",
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DETECTORS
// ─────────────────────────────────────────────────────────────────────────────

export const PATTERN_LIBRARY_DETECTORS: ScamPatternDetector[] = [
  // ── Student & University ──────────────────────────────────────────────────
  {
    id: "student_payroll_scam",
    label: "Student Payroll Scam",
    description:
      "Appears to offer a student payroll, stipend, or work-study position requiring bank details before any formal process.",
    severity: "high",
    categoryId: "student_university",
    detect: (t) =>
      /\b(student\s+payroll|payroll\s+enrollment|payroll\s+setup|stipend\s+(payment|setup)|direct\s+deposit\s+(setup|enrollment)|department\s+payroll)\b/i.test(t) &&
      /\b(bank\s+(account|details|info)|routing\s+number|account\s+number|ssn|social\s+security)\b/i.test(t),
  },
  {
    id: "scholarship_scam",
    label: "Scholarship or Grant Scam",
    description:
      "Unsolicited scholarship or grant offer requiring a fee, personal details, or bank information to claim.",
    severity: "high",
    categoryId: "student_university",
    detect: (t) =>
      /\b(scholarship|grant|bursary|financial\s+award)\b/i.test(t) &&
      /\b(selected|approved|awarded|eligible|congratulations|claim)\b/i.test(t) &&
      /\b(fee|processing|bank|account|deposit|pay|card|verify|click|link)\b/i.test(t),
  },
  {
    id: "fake_internship_scam",
    label: "Fake Internship Offer",
    description:
      "Fake internship or campus recruitment offer requiring personal information or a registration fee.",
    severity: "medium",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(internship|intern\s+position|campus\s+recruitment|campus\s+drive|placement)\b/i.test(t) &&
      /\b(fee|registration|pay|deposit|bank|account|ssn|personal\s+details|confirm\s+your\s+slot)\b/i.test(t),
  },
  // ── Job & Internship ──────────────────────────────────────────────────────
  {
    id: "fake_recruiter_scam",
    label: "Fake Recruiter Message",
    description:
      "Unsolicited message claiming to be a recruiter offering high-paying remote work with no interview required.",
    severity: "medium",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(recruiter|talent\s+acquisition|hiring\s+manager|we\s+(found|reviewed|saw)\s+your\s+(profile|resume|cv))\b/i.test(t) &&
      /\b(work\s+from\s+home|remote\s+position|no\s+experience|immediate(ly)?\s+hire|per\s+(day|week)|earn\s+up\s+to)\b/i.test(t),
  },
  {
    id: "direct_deposit_scam",
    label: "Direct Deposit or Payroll Scam",
    description:
      "Requests bank account information for direct deposit or payroll before employment is verified.",
    severity: "high",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(direct\s+deposit|payroll|routing\s+number|bank\s+account\s+(number|details|info))\b/i.test(t) &&
      /\b(send|provide|share|fill|submit|enter|give)\b/i.test(t) &&
      /\b(hired|onboarding|start|new\s+employee|before\s+you\s+start|first\s+pay|first\s+check)\b/i.test(t),
  },
  // ── Government & Exam ─────────────────────────────────────────────────────
  {
    id: "upsc_exam_scam",
    label: "Exam Verification or UPSC Scam",
    description:
      "Appears to impersonate an exam authority such as UPSC, SSC, or IBPS with fake result, admit card, or verification notices.",
    severity: "high",
    categoryId: "government_exam",
    detect: (t) =>
      /\b(upsc|ssc|ibps|neet|jee|cat\s+exam|civil\s+services|public\s+service\s+commission|exam\s+board|examination\s+authority)\b/i.test(t) &&
      /\b(result|admit\s+card|hall\s+ticket|roll\s+number|verification|correction|document|fee|refund|application)\b/i.test(t),
  },
  {
    id: "govt_job_fee_scam",
    label: "Government Job Fee Scam",
    description:
      "Fake government job offer requiring a fee, security deposit, or document submission to secure the position.",
    severity: "high",
    categoryId: "government_exam",
    detect: (t) =>
      /\b(government\s+(job|post|vacancy|position|appointment)|sarkari\s+(naukri|job)|central\s+government|state\s+government|public\s+sector)\b/i.test(t) &&
      /\b(fee|deposit|pay|security\s+amount|processing|registration\s+charge|document\s+fee)\b/i.test(t),
  },
  {
    id: "admit_card_result_scam",
    label: "Admit Card or Result Scam",
    description:
      "Fake notification about an admit card correction, result declaration, or merit list requiring a fee or personal documents.",
    severity: "high",
    categoryId: "government_exam",
    detect: (t) =>
      /\b(admit\s+card|hall\s+ticket|result\s+(declared|released|out)|merit\s+list|selection\s+list|rank\s+list)\b/i.test(t) &&
      /\b(correction|update|download|verify|fee|pay|link|click|whatsapp|telegram|Aadhaar|PAN|passport|bank)\b/i.test(t),
  },
  {
    id: "exam_document_upload_scam",
    label: "Fake Document Upload Request",
    description:
      "Requests sensitive documents such as Aadhaar, PAN, or passport via unofficial channels for exam or government application.",
    severity: "high",
    categoryId: "government_exam",
    detect: (t) =>
      /\b(upload|send|submit|share|provide)\b/i.test(t) &&
      /\b(Aadhaar|aadhar|PAN\s+card|passport|voter\s+id|driving\s+licence|birth\s+certificate)\b/i.test(t) &&
      /\b(whatsapp|telegram|email|link|portal|click|form)\b/i.test(t),
  },
  {
    id: "exam_refund_correction_fee_scam",
    label: "Exam Refund or Correction Fee Scam",
    description:
      "Fake offer of an exam fee refund or application correction requiring a small payment or bank details.",
    severity: "high",
    categoryId: "government_exam",
    detect: (t) =>
      /\b(refund|fee\s+refund|correction\s+fee|application\s+correction|form\s+correction|re.registration|rescheduling\s+fee)\b/i.test(t) &&
      /\b(exam|application|admit|result|upsc|ssc|ibps|government)\b/i.test(t) &&
      /\b(pay|bank|account|upi|transfer|link|click|neft|imps)\b/i.test(t),
  },
  {
    id: "govt_exam_impersonation",
    label: "Government or Exam Impersonation",
    description:
      "The message appears to impersonate an exam authority, government office, university, or official application portal. Go directly to the official website by typing the address yourself. Do not use links from the message. Check official notices only.",
    severity: "high",
    categoryId: "government_exam",
    detect: (t) =>
      /\b(upsc|ssc|ibps|neet|jee|civil\s+services|ministry\s+of|government\s+of\s+(india|pakistan|bangladesh)|national\s+(testing|recruitment)|public\s+service)\b/i.test(t) ||
      (/\b(exam|result|admit\s+card|government\s+job|application\s+correction|document\s+verification|fee\s+payment)\b/i.test(t) &&
        /\b(whatsapp|telegram|unofficial|link|click|fee|pay|Aadhaar|PAN|bank\s+details|login\s+credentials)\b/i.test(t)),
  },
  // ── Banking & Payment ─────────────────────────────────────────────────────
  {
    id: "kyc_scam",
    label: "KYC or Account Verification Scam",
    description:
      "Fake KYC update or account verification request designed to steal banking credentials or personal documents.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(kyc|know\s+your\s+customer|kyc\s+(update|verification|expired|pending|complete|required))\b/i.test(t) &&
      /\b(account|bank|freeze|blocked|suspended|verify|click|link|update|Aadhaar|PAN)\b/i.test(t),
  },
  // ── Delivery, Toll & QR ───────────────────────────────────────────────────
  {
    id: "toll_payment_scam",
    label: "Toll or Traffic Fine Scam",
    description:
      "Fake unpaid toll or traffic fine message requiring immediate payment via a link.",
    severity: "medium",
    categoryId: "delivery_toll_qr",
    detect: (t) =>
      /\b(toll|fastag|e.toll|highway\s+fee|traffic\s+fine|vehicle\s+penalty|challan)\b/i.test(t) &&
      /\b(unpaid|outstanding|overdue|pay\s+now|fee\s+due|balance|click|link|fine)\b/i.test(t),
  },
  // ── Romance & Wrong Number ────────────────────────────────────────────────
  {
    id: "wrong_number_romance_scam",
    label: "Wrong-Number or Unsolicited Friendly Message",
    description:
      "Unsolicited friendly or romantic message from an unknown number, often leading to investment or money requests.",
    severity: "medium",
    categoryId: "romance_wrong_number",
    detect: (t) =>
      /\b(wrong\s+number|sorry.*number|hi\s+there|hello\s+friend|you\s+seem\s+(nice|interesting)|is\s+this\s+\w+\?)\b/i.test(t) &&
      /\b(whatsapp|telegram|let'?s\s+chat|add\s+me|message\s+me|connect\s+with\s+me)\b/i.test(t),
  },
  {
    id: "crypto_investment_scam",
    label: "Crypto or Investment Scam",
    description:
      "Unsolicited offer of a high-return investment, crypto trading platform, or financial opportunity.",
    severity: "high",
    categoryId: "romance_wrong_number",
    detect: (t) =>
      /\b(crypto|bitcoin|ethereum|usdt|trading\s+platform|forex|investment\s+opportunity|high\s+return|guaranteed\s+(profit|return|income)|passive\s+income\s+from|let\s+me\s+show\s+you\s+how\s+to\s+(trade|invest))\b/i.test(t) &&
      /\b(earn|profit|return|income|invest|deposit|withdraw|platform|wallet|send)\b/i.test(t),
  },
  // ── Family Emergency ──────────────────────────────────────────────────────
  {
    id: "family_emergency_scam",
    label: "Family Emergency Scam",
    description:
      "Impersonates a family member or friend claiming to be in an emergency requiring urgent financial help.",
    severity: "high",
    categoryId: "family_emergency",
    detect: (t) =>
      /\b(i'?m\s+in\s+(trouble|danger|jail|hospital|accident)|i\s+was\s+(arrested|in\s+an\s+accident|hurt|robbed)|i\s+need\s+(bail|help|money|funds)\s+(right\s+now|urgently|immediately|asap))\b/i.test(t) ||
      (/\b(bail|lawyer\s+fee|hospital\s+bill|embassy|stuck\s+(abroad|overseas))\b/i.test(t) &&
        /\b(send|wire|transfer|gift\s+card|don'?t\s+tell|keep\s+(this\s+)?secret)\b/i.test(t)),
  },
  {
    id: "ai_voice_scam",
    label: "AI Voice or Impersonation Call Scam",
    description:
      "References a call or voice message from someone claiming to be a family member or official, possibly using AI-generated voice.",
    severity: "high",
    categoryId: "family_emergency",
    detect: (t) =>
      /\b(i\s+(called|tried\s+to\s+call|left\s+a\s+voicemail)|this\s+is\s+(your\s+(son|daughter|grandson|granddaughter|mom|dad|uncle|aunt)|a\s+lawyer|the\s+police|officer))\b/i.test(t) &&
      /\b(bail|emergency|money|transfer|send|gift\s+card|wire|urgent|don'?t\s+tell|secret)\b/i.test(t),
  },
  // ── Gift Card ─────────────────────────────────────────────────────────────
  {
    id: "gift_card_payment_scam",
    label: "Gift Card Payment Request",
    description:
      "Requests payment using gift cards (Google Play, iTunes, Amazon, Steam). No legitimate organization accepts gift cards as payment.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(gift\s+card|google\s+play\s+(card|gift)|itunes\s+(card|gift)|amazon\s+(gift|card)|steam\s+(card|gift)|prepaid\s+(card|code)|scratch.*card|card\s+number|card\s+code)\b/i.test(t),
  },
  // ── Subscription, Refund & Invoice Scams ─────────────────────────────────
  {
    id: "subscription_refund_scam",
    label: "Subscription Refund Scam",
    description:
      "The message claims a subscription, invoice, renewal, or refund issue and pushes the user to use a link or form to cancel or receive a refund.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(subscription\s+(renewal|renew|charge|fee|plan|billing)|annual\s+(protection|plan|renewal|subscription)|renewed\s+for|auto.?renew|unauthorized\s+charge|invoice\s+(id|number|#)|billing\s+support|cancellation\s+(form|link|request)|request\s+cancellation|receive\s+a\s+refund|refund\s+request|to\s+cancel.*click|click.*to\s+cancel|cancel\s+your\s+subscription|cancel\s+here)\b/i.test(t),
  },
  {
    id: "brand_impersonation",
    label: "Brand Impersonation",
    description:
      "The message appears to impersonate a known company or service. Verify directly through the official website.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) => {
      const hasBrand = /\b(norton|mcafee|paypal|amazon|walmart|microsoft|apple|netflix|geek\s*squad|best\s*buy|cash\s*app|venmo|chase|bank\s+of\s+america|usps|ups|fedex)\b/i.test(t)
      const hasSuspiciousContext = /\b(subscription|renewal|invoice|refund|billing|support|account|verify|confirm|cancel|reward|charge|click|link|form|update|secure|claim)\b/i.test(t)
      // Only flag when brand appears with suspicious context (not a normal mention)
      const hasLink = /https?:\/\//i.test(t)
      const hasUnsolicited = /\b(you\s+(have\s+been|were|are)\s+(charged|billed|renewed|selected)|your\s+(account|subscription|plan|protection)\s+(has\s+been|will\s+be|was)\s+(renewed|charged|billed|activated|updated)|we\s+(noticed|detected|found)|congratulations|you\s+won|your\s+order)\b/i.test(t)
      return hasBrand && hasSuspiciousContext && (hasLink || hasUnsolicited)
    },
  },
  {
    id: "billing_payment_pressure",
    label: "Billing or Payment Pressure",
    description:
      "Message references a charge, invoice, or payment in a way that creates pressure to act or provide financial details.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(renewed\s+for\s+\$[\d,.]+|charged\s+\$[\d,.]+|\$[\d,.]+\s+(charge|fee|renewal|invoice|billed)|annual\s+(fee|plan|charge)\s+of\s+\$|invoice\s+(amount|total|due)|payment\s+(of\s+)?\$[\d,.]+|card\s+(has\s+been|was)\s+(charged|billed)|original\s+purchase\s+amount|subscription\s+(amount|cost|price))\b/i.test(t),
  },
  {
    id: "card_info_request",
    label: "Personal or Card Information Request",
    description:
      "Requests personal or card details such as name, phone number, billing ZIP, card number, or last 4 digits to process a refund or cancellation.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(billing\s+zip(\s+code)?|billing\s+address|card\s+(used|number|ending|on\s+file)|last\s+4\s+digits|last\s+four\s+digits|payment\s+method|full\s+(name|card)|card\s+details|credit\s+card\s+information|debit\s+card\s+information|provide\s+your\s+(name|phone|card|billing)|confirm\s+your\s+(name|phone|billing|card|address))\b/i.test(t) &&
      /\b(refund|cancel|subscription|invoice|billing|renewal|verify|process|complete)\b/i.test(t),
  },
  // ── Prize & Reward ────────────────────────────────────────────────────────
  {
    id: "prize_reward_scam",
    label: "Prize or Reward Scam",
    description:
      "Appears to offer a prize, reward, or gift from a well-known brand. Legitimate companies do not ask for fees to release rewards.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(congratulations|congrats|you\s+(have\s+been|were|are)\s+(selected|chosen|picked|winner)|you\s+won|winner|reward\s+card|gift\s+card\s+reward|claim\s+(your\s+)?(reward|prize|gift)|reserved\s+for\s+you|you\s+qualify)\b/i.test(t) &&
      /\b(walmart|amazon|target|costco|paypal|cash\s*app|venmo|visa|mastercard|reward|prize|gift)\b/i.test(t),
  },
  {
    id: "fee_request",
    label: "Fee Request",
    description:
      "Requests a small fee, processing charge, shipping cost, or activation fee to release a prize, job, or refund. Legitimate rewards and offers do not require upfront fees.",
    severity: "high",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(processing\s+fee|shipping\s+(fee|cost|charge)|activation\s+fee|small\s+fee|handling\s+fee|release\s+fee|claim\s+fee|redemption\s+fee)\b/i.test(t) ||
      (/\b(pay|cover|submit|send)\b/i.test(t) &&
        /\b(\$\d+|\d+\s+dollars?|fee|charge|cost)\b/i.test(t) &&
        /\b(reward|prize|gift|job|refund|package|delivery|claim)\b/i.test(t)),
  },
  {
    id: "personal_info_request",
    label: "Personal Information Request",
    description:
      "Requests personal details such as full name, address, date of birth, or government ID to claim a reward or complete a process.",
    severity: "medium",
    categoryId: "banking_payment",
    detect: (t) =>
      /\b(full\s+name|date\s+of\s+birth|home\s+address|mailing\s+address|shipping\s+address|social\s+security|ssn|last\s+4\s+digits|government\s+id|id\s+number)\b/i.test(t) &&
      /\b(reward|claim|prize|verify|confirm|process|release|deliver)\b/i.test(t),
  },
  // ── Job & Internship — additional detectors ───────────────────────────────
  {
    id: "payroll_employer_impersonation",
    label: "Payroll or Employer Impersonation",
    description:
      "Impersonates an employer's payroll or HR department to obtain banking details or sensitive information.",
    severity: "high",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(payroll\s+(department|team|office|system|update|correction|issue)|hr\s+(department|team|office)|human\s+resources|finance\s+office|accounts\s+(payable|receivable))\b/i.test(t) &&
      /\b(bank\s+(account|details|info|number)|routing\s+number|direct\s+deposit|last\s+4\s+digits|verification\s+form|do\s+not\s+(call|contact)|cannot\s+call)\b/i.test(t),
  },
  {
    id: "fake_equipment_fee",
    label: "Fake Equipment Fee",
    description:
      "Asks a job applicant to purchase equipment, supplies, or a starter kit before starting work, often promising reimbursement.",
    severity: "high",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(purchase|buy|order|get|obtain)\b/i.test(t) &&
      /\b(equipment|laptop|computer|supplies|starter\s+kit|work\s+materials|tools|software|device)\b/i.test(t) &&
      /\b(reimburs|refund|paid\s+back|company\s+will\s+pay|get\s+it\s+back|advance)\b/i.test(t),
  },
  {
    id: "no_interview_required",
    label: "No Interview Required",
    description:
      "Job offer that skips any formal interview process. Legitimate employers verify candidates before offering positions.",
    severity: "medium",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(no\s+interview\s+(required|needed|necessary)|skip\s+the\s+interview|immediate(ly)?\s+(hire|hired|start)|hired\s+immediately|you\s+are\s+(hired|selected)\s+without|position\s+is\s+yours)\b/i.test(t),
  },
  {
    id: "unusual_pay_offer",
    label: "Unusual Pay Offer",
    description:
      "Promises unusually high pay, daily or weekly earnings, or easy money for minimal or vague work.",
    severity: "medium",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(earn\s+up\s+to|\$\s*\d{3,}\s*(per\s+day|\/day|a\s+day|per\s+week|\/week|a\s+week)|make\s+\$\d{3,}|easy\s+(money|earnings?|income)|passive\s+income|simple\s+tasks.*high\s+pay|high\s+pay.*simple\s+tasks)\b/i.test(t),
  },
  {
    id: "money_transfer_request",
    label: "Money Transfer Request",
    description:
      "Asks for money to be sent via Zelle, Cash App, Venmo, wire transfer, or cryptocurrency as part of a job or offer.",
    severity: "high",
    categoryId: "job_internship",
    detect: (t) =>
      /\b(zelle|cash\s*app|venmo|wire\s+transfer|western\s+union|moneygram|send\s+money|transfer\s+funds|bitcoin|crypto\s+(payment|transfer))\b/i.test(t) &&
      /\b(job|offer|hired|work|task|assignment|equipment|purchase|buy|deposit)\b/i.test(t),
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export function getCategoryById(id: string): ScamCategory | undefined {
  return SCAM_CATEGORIES.find((c) => c.id === id)
}

export function getDetectorsByCategory(categoryId: string): ScamPatternDetector[] {
  return PATTERN_LIBRARY_DETECTORS.filter((d) => d.categoryId === categoryId)
}

export function getAllDetectors(): ScamPatternDetector[] {
  return PATTERN_LIBRARY_DETECTORS
}
