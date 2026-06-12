import { describe, expect, it } from "vitest"
import { getSafeShareText, getTrustedPersonTemplate } from "./safe-share"

describe("getSafeShareText", () => {
  it("redacts personal details and payment amounts before sharing", () => {
    const redacted = getSafeShareText(
      "Email renuka@example.com, call 817-555-1212, and send $1,250 to account number 123456789.",
    )

    expect(redacted).toContain("[EMAIL HIDDEN]")
    expect(redacted).toContain("[PHONE HIDDEN]")
    expect(redacted).toContain("[AMOUNT HIDDEN]")
    expect(redacted).toContain("[BANK INFO HIDDEN]")
    expect(redacted).not.toContain("renuka@example.com")
    expect(redacted).not.toContain("123456789")
  })
})

describe("getTrustedPersonTemplate", () => {
  it("wraps redacted content in plain non-technical copy", () => {
    const template = getTrustedPersonTemplate("[MESSAGE HIDDEN]")

    expect(template).toContain("Can you help me check")
    expect(template).toContain("[MESSAGE HIDDEN]")
  })
})
