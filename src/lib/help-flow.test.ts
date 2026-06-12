import { describe, expect, it } from "vitest"
import { getHelpPath, helpPaths } from "./help-flow"

describe("help-flow", () => {
  it("includes recovery guidance for every visible help path", () => {
    for (const path of helpPaths) {
      expect(path.immediateSteps.length).toBeGreaterThan(0)
      expect(path.whatNotToDo.length).toBeGreaterThan(0)
      expect(path.whoToContact.length).toBeGreaterThan(0)
      expect(path.whatToSave.length).toBeGreaterThan(0)
    }
  })

  it("falls back to not-sure guidance for unknown ids", () => {
    expect(getHelpPath("unknown").id).toBe("not-sure")
  })
})
