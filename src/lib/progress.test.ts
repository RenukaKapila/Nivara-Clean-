import { afterEach, describe, expect, it, vi } from "vitest"
import { getCompletedLessonIds, getCompletedPracticeIds, getProgressSummary, saveCompletedLessonId } from "./progress"
import { lessons } from "./lessons"

afterEach(() => {
  vi.unstubAllGlobals()
})

function stubStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial))

  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    },
  })
}

describe("progress storage", () => {
  it("ignores invalid stored ids", () => {
    stubStorage({
      nivara_completed_lessons_v1: JSON.stringify([lessons[0].id, "missing"]),
      nivara_practice_completed_scenarios_v3: JSON.stringify(["missing"]),
    })

    expect(getCompletedLessonIds()).toEqual([lessons[0].id])
    expect(getCompletedPracticeIds()).toEqual([])
  })

  it("saves valid lesson ids and calculates a summary", () => {
    stubStorage()

    saveCompletedLessonId(lessons[0].id)
    const summary = getProgressSummary()

    expect(summary.completedLessons).toEqual([lessons[0].id])
    expect(summary.completedCount).toBe(1)
    expect(summary.percent).toBeGreaterThan(0)
  })
})
