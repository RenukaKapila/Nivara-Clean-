import {
  practiceScenarios,
  type PracticeRiskLevel,
  type PracticeScenario,
  type PracticeWarningOption,
} from "./practice-scenarios"

const STORAGE_KEY = "nivara_practice_completed_scenarios_v3"

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function validScenarioIdSet() {
  return new Set(practiceScenarios.map((scenario) => scenario.id))
}

export function getCompletedPracticeScenarioIds(): string[] {
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

export function saveCompletedPracticeScenarioId(id: string) {
  if (!canUseStorage()) return

  const completed = new Set(getCompletedPracticeScenarioIds())
  completed.add(id)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
}

export function resetPracticeSession() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function getRemainingPracticeScenarios(): PracticeScenario[] {
  const completed = new Set(getCompletedPracticeScenarioIds())
  return practiceScenarios.filter((scenario) => !completed.has(scenario.id))
}

export function getRandomPracticeScenario(): PracticeScenario | null {
  const remaining = getRemainingPracticeScenarios()
  if (remaining.length === 0) return null

  const index = Math.floor(Math.random() * remaining.length)
  return remaining[index]
}

export function getVisiblePracticeWarningOptions(
  scenario: PracticeScenario,
  guidedMode: boolean,
): PracticeWarningOption[] {
  if (!guidedMode) return scenario.warningOptions

  const correctSet = new Set(scenario.correctWarningIds)
  const correctOptions = scenario.warningOptions.filter((option) => correctSet.has(option.id))
  const decoyOptions = scenario.warningOptions.filter((option) => !correctSet.has(option.id))

  const chosen: PracticeWarningOption[] = [
    ...correctOptions.slice(0, 2),
    ...decoyOptions.slice(0, 2),
  ]

  const chosenIds = new Set(chosen.map((option) => option.id))

  for (const option of scenario.warningOptions) {
    if (chosen.length >= 4) break
    if (!chosenIds.has(option.id)) {
      chosen.push(option)
      chosenIds.add(option.id)
    }
  }

  return chosen
}

export function getPracticeScore({
  scenario,
  selectedWarningIds,
  selectedRisk,
  scorableWarningIds,
}: {
  scenario: PracticeScenario
  selectedWarningIds: string[]
  selectedRisk: PracticeRiskLevel | null
  scorableWarningIds?: string[]
}) {
  const scorableSet = scorableWarningIds ? new Set(scorableWarningIds) : null

  const correctWarningIds = scorableSet
    ? scenario.correctWarningIds.filter((id) => scorableSet.has(id))
    : scenario.correctWarningIds

  const selectedIds = scorableSet
    ? selectedWarningIds.filter((id) => scorableSet.has(id))
    : selectedWarningIds

  const correctSet = new Set(correctWarningIds)
  const selectedSet = new Set(selectedIds)

  const correctSelected = [...selectedSet].filter((id) => correctSet.has(id)).length
  const extraSelected = [...selectedSet].filter((id) => !correctSet.has(id)).length
  const missed = correctWarningIds.length - correctSelected

  const pointsPerCorrect = correctWarningIds.length > 0 ? 70 / correctWarningIds.length : 0
  const warningScore = Math.max(0, correctSelected * pointsPerCorrect - extraSelected * 4)
  const riskScore = selectedRisk === scenario.riskLevel ? 30 : 0

  let total = Math.max(0, Math.min(100, Math.round(warningScore + riskScore)))

  if (correctSelected > 0 && total < 20) {
    total = 20
  }

  return {
    total,
    correctSelected,
    extraSelected,
    missed,
    riskCorrect: selectedRisk === scenario.riskLevel,
  }
}

export function getPracticeFeedback(
  scenario: PracticeScenario,
  selectedWarningIds: string[],
  scorableWarningIds?: string[],
) {
  const scorableSet = scorableWarningIds ? new Set(scorableWarningIds) : null
  const correctSet = new Set(scenario.correctWarningIds)
  const selectedSet = new Set(selectedWarningIds)

  const options = scorableSet
    ? scenario.warningOptions.filter((option) => scorableSet.has(option.id))
    : scenario.warningOptions

  return {
    correctSelectedOptions: options.filter(
      (option) => correctSet.has(option.id) && selectedSet.has(option.id),
    ),
    missedOptions: options.filter(
      (option) => correctSet.has(option.id) && !selectedSet.has(option.id),
    ),
    extraSelectedOptions: options.filter(
      (option) => !correctSet.has(option.id) && selectedSet.has(option.id),
    ),
  }
}

export function getHiddenCorrectPracticeOptions(
  scenario: PracticeScenario,
  visibleWarningIds: string[],
) {
  const visibleSet = new Set(visibleWarningIds)

  return scenario.warningOptions.filter(
    (option) => scenario.correctWarningIds.includes(option.id) && !visibleSet.has(option.id),
  )
}
