export type PracticeScenarioFormat =
  | "sms"
  | "email"
  | "social"
  | "invoice"
  | "notice"
  | "image"
  | "pdf"

export type PracticeRiskLevel = "low" | "suspicious" | "high"
export type PracticeDifficulty = "Beginner" | "Intermediate" | "Advanced"

export interface PracticeWarningOption {
  id: string
  label: string
  why: string
}

export interface PracticeScenario {
  id: string
  format: PracticeScenarioFormat
  title: string
  hiddenCategory: string
  difficulty: PracticeDifficulty
  riskLevel: PracticeRiskLevel
  content: {
    sender?: string
    subject?: string
    body: string
    footer?: string
    link?: string
    amount?: string
    attachmentName?: string
  }
  warningOptions: PracticeWarningOption[]
  correctWarningIds: string[]
  explanation: string
  safeAction: string
  relatedLessonId: string
  relatedLessonLabel: string
}

const warningLibrary: Record<string, PracticeWarningOption> = {
  suspicious_link: {
    id: "suspicious_link",
    label: "Suspicious or unofficial link",
    why: "The link may use familiar words but does not clearly match the official website.",
  },
  credential_login: {
    id: "credential_login",
    label: "Asks you to log in or verify an account",
    why: "Fake login pages are used to steal usernames, passwords, or account access.",
  },
  urgency: {
    id: "urgency",
    label: "Urgent deadline or pressure",
    why: "Scammers create urgency so people act before verifying.",
  },
  threat: {
    id: "threat",
    label: "Threat or scary consequence",
    why: "Threats like suspension, arrest, shutoff, or account closure are used to trigger panic.",
  },
  personal_info: {
    id: "personal_info",
    label: "Asks for personal information",
    why: "Unexpected requests for private details can lead to identity theft or account takeover.",
  },
  payment_request: {
    id: "payment_request",
    label: "Unexpected payment request",
    why: "Scammers often ask for money through fake fees, fines, deposits, or balances.",
  },
  gift_cards: {
    id: "gift_cards",
    label: "Gift card request",
    why: "Gift cards are hard to recover once the numbers are shared.",
  },
  secrecy: {
    id: "secrecy",
    label: "Secrecy request",
    why: "Scammers isolate people by telling them not to tell family, coworkers, banks, or support.",
  },
  avoid_official: {
    id: "avoid_official",
    label: "Tells you to avoid official channels",
    why: "A message that says not to call the real office, bank, or support team is suspicious.",
  },
  verification_code: {
    id: "verification_code",
    label: "Asks for a verification code",
    why: "Verification codes are for you only. Sharing them can give someone access to your account.",
  },
  too_good: {
    id: "too_good",
    label: "Too-good-to-be-true offer",
    why: "Huge rewards, easy money, or guaranteed returns are common scam hooks.",
  },
  unusual_payment: {
    id: "unusual_payment",
    label: "Unusual payment method",
    why: "Zelle, Cash App, crypto, wire transfers, and gift cards are often hard to reverse.",
  },
  safe_official: {
    id: "safe_official",
    label: "Uses official verification steps",
    why: "A safer message tells you to use official apps, websites, portals, or known phone numbers.",
  },
  normal_context: {
    id: "normal_context",
    label: "Normal expected context",
    why: "Not every reminder is suspicious. Expected messages with official verification language can be low risk.",
  },
  unknown_sender: {
    id: "unknown_sender",
    label: "Unknown or unexpected sender",
    why: "Unexpected contact should be verified before trusting.",
  },
  investment_bait: {
    id: "investment_bait",
    label: "Investment or crypto bait",
    why: "Scammers often move friendly chats toward trading, crypto, or private investment platforms.",
  },
  unverified_platform: {
    id: "unverified_platform",
    label: "Unverified platform, mentor, or seller",
    why: "A stranger recommending a private platform, mentor, listing, or seller is a strong warning sign.",
  },
  fake_authority: {
    id: "fake_authority",
    label: "Pretends to be an authority",
    why: "Scammers impersonate banks, agencies, companies, schools, utilities, or support teams.",
  },
  tiny_fee: {
    id: "tiny_fee",
    label: "Small fee used as bait",
    why: "Tiny fees can be used to collect card details or personal information.",
  },
  upfront_fee: {
    id: "upfront_fee",
    label: "Upfront fee before receiving something",
    why: "A required fee before a job, prize, rental, refund, or benefit is a common scam pattern.",
  },
  remote_access: {
    id: "remote_access",
    label: "Requests remote access",
    why: "Remote access can allow someone to control your device, view accounts, or steal information.",
  },
  malware_download: {
    id: "malware_download",
    label: "Asks you to download software",
    why: "Unexpected downloads can install unsafe apps, remote tools, or malware.",
  },
  sensitive_docs: {
    id: "sensitive_docs",
    label: "Requests sensitive documents",
    why: "SSNs, IDs, passports, bank details, and tax forms should only be shared through verified channels.",
  },
  asks_to_call_number: {
    id: "asks_to_call_number",
    label: "Pushes you to call a number in the message",
    why: "Fake support numbers can connect you directly to scammers.",
  },
  fake_invoice: {
    id: "fake_invoice",
    label: "Unexpected invoice or charge",
    why: "Fake invoices create panic and push people to call, pay, or share information.",
  },
  wrong_number: {
    id: "wrong_number",
    label: "Wrong-number conversation starter",
    why: "Some scams begin with a casual wrong-number message and slowly build trust.",
  },
  overpayment: {
    id: "overpayment",
    label: "Overpayment or fake check setup",
    why: "Overpayment scams often ask you to send money back before the original payment fails.",
  },
  emotional_manipulation: {
    id: "emotional_manipulation",
    label: "Emotional manipulation",
    why: "Scammers use fear, love, guilt, sympathy, or urgency to lower your guard.",
  },
  out_of_context: {
    id: "out_of_context",
    label: "Message feels out of context",
    why: "A message can be suspicious when it does not match what you were expecting.",
  },
  payment_change: {
    id: "payment_change",
    label: "Changed payment details",
    why: "New bank details, new payment instructions, or changed wiring instructions should be verified separately.",
  },
  ai_or_fake_media: {
    id: "ai_or_fake_media",
    label: "Possible fake media or impersonation",
    why: "AI-generated images, cloned voices, and fake profiles can make impersonation harder to notice.",
  },
  qr_code_risk: {
    id: "qr_code_risk",
    label: "QR code hides the destination",
    why: "QR codes can send users to unsafe payment or login pages without showing the URL first.",
  },
}

