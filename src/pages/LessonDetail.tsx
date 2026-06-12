import { useEffect, useMemo, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Clock,
  Building2,
  Briefcase,
  Package,
  Car,
  Landmark,
  Heart,
  CreditCard,
  UserX,
  Shield,
  Sparkles,
  Lightbulb,
  Brain,
  Eye,
  ListChecks,
  LockKeyhole,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { lessons } from "@/lib/lessons"
import type { LearningMode } from "@/types/learning"
import { TechnicalModeToggle } from "@/components/learning/TechnicalModeToggle"
import { LessonBlockShell } from "@/components/learning/LessonBlockShell"
import { MessageMockup } from "@/components/learning/MessageMockup"
import { GoodBadComparison } from "@/components/learning/GoodBadComparison"
import { QuestionBlock } from "@/components/learning/QuestionBlock"
import { URLBreakdown } from "@/components/learning/URLBreakdown"
import { metallicText } from "@/components/learning/learningStyles"
import { saveCompletedLessonId } from "@/lib/progress"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Briefcase,
  Package,
  Car,
  Landmark,
  Heart,
  CreditCard,
  UserX,
  Shield,
}

const categoryColors: Record<string, string> = {
  Financial: "text-blue-700 bg-blue-50 border-blue-200",
  Employment: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Delivery: "text-orange-700 bg-orange-50 border-orange-200",
  Government: "text-brand-teal bg-teal-50 border-teal-200",
  Social: "text-pink-700 bg-pink-50 border-pink-200",
  Privacy: "text-purple-700 bg-purple-50 border-purple-200",
}

const difficultyColors: Record<string, string> = {
  Beginner: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Intermediate: "text-amber-700 bg-amber-50 border-amber-200",
  Advanced: "text-red-700 bg-red-50 border-red-200",
}

function getMessageMockupLines(lessonId: string) {
  if (lessonId === "phishing-fake-websites") {
    return [
      { text: "Chase Alert: A new device was added to your account.", tone: "warning" as const },
      { text: "Verify now: chase-secure-login.accountreview-center.com", tone: "warning" as const },
      { text: "Safer move: open the Chase app directly instead.", tone: "safe" as const },
    ]
  }

  if (lessonId === "social-engineering") {
    return [
      { text: "Mom, don’t call me right now. I’m in trouble.", tone: "warning" as const },
      { text: "Please send Apple gift cards and don’t tell anyone.", tone: "warning" as const },
      { text: "Safer move: call your child using their saved number.", tone: "safe" as const },
    ]
  }

  if (lessonId === "payment-money-scams") {
    return [
      { text: "You got the remote job! Pay the $85 equipment fee today.", tone: "warning" as const },
      { text: "Use Zelle or Cash App. It will be refunded later.", tone: "warning" as const },
      { text: "Safer move: never pay to start a job.", tone: "safe" as const },
    ]
  }

  if (lessonId === "passwords-mfa-account-safety") {
    return [
      { text: "Your verification code is 482910.", tone: "info" as const },
      { text: "Someone asks: read me the code so I can help you.", tone: "warning" as const },
      { text: "Safer move: never share verification codes.", tone: "safe" as const },
    ]
  }

  return [
    { text: "For example: you receive a message asking you to act quickly.", tone: "info" as const },
    { text: "It includes pressure, a link, money, or personal information.", tone: "warning" as const },
    { text: "Safer move: pause and verify through a trusted source.", tone: "safe" as const },
  ]
}

function getComparison(lessonId: string) {
  if (lessonId === "phishing-fake-websites") {
    return {
      badText: "Click the link in the message.",
      badWhy: "This keeps you inside the scammer’s path.",
      goodText: "Open the official app or type the real website yourself.",
      goodWhy: "This moves you to a trusted source.",
    }
  }

  if (lessonId === "social-engineering") {
    return {
      badText: "Keep the situation secret because the message says so.",
      badWhy: "Secrecy prevents you from getting a second opinion.",
      goodText: "Call the person directly or ask a trusted person.",
      goodWhy: "A second channel breaks the scammer’s control.",
    }
  }

  if (lessonId === "payment-money-scams") {
    return {
      badText: "Send gift cards, crypto, Zelle, or Cash App quickly.",
      badWhy: "These payments can be hard or impossible to reverse.",
      goodText: "Stop and verify before paying anything unusual.",
      goodWhy: "Real organizations do not pressure you into strange payment methods.",
    }
  }

  return {
    badText: "Act quickly inside the message.",
    badWhy: "Scammers want you to react before thinking.",
    goodText: "Pause, leave the message, and verify separately.",
    goodWhy: "A trusted source gives you a safer answer.",
  }
}

