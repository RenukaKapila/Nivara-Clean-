export interface LessonChoice {
  id: string
  text: string
  correct: boolean
  feedback: string
}

export interface LessonPractice {
  prompt: string
  choices: LessonChoice[]
}

export interface Lesson {
  id: string
  title: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  icon: string
  overview: string
  simpleExplanation: string
  technicalExplanation: string
  sensoryIdea: string
  examples: string[]
  whatYouWillLearn: string[]
  whatItLooksLike: string[]
  redFlags: string[]
  howToVerify: string[]
  whatNotToDo: string[]
  whatToDoNext: string[]
  quickChecklist: string[]
  practice: LessonPractice
  practiceScenarioId?: string
  practiceLabel?: string
  readTime: string
}

export const lessons: Lesson[] = [
  {
    id: "phishing-fake-websites",
    title: "Phishing & Fake Websites",
    category: "Privacy",
    difficulty: "Beginner",
    icon: "Shield",
    readTime: "6 min",
    overview:
      "Phishing is when someone tricks you into clicking a fake link, opening a fake website, or entering private information somewhere unsafe. It can look like a bank alert, package notice, school payroll form, toll bill, or fake login page.",
    simpleExplanation:
      "A scammer creates something that looks real, then tries to make you click before you think.",
    technicalExplanation:
      "Phishing often uses lookalike domains, misleading subdomains, shortened links, fake login forms, redirects, and cloned website designs. The goal is usually credential theft, card theft, or MFA code theft.",
    sensoryIdea:
      "Show a fake text message on screen. Highlight the link piece by piece: brand name, subdomain, real domain, and suspicious ending.",
    examples: [
      "Fake bank login page asking you to verify your account",
      "USPS-style delivery message asking for a small redelivery fee",
      "Fake toll payment link",
      "Student payroll form asking for bank details",
    ],
    whatYouWillLearn: [
      "How fake websites trick people",
      "How to read a suspicious link",
      "Why the lock icon alone does not prove a site is safe",
    ],
    whatItLooksLike: [
      "A message says your account is locked and gives you a link",
      "A website looks like a real bank but the domain is different",
      "A delivery message asks for payment through a strange URL",
      "A QR code takes you to a payment or login page you were not expecting",
    ],
    redFlags: [
      "The link does not match the official website",
      "The message creates urgency",
      "You are asked to log in through a message link",
      "The site asks for card, password, SSN, or verification code",
      "The URL has extra words before or after the real brand name",
    ],
    howToVerify: [
      "Type the official website yourself",
      "Use the official app instead of the message link",
      "Look at the real domain, not just the brand name inside the URL",
      "Search the company separately if you are unsure",
    ],
    whatNotToDo: [
      "Do not click login links from suspicious messages",
      "Do not enter passwords on pages reached from unknown links",
      "Do not assume HTTPS means the site is safe",
      "Do not scan QR codes from random signs, emails, or texts without checking",
    ],
    whatToDoNext: [
      "If you clicked, close the page and do not enter anything else",
      "If you entered a password, change it from the official website",
      "If you entered card information, contact your bank or card issuer",
      "Turn on multi-factor authentication for important accounts",
    ],
    quickChecklist: [
      "Check the real domain",
      "Avoid message links",
      "Use official apps",
      "Never share codes",
    ],
    practice: {
      prompt: "Which link is safest to use for checking a Chase bank alert?",
      choices: [
        {
          id: "a",
          text: "https://chase-secure-login.accountreview-center.com",
          correct: false,
          feedback: "This uses Chase’s name, but the real domain is not chase.com.",
        },
        {
          id: "b",
          text: "Open the Chase app directly",
          correct: true,
          feedback: "Correct. Opening the official app avoids fake links.",
        },
        {
          id: "c",
          text: "Click the link because it has HTTPS",
          correct: false,
          feedback: "HTTPS only means the connection is encrypted. It does not prove the website is legitimate.",
        },
      ],
    },
    practiceScenarioId: "fake-bank-text",
    practiceLabel: "Practice spotting a fake bank alert",
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    category: "Social",
    difficulty: "Beginner",
    icon: "Heart",
    readTime: "6 min",
    overview:
      "Social engineering is when scammers manipulate emotions instead of hacking technology. They use fear, trust, love, authority, urgency, secrecy, or confusion to make people act quickly.",
    simpleExplanation:
      "The scammer is not breaking into your device. They are trying to talk you into opening the door.",
    technicalExplanation:
      "Social engineering targets human decision-making. Common tactics include authority impersonation, pretexting, urgency, scarcity, emotional pressure, trust-building, and isolation.",
    sensoryIdea:
      "Use character cards showing emotions: fear, urgency, trust, secrecy, authority. Let users tap the emotion being used.",
    examples: [
      "A family emergency text asking for gift cards",
      "A fake boss asking an employee to buy gift cards",
      "A romance scammer slowly building trust",
      "A fake government caller threatening arrest",
    ],
    whatYouWillLearn: [
      "How scammers use emotions",
      "Why secrecy is dangerous",
      "How to pause before reacting",
    ],
    whatItLooksLike: [
      "Someone says not to tell anyone",
      "Someone says you must act immediately",
      "Someone claims authority over you",
      "Someone builds trust before introducing money",
    ],
    redFlags: [
      "Urgent emotional pressure",
      "Secrecy requests",
      "Threats or intimidation",
      "Requests for money, codes, gift cards, or crypto",
      "Someone avoids normal verification",
    ],
    howToVerify: [
      "Pause before responding",
      "Call the person using a known number",
      "Ask another trusted person",
      "Use a family code word for emergencies",
    ],
    whatNotToDo: [
      "Do not keep money requests secret",
      "Do not send gift card codes",
      "Do not trust a caller just because they sound confident",
      "Do not let panic make the decision",
    ],
    whatToDoNext: [
      "Stop the conversation if pressure increases",
      "Verify through another channel",
      "Warn family members if the scam targets relatives",
      "Report the scam if money or personal information was requested",
    ],
    quickChecklist: [
      "Pause",
      "Verify separately",
      "Do not keep secrets",
      "Ask someone trusted",
    ],
    practice: {
      prompt: "A text says, 'Mom, don’t call me. I need $900 in gift cards. Don’t tell anyone.' What is the safest first step?",
      choices: [
        {
          id: "a",
          text: "Buy the gift cards quickly",
          correct: false,
          feedback: "Gift cards and secrecy are major warning signs.",
        },
        {
          id: "b",
          text: "Call your child using their normal phone number",
          correct: true,
          feedback: "Correct. Verify through a known number before acting.",
        },
        {
          id: "c",
          text: "Reply and ask what happened",
          correct: false,
          feedback: "Replying keeps you inside the scammer’s controlled conversation.",
        },
      ],
    },
    practiceScenarioId: "family-emergency-scam",
    practiceLabel: "Practice spotting a family emergency scam",
  },
  {
    id: "passwords-mfa-account-safety",
    title: "Passwords, MFA & Account Safety",
    category: "Privacy",
    difficulty: "Intermediate",
    icon: "Shield",
    readTime: "7 min",
    overview:
      "Your email, banking, school, work, and social accounts need strong protection because one hacked account can unlock many others. Passwords, MFA, and recovery settings are the foundation of account safety.",
    simpleExplanation:
      "Your password is the door lock. MFA is the second lock. Recovery settings are the spare key.",
    technicalExplanation:
      "Attackers use credential stuffing, phishing, password reuse, data breach leaks, session theft, MFA fatigue, and fake verification pages to take over accounts.",
    sensoryIdea:
      "Use a lock animation: weak password = one lock, MFA = second lock, recovery email = backup key.",
    examples: [
      "Fake bank verification page stealing login details",
      "School email takeover through a fake payroll form",
      "Instagram account takeover through a fake copyright warning",
      "MFA code theft through a fake support call",
    ],
    whatYouWillLearn: [
      "Why password reuse is risky",
      "How MFA protects accounts",
      "Why verification codes should never be shared",
    ],
    whatItLooksLike: [
      "Unexpected login alert",
      "Someone asks for a verification code",
      "You receive password reset emails you did not request",
      "You get repeated MFA prompts",
    ],
    redFlags: [
      "Same password used on multiple sites",
      "Unexpected MFA prompts",
      "Someone asks for a code",
      "Password reset request you did not start",
      "Login alert from an unknown device or location",
    ],
    howToVerify: [
      "Check account security settings directly",
      "Review recent login activity",
      "Change passwords from the official website",
      "Use an authenticator app when possible",
    ],
    whatNotToDo: [
      "Do not share verification codes",
      "Do not approve MFA prompts you did not request",
      "Do not reuse your email password elsewhere",
      "Do not save recovery codes in an unsafe place",
    ],
    whatToDoNext: [
      "Turn on MFA for email first",
      "Use unique passwords for important accounts",
      "Update recovery email and phone number",
      "Log out of unknown sessions",
    ],
    quickChecklist: [
      "Unique passwords",
      "MFA on email",
      "Do not share codes",
      "Review login alerts",
    ],
    practice: {
      prompt: "Someone from 'support' asks you to read them the 6-digit code you just received. What should you do?",
      choices: [
        {
          id: "a",
          text: "Give the code because they are support",
          correct: false,
          feedback: "Real support should not ask for your verification code.",
        },
        {
          id: "b",
          text: "Do not share it and end the conversation",
          correct: true,
          feedback: "Correct. Codes are for you only.",
        },
        {
          id: "c",
          text: "Send only the last three digits",
          correct: false,
          feedback: "Never share any part of a verification code.",
        },
      ],
    },
  },
  {
    id: "payment-money-scams",
    title: "Payment & Money Scams",
    category: "Financial",
    difficulty: "Intermediate",
    icon: "CreditCard",
    readTime: "7 min",
    overview:
      "Many scams eventually lead to money. Scammers may ask for gift cards, crypto, wire transfers, payment apps, fake fees, fake refunds, or fake equipment payments.",
    simpleExplanation:
      "The story changes, but the goal is usually the same: get money in a way that is hard to reverse.",
    technicalExplanation:
      "Scammers prefer irreversible or low-recovery payment methods, including gift cards, cryptocurrency, wire transfers, Zelle, Cash App, Venmo, and fake check overpayments.",
    sensoryIdea:
      "Use a payment-method risk meter. Cards and official portals are lower risk; gift cards, crypto, and wire transfers are high risk.",
    examples: [
      "Fake job asks for an equipment fee",
      "Prize scam asks for a processing fee",
      "Refund scam asks for remote access",
      "Crypto scam promises unusually high returns",
    ],
    whatYouWillLearn: [
      "Which payment methods are high risk",
      "Why small fees can still be scams",
      "How fake refunds and fake checks work",
    ],
    whatItLooksLike: [
      "Pay $2 to claim a prize",
      "Send $85 for job equipment",
      "Buy gift cards and send the codes",
      "Invest in an invite-only crypto platform",
    ],
    redFlags: [
      "Gift card payment request",
      "Crypto investment from a stranger",
      "Upfront fee for a job or prize",
      "Fake refund call",
      "Pressure to use payment apps quickly",
    ],
    howToVerify: [
      "Check whether the organization normally charges that fee",
      "Use official payment portals only",
      "Ask your bank before sending unusual payments",
      "Search the payment request wording online",
    ],
    whatNotToDo: [
      "Do not pay to receive a job",
      "Do not pay to claim a prize",
      "Do not send gift card codes",
      "Do not invest through a stranger’s platform",
    ],
    whatToDoNext: [
      "If you sent money, contact the payment provider immediately",
      "If you sent card details, contact your card issuer",
      "Save screenshots and transaction details",
      "Report the scam to the appropriate agency",
    ],
    quickChecklist: [
      "Gift cards = stop",
      "Crypto stranger = stop",
      "Job fee = stop",
      "Prize fee = stop",
    ],
    practice: {
      prompt: "A remote job says you must pay an $85 equipment fee through Zelle. What is the safest response?",
      choices: [
        {
          id: "a",
          text: "Pay because it will be refunded",
          correct: false,
          feedback: "Refund promises are common in job scams.",
        },
        {
          id: "b",
          text: "Do not pay and verify the company independently",
          correct: true,
          feedback: "Correct. Real employers usually do not charge upfront equipment fees.",
        },
        {
          id: "c",
          text: "Ask if you can pay with Cash App instead",
          correct: false,
          feedback: "Changing the payment app does not make the request safe.",
        },
      ],
    },
    practiceScenarioId: "fake-job-offer",
    practiceLabel: "Practice spotting a fake remote job offer",
  },
  {
    id: "device-app-safety",
    title: "Device & App Safety",
    category: "Privacy",
    difficulty: "Intermediate",
    icon: "Shield",
    readTime: "6 min",
    overview:
      "Device safety means protecting your phone, computer, browser, and apps from unsafe downloads, fake support tools, suspicious permissions, and outdated software.",
    simpleExplanation:
      "Your device is where your accounts live. If a scammer controls your device, they may control everything you do on it.",
    technicalExplanation:
      "Common risks include malware, malicious browser extensions, fake apps, remote access tools, outdated software vulnerabilities, unsafe permissions, and notification abuse.",
    sensoryIdea:
      "Show a phone screen with app permission popups. Let users choose which permissions feel risky.",
    examples: [
      "Fake tech support asks you to install remote access software",
      "A fake app pretends to be a bank or delivery service",
      "A browser extension asks to read all website data",
      "A pop-up says your computer is infected",
    ],
    whatYouWillLearn: [
      "Why updates matter",
      "How fake apps and remote access scams work",
      "How to check app permissions",
    ],
    whatItLooksLike: [
      "A caller asks you to install AnyDesk, TeamViewer, or similar tools",
      "A pop-up says your device has a virus",
      "An app asks for unnecessary permissions",
      "A browser extension wants access to all websites",
    ],
    redFlags: [
      "Unexpected virus warning in browser",
      "Remote access request from unknown support",
      "App downloaded outside official app store",
      "Too many permissions requested",
      "Unknown browser extension installed",
    ],
    howToVerify: [
      "Use official app stores",
      "Check app developer names",
      "Review permissions before installing",
      "Run updates from device settings only",
    ],
    whatNotToDo: [
      "Do not install remote access tools for unknown callers",
      "Do not click pop-up virus warnings",
      "Do not download apps from random links",
      "Do not ignore repeated suspicious popups",
    ],
    whatToDoNext: [
      "Uninstall unknown apps or extensions",
      "Update your device and browser",
      "Run a trusted security scan if needed",
      "Change passwords if someone had remote access",
    ],
    quickChecklist: [
      "Update devices",
      "Use official stores",
      "Check permissions",
      "No remote access for strangers",
    ],
    practice: {
      prompt: "A caller says your computer is infected and asks you to install remote access software. What should you do?",
      choices: [
        {
          id: "a",
          text: "Install it so they can help",
          correct: false,
          feedback: "Remote access can give scammers control of your device.",
        },
        {
          id: "b",
          text: "End the call and use official support if needed",
          correct: true,
          feedback: "Correct. Use official support channels only.",
        },
        {
          id: "c",
          text: "Install it but do not open banking websites",
          correct: false,
          feedback: "Once remote access is installed, the device may still be unsafe.",
        },
      ],
    },
  },
  {
    id: "identity-protection",
    title: "Identity Protection",
    category: "Privacy",
    difficulty: "Advanced",
    icon: "UserX",
    readTime: "7 min",
    overview:
      "Identity protection means guarding information that can be used to open accounts, access benefits, file taxes, or impersonate you. This includes SSN, date of birth, address, bank details, medical information, and account logins.",
    simpleExplanation:
      "Some information is powerful because it can be used to pretend to be you.",
    technicalExplanation:
      "Identity theft can involve data breaches, phishing, synthetic identity fraud, account opening fraud, tax fraud, medical identity theft, SIM swapping, and account recovery abuse.",
    sensoryIdea:
      "Use an identity shield graphic. Each piece of information adds risk when exposed: SSN, DOB, address, account login, phone number.",
    examples: [
      "Fake government form asks for SSN",
      "Fake job application asks for sensitive information too early",
      "Medical bill appears for care you did not receive",
      "Credit report shows an account you did not open",
    ],
    whatYouWillLearn: [
      "Which personal details are sensitive",
      "How identity theft can show up",
      "How credit freezes and fraud alerts help",
    ],
    whatItLooksLike: [
      "Unfamiliar account on credit report",
      "Unexpected debt collection call",
      "Tax return rejected because one was already filed",
      "Login or recovery messages you did not request",
    ],
    redFlags: [
      "SSN requested through an unexpected message",
      "Unknown accounts or hard inquiries",
      "Bills for services you did not use",
      "Missing mail or address changes",
      "Phone number suddenly loses service",
    ],
    howToVerify: [
      "Check credit reports",
      "Review bank and medical statements",
      "Check official government accounts directly",
      "Contact organizations using official numbers",
    ],
    whatNotToDo: [
      "Do not share SSN through text or email links",
      "Do not ignore small identity warning signs",
      "Do not reuse compromised passwords",
      "Do not delay freezing credit after serious exposure",
    ],
    whatToDoNext: [
      "Report identity theft at IdentityTheft.gov",
      "Place a fraud alert or credit freeze",
      "Change affected passwords",
      "Contact banks and creditors",
    ],
    quickChecklist: [
      "Protect SSN",
      "Check credit",
      "Freeze if exposed",
      "Report quickly",
    ],
    practice: {
      prompt: "A job offer asks for your SSN before an interview. What should you do?",
      choices: [
        {
          id: "a",
          text: "Send it because jobs need SSNs",
          correct: false,
          feedback: "Employers may need SSN later, but not before the job is verified.",
        },
        {
          id: "b",
          text: "Verify the company and wait until a legitimate hiring stage",
          correct: true,
          feedback: "Correct. Sensitive information should only be shared after verification.",
        },
        {
          id: "c",
          text: "Send only a picture of your card",
          correct: false,
          feedback: "That is even riskier. Never send SSN images through suspicious channels.",
        },
      ],
    },
  },
  {
    id: "safe-verification-habits",
    title: "Safe Verification Habits",
    category: "Privacy",
    difficulty: "Beginner",
    icon: "Shield",
    readTime: "5 min",
    overview:
      "Safe verification habits help you check whether something is real before clicking, paying, replying, or sharing information. This is the heart of Nivara: pause before you trust.",
    simpleExplanation:
      "Do not verify inside the message that scared you. Step outside the message and verify through a trusted source.",
    technicalExplanation:
      "Safe verification reduces attack success by breaking the scammer’s controlled communication channel. This includes out-of-band verification, official-source lookup, trusted-contact confirmation, and known-number callbacks.",
    sensoryIdea:
      "Use a calm pause animation: message arrives, screen dims, user chooses: click, reply, or verify separately.",
    examples: [
      "Call your bank using the card number",
      "Track a package on the official carrier website",
      "Call a family member using their saved number",
      "Use a family code word for emergencies",
    ],
    whatYouWillLearn: [
      "How to verify without clicking",
      "Why official channels matter",
      "How to ask for a second opinion",
    ],
    whatItLooksLike: [
      "You receive a message and pause before acting",
      "You open the official app instead of the link",
      "You call a known number",
      "You ask a trusted person to review the situation",
    ],
    redFlags: [
      "Message says not to call official support",
      "Message says not to tell anyone",
      "Only one contact method is allowed",
      "You feel rushed or scared",
      "The sender discourages verification",
    ],
    howToVerify: [
      "Use official apps and websites",
      "Call known phone numbers",
      "Ask someone you trust",
      "Use a family code word",
      "Compare the message to official account activity",
    ],
    whatNotToDo: [
      "Do not verify using the link in the message",
      "Do not call the number inside a suspicious message",
      "Do not stay isolated if money is involved",
      "Do not rush because the sender demands it",
    ],
    whatToDoNext: [
      "Make a family verification plan",
      "Save official numbers for banks, school, work, and family",
      "Create a code word for emergencies",
      "Practice with Practice Lab scenarios",
    ],
    quickChecklist: [
      "Pause",
      "Leave the message",
      "Use official source",
      "Ask someone trusted",
    ],
    practice: {
      prompt: "A bank text says your account is locked. What is the best verification method?",
      choices: [
        {
          id: "a",
          text: "Click the link in the text",
          correct: false,
          feedback: "That keeps you inside the scammer’s path.",
        },
        {
          id: "b",
          text: "Open the official bank app directly",
          correct: true,
          feedback: "Correct. This uses a trusted channel.",
        },
        {
          id: "c",
          text: "Reply asking if it is real",
          correct: false,
          feedback: "Scammers will usually say yes.",
        },
      ],
    },
    practiceScenarioId: "safe-school-message",
    practiceLabel: "Practice identifying safe verification language",
  },
  {
    id: "after-something-happened",
    title: "What To Do If Something Already Happened",
    category: "Privacy",
    difficulty: "Advanced",
    icon: "Shield",
    readTime: "8 min",
    overview:
      "If you clicked a link, shared information, sent money, or installed something suspicious, the most important thing is to act quickly and calmly. Recovery steps depend on what happened.",
    simpleExplanation:
      "Do not panic. Stop the damage, protect accounts, contact the right organization, and save evidence.",
    technicalExplanation:
      "Incident response focuses on containment, credential rotation, account monitoring, payment recovery attempts, device cleanup, identity protection, documentation, and reporting.",
    sensoryIdea:
      "Use a recovery path map with calm steps: Stop, Secure, Contact, Document, Report, Monitor.",
    examples: [
      "Clicked a phishing link",
      "Entered a password on a fake site",
      "Shared card details",
      "Sent gift card codes",
      "Installed remote access software",
    ],
    whatYouWillLearn: [
      "What to do first after a mistake",
      "How recovery depends on what was shared",
      "How to document and report safely",
    ],
    whatItLooksLike: [
      "You realize a link was fake after clicking",
      "You shared a password or code",
      "You paid a suspicious fee",
      "Your account shows unusual activity",
    ],
    redFlags: [
      "New login alerts",
      "Unexpected charges",
      "Password reset emails",
      "Account settings changed",
      "Scammer keeps asking for more money",
    ],
    howToVerify: [
      "Check official account activity",
      "Call your bank or card issuer",
      "Review device apps and downloads",
      "Check credit if sensitive identity information was shared",
    ],
    whatNotToDo: [
      "Do not keep talking to the scammer",
      "Do not send more money to recover previous money",
      "Do not delete evidence before saving screenshots",
      "Do not use the same compromised password again",
    ],
    whatToDoNext: [
      "Change affected passwords",
      "Contact bank, card issuer, school, employer, or platform support",
      "Save screenshots, phone numbers, links, and transaction IDs",
      "Report to FTC, IC3, or IdentityTheft.gov depending on the situation",
      "Monitor accounts and credit reports",
    ],
    quickChecklist: [
      "Stop contact",
      "Change passwords",
      "Call bank",
      "Save evidence",
      "Report",
    ],
    practice: {
      prompt: "You entered your email password on a fake login page. What should you do first?",
      choices: [
        {
          id: "a",
          text: "Ignore it unless something bad happens",
          correct: false,
          feedback: "Waiting gives attackers more time.",
        },
        {
          id: "b",
          text: "Change the password from the official website and enable MFA",
          correct: true,
          feedback: "Correct. Secure the account immediately from the official site.",
        },
        {
          id: "c",
          text: "Reply to the message asking them to delete it",
          correct: false,
          feedback: "Do not keep talking to the scammer.",
        },
      ],
    },
  },
]