type ScenarioSeed = Omit<PracticeScenario, "warningOptions">

function buildOptions(correctIds: string[], decoyIds: string[]) {
  const ids = [...correctIds, ...decoyIds].filter((id, index, arr) => arr.indexOf(id) === index)

  return ids
    .map((id) => warningLibrary[id])
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label))
}

function makeScenario(
  seed: ScenarioSeed & { decoyWarningIds: string[] },
): PracticeScenario {
  return {
    ...seed,
    warningOptions: buildOptions(seed.correctWarningIds, seed.decoyWarningIds),
  }
}

const seeds: Array<ScenarioSeed & { decoyWarningIds: string[] }> = [
  {
    id: "launch-001",
    format: "email",
    title: "Review This Situation",
    hiddenCategory: "Cloud Storage Phishing",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "File Share",
      subject: "Document shared with you",
      body: "A protected document has been shared with you. Sign in before access expires today: https://shared-document-review.loginsecure.net",
    },
    correctWarningIds: ["credential_login", "suspicious_link", "urgency", "fake_authority"],
    decoyWarningIds: ["gift_cards", "remote_access", "overpayment", "tiny_fee"],
    explanation: "This looks like a normal file-sharing alert, but it pushes the user to sign in through an unofficial link.",
    safeAction: "Open the official cloud storage app or website directly instead of using the message link.",
    relatedLessonId: "phishing-fake-websites",
    relatedLessonLabel: "Phishing & Fake Websites",
  },
  {
    id: "launch-002",
    format: "sms",
    title: "Pause Before You Trust",
    hiddenCategory: "Bank Impersonation",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Card Services",
      subject: "Account Review",
      body: "We blocked a card update request. Review your account before 6 PM to prevent restrictions: https://card-review-secure.accountdesk.net",
    },
    correctWarningIds: ["fake_authority", "suspicious_link", "urgency", "threat"],
    decoyWarningIds: ["gift_cards", "wrong_number", "remote_access", "overpayment"],
    explanation: "This uses bank-like language, a fake-looking link, and a deadline to pressure quick action.",
    safeAction: "Open the official banking app or call the number on the back of the card.",
    relatedLessonId: "phishing-fake-websites",
    relatedLessonLabel: "Phishing & Fake Websites",
  },
  {
    id: "launch-003",
    format: "email",
    title: "Spot the Signals",
    hiddenCategory: "Changed Payment Details Scam",
    difficulty: "Advanced",
    riskLevel: "high",
    content: {
      sender: "Vendor Billing",
      subject: "Updated invoice instructions",
      body: "This invoice was not expected. Please use the attached invoice for this month. Our banking details changed last week, so payment should be sent to the new account listed on page two.",
      attachmentName: "invoice-may.pdf",
    },
    correctWarningIds: ["fake_invoice", "payment_change", "payment_request", "out_of_context"],
    decoyWarningIds: ["gift_cards", "verification_code", "wrong_number", "remote_access"],
    explanation: "A changed payment instruction can be a business email compromise attempt, especially when it appears unexpectedly.",
    safeAction: "Verify payment changes using a trusted phone number already on file, not the email thread.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-004",
    format: "social",
    title: "Real-Life Style Check",
    hiddenCategory: "Wrong-Number Investment Scam",
    difficulty: "Advanced",
    riskLevel: "high",
    content: {
      sender: "New Contact",
      subject: "Wrong chat",
      body: "Sorry, wrong chat. You seem kind though. My mentor has a private trading group opening tonight, and returns have been much higher than normal exchanges.",
    },
    correctWarningIds: ["wrong_number", "investment_bait", "unverified_platform", "too_good", "urgency"],
    decoyWarningIds: ["gift_cards", "remote_access", "verification_code", "fake_invoice"],
    explanation: "Wrong-number investment scams often begin casually, build trust, then introduce crypto or trading opportunities.",
    safeAction: "Do not invest through a stranger, private mentor, or invite-only platform.",
    relatedLessonId: "social-engineering",
    relatedLessonLabel: "Social Engineering",
  },
  {
    id: "launch-005",
    format: "sms",
    title: "What Would You Notice?",
    hiddenCategory: "Family Emergency Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Unknown Number",
      subject: "Please read",
      body: "This is my new number. I’m in trouble and can’t talk. Please do not call my old number. Send Steam gift card codes and keep this between us for now.",
    },
    correctWarningIds: ["unknown_sender", "emotional_manipulation", "gift_cards", "secrecy", "avoid_official"],
    decoyWarningIds: ["suspicious_link", "credential_login", "tiny_fee", "overpayment"],
    explanation: "This uses fear, secrecy, and gift cards to pressure the user before they verify the person’s identity.",
    safeAction: "Call the person using their known number or contact another trusted family member.",
    relatedLessonId: "social-engineering",
    relatedLessonLabel: "Social Engineering",
  },
  {
    id: "launch-006",
    format: "notice",
    title: "Review This Situation",
    hiddenCategory: "Tech Support Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Security Center",
      subject: "Device warning",
      body: "Unusual activity detected. A support technician can help secure your device. Download the support tool and keep the session open until the scan finishes: https://device-care-support.download",
    },
    correctWarningIds: ["fake_authority", "suspicious_link", "malware_download", "remote_access"],
    decoyWarningIds: ["gift_cards", "overpayment", "wrong_number", "tiny_fee"],
    explanation: "This pushes the user toward a download and possible remote access under the appearance of device security.",
    safeAction: "Do not download support tools from popups or unknown messages. Use official device support.",
    relatedLessonId: "device-app-safety",
    relatedLessonLabel: "Device & App Safety",
  },
  {
    id: "launch-007",
    format: "email",
    title: "Spot the Signals",
    hiddenCategory: "Fake Job Offer",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Hiring Desk",
      subject: "Remote role approval",
      body: "Your profile was selected for a remote assistant role at $36/hour. No interview is needed. The refundable equipment setup fee must be paid today through Apple Pay.",
    },
    correctWarningIds: ["too_good", "upfront_fee", "payment_request", "unusual_payment", "urgency"],
    decoyWarningIds: ["gift_cards", "suspicious_link", "verification_code", "remote_access"],
    explanation: "The high pay, no interview, and upfront fee make this a fake job pattern.",
    safeAction: "Do not pay to start a job. Verify roles through the company’s official careers page.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-008",
    format: "sms",
    title: "Practice Scenario",
    hiddenCategory: "Delivery Phishing",
    difficulty: "Beginner",
    riskLevel: "high",
    content: {
      sender: "Delivery Notice",
      subject: "Package hold",
      body: "Your package label is incomplete. Confirm address and pay the $0.30 redelivery fee today: https://delivery-label-update.addressconfirm.net",
    },
    correctWarningIds: ["fake_authority", "suspicious_link", "tiny_fee", "payment_request", "personal_info", "urgency"],
    decoyWarningIds: ["gift_cards", "remote_access", "verification_code", "wrong_number"],
    explanation: "This uses a tiny fee, address confirmation, and a suspicious delivery link to collect payment or personal data.",
    safeAction: "Use the official carrier website or the store’s order page to track delivery.",
    relatedLessonId: "phishing-fake-websites",
    relatedLessonLabel: "Phishing & Fake Websites",
  },
  {
    id: "launch-009",
    format: "email",
    title: "Real-Life Style Check",
    hiddenCategory: "Refund Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Billing Support",
      subject: "Duplicate renewal",
      body: "Your protection plan renewed for $399.99. If this was not authorized, call the billing desk today. Do not contact your bank while the refund is being processed.",
    },
    correctWarningIds: ["fake_invoice", "asks_to_call_number", "urgency", "avoid_official"],
    decoyWarningIds: ["gift_cards", "suspicious_link", "wrong_number", "overpayment"],
    explanation: "Refund scams use fake charges and phone numbers to move users into a scammer-controlled conversation.",
    safeAction: "Do not call numbers from unexpected billing messages. Check the real account directly.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-010",
    format: "social",
    title: "Pause Before You Trust",
    hiddenCategory: "Romance Scam",
    difficulty: "Advanced",
    riskLevel: "high",
    content: {
      sender: "Online Friend",
      subject: "Need help",
      body: "I cannot video call because of my work, but I really trust you. I need help with a travel fee today through crypto. Please do not involve your family.",
    },
    correctWarningIds: ["emotional_manipulation", "payment_request", "unusual_payment", "urgency", "secrecy"],
    decoyWarningIds: ["suspicious_link", "verification_code", "fake_invoice", "remote_access"],
    explanation: "This mixes emotional closeness, secrecy, urgency, and an unusual payment method.",
    safeAction: "Do not send money to an online relationship you have not verified. Talk to someone trusted first.",
    relatedLessonId: "social-engineering",
    relatedLessonLabel: "Social Engineering",
  },
  {
    id: "launch-011",
    format: "sms",
    title: "Review This Situation",
    hiddenCategory: "MFA Code Theft",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Account Help",
      subject: "Login help",
      body: "We are stopping an unauthorized login. Reply with the verification code you just received immediately so we can cancel the request before the account locks.",
    },
    correctWarningIds: ["verification_code", "fake_authority", "urgency"],
    decoyWarningIds: ["gift_cards", "tiny_fee", "overpayment", "wrong_number"],
    explanation: "A verification code request is a major warning sign. Sharing it can give someone account access.",
    safeAction: "Never share verification codes. Go directly to the official account security page.",
    relatedLessonId: "passwords-mfa-account-safety",
    relatedLessonLabel: "Passwords, MFA & Account Safety",
  },
  {
    id: "launch-012",
    format: "image",
    title: "Spot the Signals",
    hiddenCategory: "QR Code Phishing",
    difficulty: "Intermediate",
    riskLevel: "suspicious",
    content: {
      sender: "Parking Sign",
      subject: "Scan to pay",
      body: "A parking sign has a QR sticker placed over the original code. The payment page opens with a domain that does not match the city or parking company.",
    },
    correctWarningIds: ["qr_code_risk", "suspicious_link", "payment_request", "unverified_platform", "out_of_context"],
    decoyWarningIds: ["gift_cards", "verification_code", "remote_access", "overpayment"],
    explanation: "QR codes can hide the destination, especially if a sticker appears placed over the original sign.",
    safeAction: "Use the official parking app or website instead of trusting a random QR code.",
    relatedLessonId: "phishing-fake-websites",
    relatedLessonLabel: "Phishing & Fake Websites",
  },
  {
    id: "launch-013",
    format: "email",
    title: "Practice Scenario",
    hiddenCategory: "Safe Official Reminder",
    difficulty: "Beginner",
    riskLevel: "low",
    content: {
      sender: "Account Services",
      subject: "Statement available",
      body: "Your monthly statement is available. For your safety, this message does not include payment links. Please open the official app or visit the official website directly.",
    },
    correctWarningIds: ["safe_official", "normal_context"],
    decoyWarningIds: ["urgency", "suspicious_link", "payment_request", "gift_cards"],
    explanation: "This message avoids links and directs the user to official channels, which is a safer pattern.",
    safeAction: "If expected, open the official app or website directly.",
    relatedLessonId: "safe-verification-habits",
    relatedLessonLabel: "Safe Verification Habits",
  },
  {
    id: "launch-014",
    format: "email",
    title: "Review This Situation",
    hiddenCategory: "Identity Information Harvesting",
    difficulty: "Advanced",
    riskLevel: "high",
    content: {
      sender: "Document Review",
      subject: "Application hold",
      body: "Your application is paused until identity documents are uploaded today. Please return the attached form with SSN, date of birth, bank name, and photo ID.",
      attachmentName: "identity-review-form.pdf",
    },
    correctWarningIds: ["sensitive_docs", "personal_info", "urgency"],
    decoyWarningIds: ["gift_cards", "wrong_number", "verification_code", "remote_access"],
    explanation: "The message asks for highly sensitive personal documents through an unexpected process.",
    safeAction: "Verify the organization through an official channel before sharing identity documents.",
    relatedLessonId: "identity-protection",
    relatedLessonLabel: "Identity Protection",
  },
  {
    id: "launch-015",
    format: "social",
    title: "What Would You Notice?",
    hiddenCategory: "Marketplace Overpayment Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Interested Buyer",
      subject: "Payment sent",
      body: "I sent extra by mistake. Please send the difference back through Zelle before the pickup person arrives.",
    },
    correctWarningIds: ["overpayment", "payment_request", "unusual_payment", "urgency"],
    decoyWarningIds: ["gift_cards", "suspicious_link", "remote_access", "credential_login"],
    explanation: "Overpayment scams ask you to send money back before the original payment fails or reverses.",
    safeAction: "Do not send money back. Use safe marketplace payment methods and wait for verified payment.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-016",
    format: "sms",
    title: "Pause Before You Trust",
    hiddenCategory: "Utility Shutoff Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Service Department",
      subject: "Payment required",
      body: "A technician is scheduled for disconnection today. Send payment confirmation through Zelle immediately to keep service active.",
    },
    correctWarningIds: ["fake_authority", "threat", "payment_request", "unusual_payment", "urgency"],
    decoyWarningIds: ["verification_code", "wrong_number", "overpayment", "remote_access"],
    explanation: "This uses a shutoff threat and an unusual payment method to pressure fast payment.",
    safeAction: "Call the utility company using the number on your bill or official website.",
    relatedLessonId: "social-engineering",
    relatedLessonLabel: "Social Engineering",
  },
  {
    id: "launch-017",
    format: "email",
    title: "Real-Life Style Check",
    hiddenCategory: "Payroll Phishing",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Payroll Review",
      subject: "Direct deposit confirmation",
      body: "Your payment may be delayed unless direct deposit details are confirmed today. Log in through the secure review form and do not call the main office because they cannot access this form.",
    },
    correctWarningIds: ["fake_authority", "personal_info", "urgency", "avoid_official", "credential_login"],
    decoyWarningIds: ["gift_cards", "wrong_number", "overpayment", "remote_access"],
    explanation: "This impersonates payroll and discourages official verification, which is a strong warning sign.",
    safeAction: "Use the official work or school portal, or contact payroll through verified contact information.",
    relatedLessonId: "phishing-fake-websites",
    relatedLessonLabel: "Phishing & Fake Websites",
  },
  {
    id: "launch-018",
    format: "email",
    title: "Spot the Signals",
    hiddenCategory: "Fake Rental Listing",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Property Contact",
      subject: "Apartment hold",
      body: "The unit is still available below market price. I am traveling, so do not contact the office. You can reserve it today with a deposit through Cash App, and I will mail the keys after payment.",
    },
    correctWarningIds: ["too_good", "payment_request", "unusual_payment", "urgency", "avoid_official"],
    decoyWarningIds: ["verification_code", "suspicious_link", "remote_access", "fake_invoice"],
    explanation: "Rental scams often use low prices, distance excuses, and deposits before viewing the property.",
    safeAction: "Do not send deposits before verifying the property, ownership, and lease.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-019",
    format: "email",
    title: "Review This Situation",
    hiddenCategory: "Charity Impersonation",
    difficulty: "Intermediate",
    riskLevel: "suspicious",
    content: {
      sender: "Relief Fund",
      subject: "Urgent donation request",
      body: "Families need help tonight. Donations are being collected through a personal payment account so supplies can be purchased immediately.",
    },
    correctWarningIds: ["emotional_manipulation", "urgency", "payment_request", "unusual_payment"],
    decoyWarningIds: ["verification_code", "remote_access", "overpayment", "credential_login"],
    explanation: "Charity scams often use real emotions and urgency while routing money through unsafe or unverified channels.",
    safeAction: "Donate through verified charity websites or established organizations.",
    relatedLessonId: "safe-verification-habits",
    relatedLessonLabel: "Safe Verification Habits",
  },
  {
    id: "launch-020",
    format: "email",
    title: "Practice Scenario",
    hiddenCategory: "Medical Billing Phishing",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Patient Billing",
      subject: "Insurance review needed",
      body: "Your insurance claim is on hold. Upload ID, date of birth, insurance number, and payment details today: https://patient-claim-review.healthdesk.net",
    },
    correctWarningIds: ["fake_authority", "personal_info", "suspicious_link", "payment_request", "urgency"],
    decoyWarningIds: ["gift_cards", "wrong_number", "remote_access", "overpayment"],
    explanation: "Medical phishing can target identity, insurance, payment, or portal login information.",
    safeAction: "Use the official patient portal or call the provider using a verified number.",
    relatedLessonId: "identity-protection",
    relatedLessonLabel: "Identity Protection",
  },
  {
    id: "launch-021",
    format: "email",
    title: "Review This Situation",
    hiddenCategory: "Online Shopping Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Shop Support",
      subject: "Order discount",
      body: "Your order qualifies for a 60% discount if payment is completed through this alternate checkout link today: https://shop-deal-pay.securecheckout-offers.net",
    },
    correctWarningIds: ["too_good", "suspicious_link", "payment_request", "urgency", "unverified_platform"],
    decoyWarningIds: ["gift_cards", "remote_access", "verification_code", "overpayment"],
    explanation: "Shopping scams often use large discounts and alternate checkout links to push payment outside trusted channels.",
    safeAction: "Buy only through the official store or trusted marketplace checkout.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-022",
    format: "sms",
    title: "Spot the Signals",
    hiddenCategory: "Toll Payment Scam",
    difficulty: "Beginner",
    riskLevel: "high",
    content: {
      sender: "Road Billing",
      subject: "Unpaid toll",
      body: "Your vehicle has a toll balance of $4.35. Pay today to avoid a $75 penalty: https://toll-balance-review.paynotice.net",
    },
    correctWarningIds: ["fake_authority", "tiny_fee", "payment_request", "threat", "urgency", "suspicious_link"],
    decoyWarningIds: ["gift_cards", "remote_access", "wrong_number", "overpayment"],
    explanation: "Toll scams use small balances, penalty threats, and unofficial payment links.",
    safeAction: "Check toll balances only through the official toll authority website.",
    relatedLessonId: "phishing-fake-websites",
    relatedLessonLabel: "Phishing & Fake Websites",
  },
  {
    id: "launch-023",
    format: "email",
    title: "What Would You Notice?",
    hiddenCategory: "Tax Refund Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Refund Department",
      subject: "Refund release",
      body: "You may be eligible for a $1,240 refund. Confirm SSN, filing address, and direct deposit details today: https://refund-release-taxdesk.net",
    },
    correctWarningIds: ["fake_authority", "too_good", "personal_info", "suspicious_link", "urgency"],
    decoyWarningIds: ["gift_cards", "remote_access", "overpayment", "wrong_number"],
    explanation: "Tax refund scams use fake refund promises to collect SSNs, bank details, and identity information.",
    safeAction: "Check tax refund status only through official government websites.",
    relatedLessonId: "identity-protection",
    relatedLessonLabel: "Identity Protection",
  },
  {
    id: "launch-024",
    format: "social",
    title: "Pause Before You Trust",
    hiddenCategory: "AI Voice or Deepfake Impersonation",
    difficulty: "Advanced",
    riskLevel: "high",
    content: {
      sender: "Voice Message",
      subject: "Urgent help",
      body: "A short voice message sounds like a family member saying they are in trouble and need money immediately. The caller refuses a video call, says do not call anyone else, and asks you to keep this private.",
    },
    correctWarningIds: ["ai_or_fake_media", "emotional_manipulation", "urgency", "secrecy", "avoid_official"],
    decoyWarningIds: ["suspicious_link", "tiny_fee", "credential_login", "overpayment"],
    explanation: "AI voice or impersonation scams can sound convincing, but secrecy and refusal to verify are major warning signs.",
    safeAction: "Use a known phone number or family code word before taking action.",
    relatedLessonId: "social-engineering",
    relatedLessonLabel: "Social Engineering",
  },
  {
    id: "launch-025",
    format: "email",
    title: "Real-Life Style Check",
    hiddenCategory: "Travel Booking Scam",
    difficulty: "Intermediate",
    riskLevel: "suspicious",
    content: {
      sender: "Travel Deals",
      subject: "Last room available",
      body: "A resort package is listed at half the normal price, but the agent says payment must be sent by bank transfer today to keep the reservation.",
    },
    correctWarningIds: ["too_good", "payment_request", "unusual_payment", "urgency", "unverified_platform"],
    decoyWarningIds: ["verification_code", "gift_cards", "remote_access", "credential_login"],
    explanation: "Travel scams often use limited-time deals and payment methods that are hard to reverse.",
    safeAction: "Book through verified travel sites and pay through protected checkout methods.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-026",
    format: "email",
    title: "Review This Situation",
    hiddenCategory: "Health Product Scam",
    difficulty: "Intermediate",
    riskLevel: "suspicious",
    content: {
      sender: "Wellness Offer",
      subject: "Limited health trial",
      body: "A supplement trial is free today, but you must enter card details for shipping and agree before the offer closes.",
    },
    correctWarningIds: ["too_good", "tiny_fee", "payment_request", "urgency"],
    decoyWarningIds: ["verification_code", "remote_access", "overpayment", "wrong_number"],
    explanation: "Health product scams can use free trials, small shipping fees, and rushed checkout to collect payment details.",
    safeAction: "Research the company and terms before entering card information.",
    relatedLessonId: "safe-verification-habits",
    relatedLessonLabel: "Safe Verification Habits",
  },
  {
    id: "launch-027",
    format: "sms",
    title: "Spot the Signals",
    hiddenCategory: "Account Recovery Scam",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Profile Help",
      subject: "Account recovery",
      body: "We can restore your account now. Send the code that was texted to you and do not try logging in until support finishes.",
    },
    correctWarningIds: ["verification_code", "fake_authority", "avoid_official", "urgency"],
    decoyWarningIds: ["gift_cards", "tiny_fee", "overpayment", "wrong_number"],
    explanation: "A request for a verification code can allow someone to take over your account.",
    safeAction: "Never share codes. Use the official account recovery page directly.",
    relatedLessonId: "passwords-mfa-account-safety",
    relatedLessonLabel: "Passwords, MFA & Account Safety",
  },
  {
    id: "launch-028",
    format: "invoice",
    title: "Practice Scenario",
    hiddenCategory: "Fake Invoice Scam",
    difficulty: "Advanced",
    riskLevel: "high",
    content: {
      sender: "Accounts Team",
      subject: "Past due invoice",
      body: "Attached invoice shows a service charge that was not expected. The note says payment is overdue today and must be wired to a new account to avoid interruption.",
      attachmentName: "service-invoice.pdf",
    },
    correctWarningIds: ["fake_invoice", "payment_change", "payment_request", "urgency", "out_of_context"],
    decoyWarningIds: ["gift_cards", "verification_code", "remote_access", "wrong_number"],
    explanation: "Unexpected invoices with changed payment instructions should be verified independently.",
    safeAction: "Confirm invoices and payment changes through trusted contact information already on file.",
    relatedLessonId: "payment-money-scams",
    relatedLessonLabel: "Payment & Money Scams",
  },
  {
    id: "launch-029",
    format: "social",
    title: "Review This Situation",
    hiddenCategory: "Fake Social Media Support",
    difficulty: "Intermediate",
    riskLevel: "high",
    content: {
      sender: "Support Agent",
      subject: "Page verification",
      body: "Your page may be removed today for policy violations. Send your login email and the code you receive so we can verify ownership before removal.",
    },
    correctWarningIds: ["fake_authority", "credential_login", "verification_code", "threat", "urgency"],
    decoyWarningIds: ["gift_cards", "tiny_fee", "overpayment", "remote_access"],
    explanation: "Fake support messages often request login details or verification codes to take over accounts.",
    safeAction: "Use the platform’s official help center and never share codes.",
    relatedLessonId: "passwords-mfa-account-safety",
    relatedLessonLabel: "Passwords, MFA & Account Safety",
  },
  {
    id: "launch-030",
    format: "email",
    title: "Pause Before You Trust",
    hiddenCategory: "Safe Portal Notification",
    difficulty: "Beginner",
    riskLevel: "low",
    content: {
      sender: "Member Services",
      subject: "Portal notice",
      body: "A new notice is available in your account portal. For security, please open the official app or type the official website into your browser.",
    },
    correctWarningIds: ["safe_official", "normal_context"],
    decoyWarningIds: ["urgency", "suspicious_link", "payment_request", "remote_access"],
    explanation: "This is a safer pattern because it avoids direct links and points to official access methods.",
    safeAction: "If expected, open the official app or website directly.",
    relatedLessonId: "safe-verification-habits",
    relatedLessonLabel: "Safe Verification Habits",
  },
]

export const practiceScenarios: PracticeScenario[] = seeds.map(makeScenario)

export function getPracticeScenarioCount() {
  return practiceScenarios.length
}
