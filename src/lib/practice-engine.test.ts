import { describe, expect, it } from "vitest"
import { getPracticeScore } from "./practice-engine"
import { practiceScenarios } from "./practice-scenarios"

describe("getPracticeScore", () => {
  const scenario = practiceScenarios[0]

  it("gives a perfect score for all correct warning signs and risk level", () => {
    const score = getPracticeScore({
      scenario,
      selectedWarningIds: scenario.correctWarningIds,
      selectedRisk: scenario.riskLevel,
    })

    expect(score.total).toBe(100)
    expect(score.riskCorrect).toBe(true)
    expect(score.missed).toBe(0)
  })

  it("penalizes extra selected warning signs", () => {
    const decoy = scenario.warningOptions.find(
      (option) => !scenario.correctWarningIds.includes(option.id),
    )

    expect(decoy).toBeDefined()

    const score = getPracticeScore({
      scenario,
      selectedWarningIds: [...scenario.correctWarningIds, decoy!.id],
      selectedRisk: scenario.riskLevel,
    })

    expect(score.total).toBeLessThan(100)
    expect(score.extraSelected).toBe(1)
  })
})
