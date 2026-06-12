import { lessons } from "./lessons"
import { practiceScenarios } from "./practice-scenarios"

const LESSON_STORAGE_KEY = "nivara_completed_lessons_v1"
const PRACTICE_STORAGE_KEY = "nivara_practice_completed_scenarios_v3"

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function getStoredIds(key: string, validIds: Set<string>) {
  if (!canUseStorage()) return []

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((item) => typeof item === "string" && validIds.has(item))
  } catch {
    return []
  }
}

function setStoredIds(key: string, ids: string[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(ids))
}

export function getCompletedLessonIds() {
  return getStoredIds(LESSON_STORAGE_KEY, new Set(lessons.map((lesson) => lesson.id)))
}

export function saveCompletedLessonId(id: string) {
  const validIds = new Set(lessons.map((lesson) => lesson.id))
  if (!validIds.has(id)) return

  const completed = new Set(getCompletedLessonIds())
  completed.add(id)
  setStoredIds(LESSON_STORAGE_KEY, [...completed])
}

export function getCompletedPracticeIds() {
  return getStoredIds(
    PRACTICE_STORAGE_KEY,
    new Set(practiceScenarios.map((scenario) => scenario.id)),
  )
}

export function getProgressSummary() {
  const completedLessons = getCompletedLessonIds()
  const completedPractice = getCompletedPracticeIds()
  const lessonCount = lessons.length
  const practiceCount = practiceScenarios.length
  const totalCount = lessonCount + practiceCount
  const completedCount = completedLessons.length + completedPractice.length
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  let level = "Getting Started"
  if (percent >= 75) level = "Confident Checker"
  else if (percent >= 40) level = "Pattern Spotter"
  else if (percent >= 15) level = "Safety Builder"

  return {
    completedLessons,
    completedPractice,
    lessonCount,
    practiceCount,
    completedCount,
    totalCount,
    percent,
    level,
  }
}
