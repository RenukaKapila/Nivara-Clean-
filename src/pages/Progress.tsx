import { Link } from "react-router-dom"
import { Award, BookOpen, CalendarDays, CheckCircle, FlaskConical, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { getProgressSummary } from "@/lib/progress"
import { monthlyModules } from "@/lib/monthly-modules"

const badges = [
  {
    id: "first-pause",
    title: "First Pause",
    description: "Complete one lesson or practice round.",
    earned: (summary: ReturnType<typeof getProgressSummary>) => summary.completedCount >= 1,
  },
  {
    id: "lesson-builder",
    title: "Lesson Builder",
    description: "Finish three safety lessons.",
    earned: (summary: ReturnType<typeof getProgressSummary>) => summary.completedLessons.length >= 3,
  },
  {
    id: "practice-spotter",
    title: "Practice Spotter",
    description: "Complete five practice scenarios.",
    earned: (summary: ReturnType<typeof getProgressSummary>) => summary.completedPractice.length >= 5,
  },
  {
    id: "family-ready",
    title: "Family Ready",
    description: "Reach 25% overall progress.",
    earned: (summary: ReturnType<typeof getProgressSummary>) => summary.percent >= 25,
  },
]

export function Progress() {
  const summary = getProgressSummary()
  const module = monthlyModules[0]
  const modulePracticeDone = module.practiceScenarioIds.filter((id) =>
    summary.completedPractice.includes(id),
  ).length
  const moduleLessonDone = module.relatedLessonIds.filter((id) => summary.completedLessons.includes(id)).length
  const moduleSteps = module.practiceScenarioIds.length + module.relatedLessonIds.length
  const moduleDone = modulePracticeDone + moduleLessonDone
  const modulePercent = Math.round((moduleDone / moduleSteps) * 100)
  const earnedBadges = badges.map((badge) => ({ ...badge, isEarned: badge.earned(summary) }))

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
            <Award className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Progress</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Nivara tracks learning and practice in this browser only. No account is needed.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-brand-blue" />
                <div>
                  <p className="text-2xl font-bold">{summary.completedLessons.length}/{summary.lessonCount}</p>
                  <p className="text-sm text-muted-foreground">Lessons completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <FlaskConical className="h-5 w-5 text-brand-teal" />
                <div>
                  <p className="text-2xl font-bold">{summary.completedPractice.length}/{summary.practiceCount}</p>
                  <p className="text-sm text-muted-foreground">Practice scenarios completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-lg font-bold">{summary.level}</p>
                  <p className="text-sm text-muted-foreground">{summary.percent}% overall progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarDays className="h-5 w-5 text-brand-blue" />
              Monthly Module
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase text-brand-blue">{module.month}</p>
              <h2 className="mt-1 text-2xl font-bold">{module.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{module.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">Best for: {module.audience}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
              <p className="text-xs font-semibold text-muted-foreground">Example message</p>
              <p className="mt-1">{module.exampleMessage}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Module progress</span>
                <span className="text-muted-foreground">{moduleDone}/{moduleSteps}</span>
              </div>
              <ProgressBar value={modulePercent} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {module.checklistItems.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg border border-border p-3 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/learning/${module.relatedLessonIds[0]}`}>
                <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 sm:w-auto">
                  Start Module Lesson
                </Button>
              </Link>
              <Link to="/scam-lab">
                <Button variant="outline" className="w-full border-brand-blue/30 text-brand-blue sm:w-auto">
                  Practice Examples
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="h-5 w-5 text-brand-blue" />
              Safety Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-lg border p-4 ${
                    badge.isEarned
                      ? "border-brand-teal/40 bg-brand-teal-light/40"
                      : "border-border bg-muted/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        badge.isEarned ? "bg-brand-teal text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{badge.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
