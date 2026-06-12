export interface MonthlyModule {
  id: string
  title: string
  month: string
  scamType: string
  audience: string
  description: string
  exampleMessage: string
  redFlags: string[]
  safeActions: string[]
  relatedLessonIds: string[]
  practiceScenarioIds: string[]
  checklistItems: string[]
  familyDiscussionPrompt: string
}

export const monthlyModules: MonthlyModule[] = [
  {
    id: "fake-delivery-texts",
    title: "Fake Delivery Texts",
    month: "Starter Module",
    scamType: "Delivery and shopping scams",
    audience: "Families, students, and everyday phone users",
    description: "Practice spotting package and delivery messages that use small fees, odd links, or urgent deadlines.",
    exampleMessage: "Package held. Pay $0.30 today to avoid return: delivery-label-update.example",
    redFlags: ["Small fee", "Unfamiliar link", "Deadline pressure"],
    safeActions: ["Use the carrier or store website directly.", "Do not pay delivery fees through text links."],
    relatedLessonIds: ["phishing-fake-websites"],
    practiceScenarioIds: ["launch-008", "launch-022"],
    checklistItems: [
      "Open the carrier or store website yourself.",
      "Do not pay delivery fees through message links.",
      "Look at the real domain before trusting a page.",
      "Ask someone trusted when a message feels rushed.",
    ],
    familyDiscussionPrompt: "Where does your family usually check package tracking information?",
  },
  {
    id: "fake-job-recruiter",
    title: "Fake Job Recruiter Message",
    month: "Module 2",
    scamType: "Job and school scams",
    audience: "Students, job seekers, and remote workers",
    description: "Learn how fake recruiters use high pay, no interview, and equipment fees to pressure people.",
    exampleMessage: "You are selected for a remote assistant job. No interview needed. Pay the refundable equipment fee today.",
    redFlags: ["No interview", "Upfront equipment fee", "High pay for vague work"],
    safeActions: ["Verify through the company's official careers page.", "Never pay to start a job."],
    relatedLessonIds: ["payment-money-scams"],
    practiceScenarioIds: ["launch-007", "launch-017"],
    checklistItems: [
      "Search the company separately.",
      "Check whether the job appears on the official careers page.",
      "Do not pay equipment or onboarding fees.",
      "Do not share bank details before a verified hiring process.",
    ],
    familyDiscussionPrompt: "Who would you ask before accepting a job offer by text?",
  },
  {
    id: "fake-toll-text",
    title: "Fake Toll or Traffic Fine Text",
    month: "Module 3",
    scamType: "Payment pressure scams",
    audience: "Drivers and families sharing vehicles",
    description: "Spot toll texts that use tiny balances, penalty threats, and payment links.",
    exampleMessage: "Your vehicle has a toll balance of $4.35. Pay today to avoid a $75 penalty.",
    redFlags: ["Tiny balance", "Large penalty threat", "Payment link"],
    safeActions: ["Check the official toll website.", "Do not pay from a text link."],
    relatedLessonIds: ["phishing-fake-websites", "payment-money-scams"],
    practiceScenarioIds: ["launch-022"],
    checklistItems: [
      "Look up the toll agency yourself.",
      "Do not trust a payment link just because the amount is small.",
      "Check vehicle or account records directly.",
    ],
    familyDiscussionPrompt: "How would your family verify a toll charge?",
  },
  {
    id: "fake-bank-alert",
    title: "Fake Bank Alert",
    month: "Module 4",
    scamType: "Account alerts",
    audience: "Bank and payment app users",
    description: "Learn how fake account alerts use locked-account threats and verification links.",
    exampleMessage: "Bank alert: your account is locked. Verify immediately or access will be suspended.",
    redFlags: ["Account threat", "Urgent verification", "Message link"],
    safeActions: ["Open the banking app directly.", "Call the number on your card if needed."],
    relatedLessonIds: ["phishing-fake-websites", "passwords-mfa-account-safety"],
    practiceScenarioIds: ["launch-002", "launch-011"],
    checklistItems: [
      "Do not click bank links in unexpected messages.",
      "Never share verification codes.",
      "Use the official app or card phone number.",
    ],
    familyDiscussionPrompt: "Who in your family would you ask before responding to a bank alert?",
  },
  {
    id: "fake-family-emergency",
    title: "Fake Family Emergency Message",
    month: "Module 5",
    scamType: "Family emergency scams",
    audience: "Parents, grandparents, teens, and family groups",
    description: "Practice slowing down when a message claims someone is in trouble.",
    exampleMessage: "I'm in trouble and cannot talk. Please send gift cards and do not tell anyone.",
    redFlags: ["Scary emergency", "Secrecy", "Gift card request"],
    safeActions: ["Call the person on a known number.", "Ask another family member to help verify."],
    relatedLessonIds: ["social-engineering", "safe-verification-habits"],
    practiceScenarioIds: ["launch-005", "launch-024"],
    checklistItems: [
      "Do not keep emergency money requests secret.",
      "Call a known number.",
      "Use a family code word or verification question.",
    ],
    familyDiscussionPrompt: "What family rule would help you verify an emergency?",
  },
  {
    id: "fake-gaming-warning",
    title: "Fake Gaming Account Warning",
    month: "Module 6",
    scamType: "Gaming and social media scams",
    audience: "Children, teens, parents, and gamers",
    description: "Learn how account-ban threats can pressure players into sharing passwords or codes.",
    exampleMessage: "Your game account will be banned today. Send the login code to appeal.",
    redFlags: ["Ban threat", "Code request", "Unofficial support"],
    safeActions: ["Use official game support.", "Ask a parent, guardian, or trusted adult."],
    relatedLessonIds: ["passwords-mfa-account-safety", "safe-verification-habits"],
    practiceScenarioIds: ["launch-027", "launch-029"],
    checklistItems: [
      "Do not share login codes.",
      "Use official support pages.",
      "Kids can ask for help without getting in trouble.",
    ],
    familyDiscussionPrompt: "How can a child ask for help if a game message feels scary?",
  },
]

export function getMonthlyModule(id: string) {
  return monthlyModules.find((module) => module.id === id)
}
