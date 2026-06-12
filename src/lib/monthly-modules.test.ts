import { describe, expect, it } from "vitest"
import { lessons } from "./lessons"
import { monthlyModules } from "./monthly-modules"
import { practiceScenarios } from "./practice-scenarios"

describe("monthlyModules", () => {
  it("links only to existing lessons and practice scenarios", () => {
    const lessonIds = new Set(lessons.map((lesson) => lesson.id))
    const scenarioIds = new Set(practiceScenarios.map((scenario) => scenario.id))

    for (const module of monthlyModules) {
      expect(module.relatedLessonIds.length).toBeGreaterThan(0)
      expect(module.practiceScenarioIds.length).toBeGreaterThan(0)
      expect(module.relatedLessonIds.every((id) => lessonIds.has(id))).toBe(true)
      expect(module.practiceScenarioIds.every((id) => scenarioIds.has(id))).toBe(true)
    }
  })
})
