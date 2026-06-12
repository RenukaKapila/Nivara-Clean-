import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  FlaskConical,
  RefreshCcw,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getCompletedPracticeScenarioIds,
  resetPracticeSession,
  saveCompletedPracticeScenarioId,
} from "@/lib/practice-engine"
import type {
  PracticeDifficulty,
  PracticeRiskLevel,
  PracticeScenario,
} from "@/lib/practice-scenarios"
import { practiceScenarios } from "@/lib/practice-scenarios"
import { ScenarioCard } from "@/components/practice-lab/ScenarioCard"
import { AnswerPanel } from "@/components/practice-lab/AnswerPanel"
import { FeedbackPanel } from "@/components/practice-lab/FeedbackPanel"

const GUIDED_MODE_KEY = "nivara_practice_lab_guided_mode_v1"
const difficultyOptions: Array<"All" | PracticeDifficulty> = ["All", "Beginner", "Intermediate", "Advanced"]
const topicOptions = ["All", "Phishing", "Payments", "Jobs", "Family", "Accounts"] as const
type TopicFilter = (typeof topicOptions)[number]

function getInitialGuidedMode() {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(GUIDED_MODE_KEY) === "true"
}

function scenarioMatchesTopic(scenario: PracticeScenario, topic: TopicFilter) {
  if (topic === "All") return true

  const text = `${scenario.title} ${scenario.hiddenCategory} ${scenario.content.body}`.toLowerCase()
  if (topic === "Phishing") return /phishing|link|delivery|document|qr|login/.test(text)
  if (topic === "Payments") return /payment|gift|card|fee|refund|invoice|money|zelle|cash app|crypto/.test(text)
  if (topic === "Jobs") return /job|work|payroll|recruit|equipment|internship/.test(text)
  if (topic === "Family") return /family|mom|dad|grand|child|emergency/.test(text)
  if (topic === "Accounts") return /account|password|code|verification|support|device/.test(text)

  return true
}

function getRandomFilteredScenario(difficulty: "All" | PracticeDifficulty, topic: TopicFilter) {
  const completed = new Set(getCompletedPracticeScenarioIds())
  const candidates = practiceScenarios.filter((item) => {
    const difficultyMatch = difficulty === "All" || item.difficulty === difficulty
    return !completed.has(item.id) && difficultyMatch && scenarioMatchesTopic(item, topic)
  })

  if (candidates.length === 0) return null

  const index = Math.floor(Math.random() * candidates.length)
  return candidates[index]
}

export function ScamLab() {
  const [scenario, setScenario] = useState<PracticeScenario | null>(null)
  const [selectedWarningIds, setSelectedWarningIds] = useState<string[]>([])
  const [selectedRisk, setSelectedRisk] = useState<PracticeRiskLevel | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [guidedMode, setGuidedMode] = useState(getInitialGuidedMode)
  const [difficultyFilter, setDifficultyFilter] = useState<"All" | PracticeDifficulty>("All")
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("All")
  const practiceTopRef = useRef<HTMLDivElement | null>(null)
  const feedbackRef = useRef<HTMLDivElement | null>(null)

  function scrollToPracticeTop() {
    window.requestAnimationFrame(() => {
      practiceTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  function scrollToFeedback() {
    window.requestAnimationFrame(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  function loadNewScenario() {
    const next = getRandomFilteredScenario(difficultyFilter, topicFilter)

    setScenario(next)
    setSelectedWarningIds([])
    setSelectedRisk(null)
    setSubmitted(false)
    scrollToPracticeTop()
  }

  useEffect(() => {
    loadNewScenario()
  }, [difficultyFilter, topicFilter])


  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(GUIDED_MODE_KEY, guidedMode ? "true" : "false")
    }
  }, [guidedMode])


  const canSubmit = useMemo(() => {
    return selectedWarningIds.length > 0 && selectedRisk !== null
  }, [selectedWarningIds, selectedRisk])

  function toggleWarning(id: string) {
    if (submitted) return

    setSelectedWarningIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  function handleSubmit() {
    if (!scenario) return

    setSubmitted(true)
    saveCompletedPracticeScenarioId(scenario.id)
    scrollToFeedback()
  }

  function handleStartOver() {
    resetPracticeSession()
    loadNewScenario()
  }

  if (!scenario) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <FlaskConical className="h-6 w-6" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Practice Set Complete
            </h1>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              You reached the end of this practice set. Start over anytime to practice again.
            </p>

            <Button
              onClick={handleStartOver}
              className="mt-6 bg-brand-blue hover:bg-brand-blue/90 text-white gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div ref={practiceTopRef} className="scroll-mt-24" />

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
            <FlaskConical className="h-6 w-6" />
          </div>

          <Badge className="mb-3 bg-brand-blue-light text-brand-blue border border-brand-blue/20">
            Random Practice
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Practice Lab
          </h1>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Review realistic scenarios without seeing the category first. Spot the signals, choose the risk level, then learn the pattern.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex h-9 items-center rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-brand-blue">
            Filtered random
          </span>

          <button
            type="button"
            onClick={() => setGuidedMode((value) => !value)}
            className={`inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold transition-all ${
              guidedMode
                ? "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
                : "border-border bg-white text-muted-foreground hover:bg-muted/40"
            }`}
          >
            {guidedMode ? "Guided Mode On" : "Standard Mode On"}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleStartOver}
            className="h-9 rounded-full gap-2 border-border px-4"
          >
            <RefreshCcw className="h-4 w-4" />
            Start Over
          </Button>
        </div>

        <div className="mb-6 grid gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDifficultyFilter(option)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    difficultyFilter === option
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-border bg-white text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Topic</p>
            <div className="flex flex-wrap gap-2">
              {topicOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTopicFilter(option)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    topicFilter === option
                      ? "border-brand-teal bg-brand-teal-light text-brand-teal"
                      : "border-border bg-white text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <ScenarioCard scenario={scenario} />
        </div>

        <AnswerPanel
          scenario={scenario}
          selectedWarningIds={selectedWarningIds}
          selectedRisk={selectedRisk}
          submitted={submitted}
          guidedMode={guidedMode}
          onToggleWarning={toggleWarning}
          onRiskChange={setSelectedRisk}
        />

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white gap-2 mb-8"
          >
            Check My Answer
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <div ref={feedbackRef} className="scroll-mt-24">
            <FeedbackPanel
              scenario={scenario}
              selectedWarningIds={selectedWarningIds}
              selectedRisk={selectedRisk}
              guidedMode={guidedMode}
              onNextScenario={loadNewScenario}
            />
          </div>
        )}
      </div>
    </div>
  )
}
