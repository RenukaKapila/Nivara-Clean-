import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getVisiblePracticeWarningOptions } from "@/lib/practice-engine"
import type {
  PracticeRiskLevel,
  PracticeScenario,
} from "@/lib/practice-scenarios"

const riskOptions: Array<{
  value: PracticeRiskLevel
  label: string
  helper: string
}> = [
  {
    value: "low",
    label: "Low signs found",
    helper: "Looks mostly normal or expected",
  },
  {
    value: "suspicious",
    label: "Pause and verify",
    helper: "Some warning signs are present",
  },
  {
    value: "high",
    label: "High warning signs",
    helper: "Multiple strong warning signs",
  },
]

export function AnswerPanel({
  scenario,
  selectedWarningIds,
  selectedRisk,
  submitted,
  guidedMode,
  onToggleWarning,
  onRiskChange,
}: {
  scenario: PracticeScenario
  selectedWarningIds: string[]
  selectedRisk: PracticeRiskLevel | null
  submitted: boolean
  guidedMode: boolean
  onToggleWarning: (id: string) => void
  onRiskChange: (risk: PracticeRiskLevel) => void
}) {
  const visibleOptions = getVisiblePracticeWarningOptions(scenario, guidedMode)

  return (
    <>
      <Card className="mb-6 border-border shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wide text-red-700">
              Step 1
            </p>
            <h2 className="text-lg font-bold text-foreground">
              What signs do you notice?
            </h2>
            <p className="text-sm text-muted-foreground">
              {guidedMode
                ? "Guided Mode shows fewer choices. You are only graded on the choices shown."
                : "Select every sign that clearly appears. Some options are decoys."}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {visibleOptions.map((option) => {
              const selected = selectedWarningIds.includes(option.id)

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onToggleWarning(option.id)}
                  disabled={submitted}
                  className={`rounded-xl border p-3 text-left text-sm transition-all ${
                    selected
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-border bg-white hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {selected ? (
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-current mt-0.5 shrink-0" />
                    )}
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-border shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
              Step 2
            </p>
            <h2 className="text-lg font-bold text-foreground">
              What risk level would you choose?
            </h2>
            <p className="text-sm text-muted-foreground">
              This helps you practice judgment, not just memorization.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {riskOptions.map((option) => {
              const selected = selectedRisk === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !submitted && onRiskChange(option.value)}
                  disabled={submitted}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-amber-300 bg-amber-50 text-amber-800"
                      : "border-border bg-white hover:bg-muted/30"
                  }`}
                >
                  <p className="text-sm font-bold">{option.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {option.helper}
                  </p>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
