import { Link } from "react-router-dom"
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Lightbulb,
  Shield,
  Sparkles,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  getHiddenCorrectPracticeOptions,
  getPracticeFeedback,
  getPracticeScore,
  getVisiblePracticeWarningOptions,
} from "@/lib/practice-engine"
import type {
  PracticeRiskLevel,
  PracticeScenario,
  PracticeWarningOption,
} from "@/lib/practice-scenarios"

function FeedbackList({
  title,
  tone,
  items,
  empty,
  extraMode = false,
}: {
  title: string
  tone: "green" | "red" | "amber" | "blue"
  items: PracticeWarningOption[]
  empty: string
  extraMode?: boolean
}) {
  const styles = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    red: "border-red-200 bg-red-50 text-red-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
  }

  const Icon =
    tone === "green"
      ? CheckCircle
      : tone === "red"
        ? XCircle
        : tone === "blue"
          ? Lightbulb
          : Sparkles

  return (
    <div className={`rounded-2xl border p-4 ${styles[tone]}`}>
      <p className="text-sm font-bold mb-3">{title}</p>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/70 bg-white p-3">
              <div className="flex items-start gap-2">
                <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {extraMode
                      ? "This can matter in other scams, but this situation does not clearly show it."
                      : item.why}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function FeedbackPanel({
  scenario,
  selectedWarningIds,
  selectedRisk,
  guidedMode,
  onNextScenario,
}: {
  scenario: PracticeScenario
  selectedWarningIds: string[]
  selectedRisk: PracticeRiskLevel | null
  guidedMode: boolean
  onNextScenario: () => void
}) {
  const visibleOptions = getVisiblePracticeWarningOptions(scenario, guidedMode)
  const visibleWarningIds = visibleOptions.map((option) => option.id)

  const score = getPracticeScore({
    scenario,
    selectedWarningIds,
    selectedRisk,
    scorableWarningIds: guidedMode ? visibleWarningIds : undefined,
  })

  const feedback = getPracticeFeedback(
    scenario,
    selectedWarningIds,
    guidedMode ? visibleWarningIds : undefined,
  )

  const hiddenCorrectOptions = guidedMode
    ? getHiddenCorrectPracticeOptions(scenario, visibleWarningIds)
    : []

  return (
    <Card className="mb-8 border-brand-blue/20 bg-brand-blue-light/20 shadow-sm">
      <CardContent className="p-5">
        <div className="text-center mb-5">
          <Sparkles className="mx-auto mb-2 h-7 w-7 text-brand-blue" />
          <p className="text-3xl font-extrabold text-brand-blue">{score.total}%</p>
          <p className="text-sm text-muted-foreground">
            {score.total === 100
              ? "Excellent. You spotted the shown pattern clearly."
              : score.total >= 70
                ? "Good work. Review the details below."
                : "Good practice. This one had some tricky signals."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-5">
          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Scenario Type
            </p>
            <p className="text-sm font-bold text-foreground mt-1">
              {scenario.hiddenCategory}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Risk Level
            </p>
            <p className="text-sm font-bold text-foreground mt-1">
              {scenario.riskLevel.toUpperCase()}
            </p>
            {!score.riskCorrect && (
              <p className="mt-1 text-xs text-red-600">
                Your selected risk level was different.
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-3 mb-5">
          <FeedbackList
            title="Correctly noticed"
            tone="green"
            items={feedback.correctSelectedOptions}
            empty="You did not select any correct signs this time."
          />

          <FeedbackList
            title={guidedMode ? "Missed signs from shown choices" : "Missed signs"}
            tone="red"
            items={feedback.missedOptions}
            empty="No missed signs from the choices shown. Nice work."
          />

          <FeedbackList
            title="Extra signs selected"
            tone="amber"
            items={feedback.extraSelectedOptions}
            empty="No extra signs selected."
            extraMode
          />

          {guidedMode && hiddenCorrectOptions.length > 0 && (
            <FeedbackList
              title="More signs to remember"
              tone="blue"
              items={hiddenCorrectOptions}
              empty="No extra learning notes."
            />
          )}
        </div>

        <div className="rounded-xl border border-border bg-white p-4 mb-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
            Explanation
          </p>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            {scenario.explanation}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 mb-5">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-700">Safer move</p>
              <p className="mt-1 text-sm text-foreground leading-relaxed">
                {scenario.safeAction}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link to={`/learning/${scenario.relatedLessonId}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full gap-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue-light"
            >
              <BookOpen className="h-4 w-4" />
              Learn This Pattern
            </Button>
          </Link>

          <Button
            onClick={onNextScenario}
            className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white gap-2"
          >
            Next Random Scenario
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
