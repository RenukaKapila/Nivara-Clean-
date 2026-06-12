import { describe, expect, it } from "vitest"
import { analyzeText, redactText } from "./scam-analyzer"

describe("redactText", () => {
  it("hides common private details before analysis output", () => {
    const redacted = redactText(
      "My email is renuka@example.com and my phone is 817-555-1212. The verification code is 482910.",
    )

    expect(redacted).toContain("[EMAIL HIDDEN]")
    expect(redacted).toContain("[PHONE HIDDEN]")
    expect(redacted).toContain("[CODE HIDDEN]")
    expect(redacted).not.toContain("renuka@example.com")
    expect(redacted).not.toContain("817-555-1212")
  })
})

describe("analyzeText", () => {
  it("flags a high-risk bank impersonation message", () => {
    const result = analyzeText(
      "Bank alert: your account is locked. Verify immediately at http://secure-bank-review.xyz or your access will be suspended.",
    )

    expect(result.riskLevel).toBe("high")
    expect(result.score).toBeGreaterThanOrEqual(75)
    expect(result.warningSigns.some((sign) => sign.detected)).toBe(true)
    expect(result.safeNextSteps.join(" ")).toMatch(/official|bank|verify/i)
  })

  it("keeps expected official-channel reminders low risk", () => {
    const result = analyzeText(
      "Your monthly statement is ready. For safety, open the official app or type the official website into your browser.",
    )

    expect(result.riskLevel).toBe("low")
    expect(result.score).toBeLessThan(35)
  })
})
