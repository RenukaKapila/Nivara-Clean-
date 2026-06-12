import { describe, expect, it } from "vitest"
import { normalizeSupportUrl } from "./support"

describe("normalizeSupportUrl", () => {
  it("accepts hosted http or https support pages", () => {
    expect(normalizeSupportUrl("https://example.com/support")).toBe("https://example.com/support")
  })

  it("rejects blank, relative, and unsafe values", () => {
    expect(normalizeSupportUrl("")).toBe("")
    expect(normalizeSupportUrl("/support")).toBe("")
    expect(normalizeSupportUrl("javascript:alert(1)")).toBe("")
  })
})
