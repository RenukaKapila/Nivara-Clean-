import { practiceScenarios, type PracticeScenario } from "./scam-lab"

const STORAGE_KEY = "nivara_practice_completed_scenarios_v2"

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function validScenarioIdSet() {
  return new Set(practiceScenarios.map((scenario) => scenario.id))
}

export function getCompletedScenarioIds(): string[] {
  if (!canUseStorage()) return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const validIds = validScenarioIdSet()
    return parsed.filter((item) => typeof item === "string" && validIds.has(item))
  } catch {
    return []
  }
}

export function saveCompletedScenarioId(id: string) {
  if (!canUseStorage()) return

  const completed = new Set(getCompletedScenarioIds())
  completed.add(id)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
}

export function resetCompletedScenarios() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function getRemainingScenarios(): PracticeScenario[] {
  const completed = new Set(getCompletedScenarioIds())
  return practiceScenarios.filter((scenario) => !completed.has(scenario.id))
}

export function getRandomScenario(): PracticeScenario | null {
  const remaining = getRemainingScenarios()
  if (remaining.length === 0) return null

  const index = Math.floor(Math.random() * remaining.length)
  return remaining[index]
}

export function getPracticeProgress() {
  const completedCount = getCompletedScenarioIds().length
  const totalCount = practiceScenarios.length
  const remainingCount = Math.max(totalCount - completedCount, 0)
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return {
    completedCount,
    totalCount,
    remainingCount,
    percent,
  }
}
