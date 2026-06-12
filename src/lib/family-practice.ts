export interface FamilyPracticeScenario {
  id: string
  title: string
  message: string
  redFlags: string[]
  safeRule: string
  discussionPrompt: string
}

export const familyPracticeScenarios: FamilyPracticeScenario[] = [
  {
    id: "family-money",
    title: "Scary Money Message",
    message: "This is your nephew. I am in trouble and need money now. Please do not tell anyone.",
    redFlags: ["Scary emergency", "Money request", "Secrecy"],
    safeRule: "We do not send money because of a scary message. We verify first.",
    discussionPrompt: "Who could your family call before sending money?",
  },
  {
    id: "code-request",
    title: "Code Request",
    message: "Support here. Send the code you just received so we can protect your account.",
    redFlags: ["Verification code request", "Fake support", "Pressure"],
    safeRule: "We do not share codes or passwords with anyone.",
    discussionPrompt: "What should a child or older adult do if someone asks for a code?",
  },
  {
    id: "game-warning",
    title: "Gaming Account Warning",
    message: "Your game account will be banned today. Click this appeal link and enter your password.",
    redFlags: ["Account threat", "Login link", "Deadline"],
    safeRule: "We pause before clicking links and use official apps or websites.",
    discussionPrompt: "How can a gamer ask for help without getting in trouble?",
  },
  {
    id: "gift-card",
    title: "Gift Card Request",
    message: "Please buy gift cards for me and send photos of the codes. Keep it private.",
    redFlags: ["Gift card payment", "Secrecy", "Unusual request"],
    safeRule: "We never use gift cards as payment for urgent requests.",
    discussionPrompt: "Why are gift card codes hard to recover?",
  },
  {
    id: "delivery-fee",
    title: "Package Fee",
    message: "Your package is held. Pay a small fee now through this link.",
    redFlags: ["Tiny fee", "Unfamiliar link", "Urgency"],
    safeRule: "We verify using official websites or phone numbers.",
    discussionPrompt: "Where should your family check a package delivery?",
  },
]

export const familySafetyChecklist = [
  "We pause before clicking links.",
  "We do not share codes or passwords.",
  "We do not send money because of a scary message.",
  "We verify using official websites or phone numbers.",
  "Kids can ask for help without getting in trouble.",
]
