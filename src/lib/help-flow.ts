export interface HelpPath {
  id: string
  label: string
  immediateSteps: string[]
  whatNotToDo: string[]
  whoToContact: string[]
  whatToSave: string[]
}

export const helpPaths: HelpPath[] = [
  {
    id: "clicked-link",
    label: "I clicked a link",
    immediateSteps: [
      "Close the page if it is still open.",
      "Do not enter more information.",
      "If you entered a password, change it from the official website.",
    ],
    whatNotToDo: ["Do not go back through the same link.", "Do not download files from the page."],
    whoToContact: ["The real company or platform through its official app or website.", "A trusted adult or helper if you feel unsure."],
    whatToSave: ["Screenshots of the message.", "The link address if you can copy it safely."],
  },
  {
    id: "sent-money",
    label: "I sent money",
    immediateSteps: [
      "Stop contact with the requester.",
      "Contact your bank, card issuer, or payment provider immediately.",
      "Ask whether the payment can be stopped, reversed, or reported.",
    ],
    whatNotToDo: ["Do not send more money to recover the first payment.", "Do not keep the situation secret."],
    whoToContact: ["Bank or payment provider.", "FTC ReportFraud.gov.", "FBI IC3 for internet crime reports when appropriate."],
    whatToSave: ["Receipts.", "Transaction IDs.", "Messages, usernames, phone numbers, and links."],
  },
  {
    id: "shared-password",
    label: "I shared my password",
    immediateSteps: [
      "Change the password from the official website.",
      "Turn on multi-factor authentication.",
      "Log out of other sessions if the service offers that option.",
    ],
    whatNotToDo: ["Do not reuse the same password elsewhere.", "Do not share verification codes with anyone."],
    whoToContact: ["The platform's official support.", "A parent, guardian, school, or workplace IT team when relevant."],
    whatToSave: ["Login alerts.", "Password reset emails.", "The suspicious message."],
  },
  {
    id: "gave-personal-info",
    label: "I gave personal information",
    immediateSteps: [
      "Write down what information was shared.",
      "Watch accounts and mail for unusual activity.",
      "Use IdentityTheft.gov if identity information may be exposed.",
    ],
    whatNotToDo: ["Do not send more documents.", "Do not ignore small account alerts."],
    whoToContact: ["IdentityTheft.gov.", "Your bank or card issuer if financial details were shared.", "School or workplace support if student/work data was shared."],
    whatToSave: ["Forms submitted.", "Screenshots.", "Names, phone numbers, email addresses, and websites used."],
  },
  {
    id: "downloaded-something",
    label: "I downloaded something",
    immediateSteps: [
      "Disconnect from sensitive accounts.",
      "Uninstall unknown apps or extensions if you can do so safely.",
      "Run a trusted security scan or ask a trusted technical helper.",
    ],
    whatNotToDo: ["Do not give remote access to someone who contacted you unexpectedly.", "Do not enter banking passwords until the device is checked."],
    whoToContact: ["Official device support.", "School or workplace IT if it is their device."],
    whatToSave: ["File name.", "Website or message it came from.", "Any popups or instructions shown."],
  },
  {
    id: "family-impersonation",
    label: "Someone is pretending to be family",
    immediateSteps: [
      "Pause before sending money or codes.",
      "Call the person using a known saved number.",
      "Ask another family member to help verify.",
    ],
    whatNotToDo: ["Do not keep it secret because the message says so.", "Do not pay by gift cards, crypto, or wire transfer."],
    whoToContact: ["The family member through a known number.", "Another trusted family member.", "Local emergency services if there is a real immediate danger."],
    whatToSave: ["Caller ID or phone number.", "Messages.", "Payment instructions."],
  },
  {
    id: "child-shared-info",
    label: "My child may have shared information",
    immediateSteps: [
      "Stay calm and thank them for telling you.",
      "Ask what was shared and where.",
      "Change affected passwords and contact the platform or school if needed.",
    ],
    whatNotToDo: ["Do not shame the child.", "Do not let the scammer keep talking to them."],
    whoToContact: ["Parent or guardian.", "School or platform support.", "Bank or identity resources if financial or identity data was shared."],
    whatToSave: ["Screenshots.", "Usernames.", "Links.", "Any files downloaded."],
  },
  {
    id: "not-sure",
    label: "I am not sure what happened",
    immediateSteps: [
      "Stop and do not take more action from the message.",
      "Save the message.",
      "Ask a trusted person to review it with you.",
    ],
    whatNotToDo: ["Do not click again to test it.", "Do not reply with personal information."],
    whoToContact: ["The official organization if one is named.", "A trusted adult, family member, librarian, teacher, or support person."],
    whatToSave: ["The message.", "The sender.", "Any links or phone numbers."],
  },
]

export function getHelpPath(id: string) {
  return helpPaths.find((path) => path.id === id) ?? helpPaths[helpPaths.length - 1]
}
