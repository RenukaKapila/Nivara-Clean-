import { redactText } from "./scam-analyzer"

export function getSafeShareText(input: string) {
  return redactText(input)
    .replace(/\$\d+(?:,\d{3})*(?:\.\d{2})?/g, "[AMOUNT HIDDEN]")
    .replace(/\b(account|acct)\s*(number|#)?\s*:?\s*\d{6,17}\b/gi, "[ACCOUNT HIDDEN]")
}

export function getTrustedPersonTemplate(redactedMessage: string) {
  return `Can you help me check if this message seems real? I removed my private info. Here is the message:\n\n${redactedMessage}`
}