export function LessonDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [mode, setMode] = useState<LearningMode>("simple")
  const [step, setStep] = useState(0)

  const lesson = lessons.find((l) => l.id === id)
  const currentIndex = lessons.findIndex((l) => l.id === id)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  useEffect(() => {
    setStep(0)
    setMode("simple")
  }, [id])

  const lessonSteps = useMemo(() => {
    const baseSteps = ["Start", "Explain", "Example", "Question", "Safety", "Finish"]
    if (mode === "technical" && lesson?.technicalExplanation) {
      return ["Start", "Explain", "Technical", "Example", "Question", "Safety", "Finish"]
    }
    return baseSteps
  }, [mode, lesson?.technicalExplanation])

  const currentStepName = lessonSteps[step]

  useEffect(() => {
    if (lesson && currentStepName === "Finish") {
      saveCompletedLessonId(lesson.id)
    }
  }, [lesson, currentStepName])

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <p className="text-muted-foreground mb-4">Lesson not found.</p>
          <Link to="/learning">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
              View All Lessons
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const Icon = iconMap[lesson.icon] ?? BookOpen
  const catColor = categoryColors[lesson.category] ?? "text-muted-foreground bg-muted border-border"
  const difficultyColor =
    difficultyColors[lesson.difficulty] ?? "text-muted-foreground bg-muted border-border"
  const progress = Math.round(((step + 1) / lessonSteps.length) * 100)
  const comparison = getComparison(lesson.id)

  function goNext() {
    setStep((prev) => Math.min(prev + 1, lessonSteps.length - 1))
  }

  function goBack() {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  function handleModeChange(nextMode: LearningMode) {
    setMode(nextMode)
    setStep(0)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate("/learning")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          All Lessons
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`text-xs ${catColor}`}>
                {lesson.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${difficultyColor}`}>
                {lesson.difficulty}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {lesson.readTime} read
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {lesson.title}
          </h1>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {lesson.overview}
          </p>
        </div>

        {lesson.technicalExplanation && (
          <div className="mb-6">
            <TechnicalModeToggle mode={mode} onChange={handleModeChange} />
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                Step {step + 1} of {lessonSteps.length}
              </p>
              <p className="text-sm font-bold text-brand-blue">{currentStepName}</p>
            </div>
            <p className="text-xs font-semibold text-brand-blue">{progress}%</p>
          </div>

          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-teal to-emerald-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="mb-6 border-border shadow-sm">
          <CardContent className="p-5">
            {currentStepName === "Start" && (
              <LessonBlockShell
                tone="info"
                label="Start Here"
                title="What you’ll learn"
                description="This lesson teaches one safety pattern at a time."
                icon={Sparkles}
              >
                <div className="space-y-3">
                  {lesson.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-white border border-border p-3">
                      <CheckCircle className="h-4 w-4 text-brand-teal mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </LessonBlockShell>
            )}

            {currentStepName === "Explain" && (
              <div className="space-y-5">
                <LessonBlockShell
                  tone="info"
                  label="Simple Idea"
                  title="Plain-language explanation"
                  description="A quick explanation before we look at examples."
                  icon={Lightbulb}
                >
                  <p className="text-base text-foreground leading-relaxed">
                    {lesson.simpleExplanation}
                  </p>
                </LessonBlockShell>

                <MessageMockup
                  title="Realistic example"
                  lines={getMessageMockupLines(lesson.id)}
                />
              </div>
            )}

            {currentStepName === "Technical" && (
              <div className="space-y-5">
                <LessonBlockShell
                  tone="technical"
                  label="Technical Layer"
                  title="How this works underneath"
                  description="This explains the cybersecurity mechanics in clear language."
                  icon={Brain}
                >
                  <p className="text-sm text-foreground leading-relaxed">
                    {lesson.technicalExplanation}
                  </p>
                </LessonBlockShell>

                {lesson.id === "phishing-fake-websites" ? (
                  <URLBreakdown
                    url="chase-secure-login.accountreview-center.com"
                    looksLike="Chase, because the word chase appears in the link."
                    realDomain="accountreview-center.com"
                    lesson="The real domain matters more than a brand name placed inside the link."
                  />
                ) : (
                  <LessonBlockShell
                    tone="example"
                    label="For Example"
                    title="Technical example"
                    icon={Eye}
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      For example: {lesson.examples[0]}
                    </p>
                  </LessonBlockShell>
                )}
              </div>
            )}

            {currentStepName === "Example" && (
              <div className="space-y-5">
                <LessonBlockShell
                  tone="example"
                  label="For Example"
                  title="Real situations"
                  description="Examples help the pattern become easier to recognize."
                  icon={Eye}
                >
                  <div className="space-y-3">
                    {lesson.examples.map((example, i) => (
                      <div key={i} className="rounded-xl border border-blue-200 bg-white p-3">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className={`font-bold ${metallicText.example}`}>
                            For example:
                          </span>{" "}
                          {example}
                        </p>
                      </div>
                    ))}
                  </div>
                </LessonBlockShell>

                <LessonBlockShell
                  tone="warning"
                  label="What to Notice"
                  title="Warning signs"
                  icon={AlertTriangle}
                >
                  <div className="space-y-2">
                    {lesson.redFlags.slice(0, 5).map((flag, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-xl border border-red-100 bg-white p-3 text-sm text-foreground">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </LessonBlockShell>
              </div>
            )}

            {currentStepName === "Question" && (
              <QuestionBlock practice={lesson.practice} />
            )}

            {currentStepName === "Safety" && (
              <div className="space-y-5">
                <LessonBlockShell
                  tone="safe"
                  label="Good vs Bad"
                  title="Choose the safer move"
                  description="This comparison shows what to avoid and what to do instead."
                  icon={Shield}
                >
                  <GoodBadComparison
                    badText={comparison.badText}
                    badWhy={comparison.badWhy}
                    goodText={comparison.goodText}
                    goodWhy={comparison.goodWhy}
                  />
                </LessonBlockShell>

                <LessonBlockShell
                  tone="checklist"
                  label="Safety Takeaways"
                  title="Remember these steps"
                  description="These are not questions. They are the main actions to remember."
                  icon={ListChecks}
                >
                  <div className="grid gap-3">
                    {lesson.quickChecklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-white border border-cyan-200 p-3">
                        <CheckCircle className="h-4 w-4 text-brand-teal mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </LessonBlockShell>
              </div>
            )}

            {currentStepName === "Finish" && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                  <LockKeyhole className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className={`text-2xl font-extrabold mb-1 ${metallicText.safe}`}>
                    Nice work.
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    You learned the pattern, practiced a decision, and reviewed safer next steps.
                  </p>
                </div>

                <LessonBlockShell
                  tone="safe"
                  label="What to Do Next"
                  title="Safer next steps"
                  icon={CheckCircle}
                >
                  <div className="space-y-2">
                    {lesson.whatToDoNext.slice(0, 4).map((action, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-white p-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground leading-relaxed">{action}</p>
                      </div>
                    ))}
                  </div>
                </LessonBlockShell>

                {lesson.practiceScenarioId && (
                  <Link to="/scam-lab" className="block">
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white gap-2">
                      Practice This in Practice Lab
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3 mb-8">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={step === 0}
            className="flex-1 border-brand-blue/30 text-brand-blue hover:bg-brand-blue-light"
          >
            Back
          </Button>

          <Button
            onClick={goNext}
            disabled={step === lessonSteps.length - 1}
            className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white gap-2"
          >
            {step === lessonSteps.length - 2 ? "Finish Lesson" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-8">
          <Link to="/scam-lab">
            <Button variant="outline" className="w-full gap-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue-light">
              Open Practice Lab
            </Button>
          </Link>
        </div>

        <div className="flex justify-between gap-3 border-t border-border pt-6">
          {prevLesson ? (
            <Link to={`/learning/${prevLesson.id}`} className="flex-1">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-left">
                  <span className="block text-xs text-muted-foreground/60">Previous</span>
                  {prevLesson.title}
                </span>
              </button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextLesson ? (
            <Link to={`/learning/${nextLesson.id}`} className="flex-1">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group text-right ml-auto">
                <span>
                  <span className="block text-xs text-muted-foreground/60">Next</span>
                  {nextLesson.title}
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  )
}
