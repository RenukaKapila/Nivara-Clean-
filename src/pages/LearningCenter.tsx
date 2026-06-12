import { Link } from "react-router-dom"
import {
  BookOpen,
  Building2,
  Briefcase,
  Package,
  Car,
  Landmark,
  Heart,
  CreditCard,
  UserX,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle,
  FlaskConical,
  Sparkles,
  Brain,
  Layers,
  Route,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { lessons } from "@/lib/lessons"
import { monthlyModules } from "@/lib/monthly-modules"

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

const courseSections = [
  {
    title: "Start Here",
    description: "Learn how scams get attention and how to recognize the first warning signs.",
    tone: "from-blue-50 to-cyan-50 border-blue-200",
    labelClass: "text-blue-700",
    lessonIds: [
      "phishing-fake-websites",
      "social-engineering",
      "passwords-mfa-account-safety",
    ],
  },
  {
    title: "Build Protection",
    description: "Strengthen your money, devices, accounts, and identity before something happens.",
    tone: "from-emerald-50 to-teal-50 border-emerald-200",
    labelClass: "text-emerald-700",
    lessonIds: [
      "payment-money-scams",
      "device-app-safety",
      "identity-protection",
    ],
  },
  {
    title: "Respond Safely",
    description: "Practice safe verification habits and learn what to do if something already happened.",
    tone: "from-purple-50 to-indigo-50 border-purple-200",
    labelClass: "text-purple-700",
    lessonIds: [
      "safe-verification-habits",
      "after-something-happened",
    ],
  },
]

const orderedLessonIds = courseSections.flatMap((section) => section.lessonIds)

export function LearningCenter() {
  const firstLesson = lessons.find((lesson) => lesson.id === orderedLessonIds[0])
  const starterModule = monthlyModules[0]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>

          <Badge className="mb-4 bg-brand-blue-light text-brand-blue border border-brand-blue/20">
            Interactive Scam & Cyber Safety Course
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Learn Before You Act
          </h1>

          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Short interactive lessons with examples, simple explanations, optional technical mode, practice questions, and safer action steps.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {firstLesson && (
              <Link to={`/learning/${firstLesson.id}`}>
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white gap-2">
                  Start Course
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}

            <Link to="/scam-lab">
              <Button
                variant="outline"
                className="gap-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue-light"
              >
                Open Practice Lab
                <FlaskConical className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-10">
          <Card className="border-blue-200 bg-blue-50/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Examples First</p>
                  <p className="text-xs text-muted-foreground">
                    Realistic messages, links, and situations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Simple + Technical</p>
                  <p className="text-xs text-muted-foreground">
                    Learn plainly or go deeper when needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Practice as You Go</p>
                  <p className="text-xs text-muted-foreground">
                    Quick checks and safer move comparisons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10 rounded-3xl border border-brand-blue/20 bg-brand-blue-light/40 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                {starterModule.month}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">
                {starterModule.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {starterModule.description}
              </p>
            </div>
            <Link to={`/learning/${starterModule.relatedLessonIds[0]}`}>
              <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 lg:w-auto">
                Start Monthly Module
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {courseSections.map((section) => {
            const sectionLessons = section.lessonIds
              .map((lessonId) => lessons.find((lesson) => lesson.id === lessonId))
              .filter(Boolean)

            return (
              <section
                key={section.title}
                className={`rounded-3xl border bg-gradient-to-br ${section.tone} p-5 sm:p-6`}
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm">
                    <Route className="h-5 w-5" />
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wide ${section.labelClass}`}>
                      Course Section
                    </p>
                    <h2 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {sectionLessons.map((lesson) => {
                    if (!lesson) return null

                    const Icon = iconMap[lesson.icon] || Shield
                    const categoryClass =
                      categoryColors[lesson.category] || "text-muted-foreground bg-muted border-border"
                    const difficultyClass =
                      difficultyColors[lesson.difficulty] || "text-muted-foreground bg-muted border-border"
                    const moduleNumber = orderedLessonIds.indexOf(lesson.id) + 1

                    return (
                      <Link key={lesson.id} to={`/learning/${lesson.id}`} className="group">
                        <Card className="h-full border-border bg-white/90 shadow-sm hover:shadow-md transition-all duration-150 hover:-translate-y-0.5">
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
                                  <Icon className="h-5 w-5" />
                                </div>

                                <div>
                                  <p className="text-xs font-bold text-muted-foreground">
                                    Module {moduleNumber}
                                  </p>
                                  <h3 className="text-base font-bold text-foreground group-hover:text-brand-blue transition-colors leading-tight">
                                    {lesson.title}
                                  </h3>
                                </div>
                              </div>

                              <ArrowRight className="h-4 w-4 text-brand-blue transition-transform group-hover:translate-x-1 shrink-0 mt-1" />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <Badge variant="outline" className={`text-xs ${categoryClass}`}>
                                {lesson.category}
                              </Badge>

                              <Badge variant="outline" className={`text-xs ${difficultyClass}`}>
                                {lesson.difficulty}
                              </Badge>

                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {lesson.readTime}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {lesson.overview}
                            </p>

                            <div className="mt-4 rounded-xl border border-border bg-muted/20 p-3">
                              <p className="text-xs font-semibold text-foreground mb-2">
                                What you’ll practice
                              </p>

                              <div className="space-y-1.5">
                                {lesson.whatYouWillLearn.slice(0, 2).map((item) => (
                                  <div key={item} className="flex items-start gap-2">
                                    <CheckCircle className="h-3.5 w-3.5 text-brand-teal mt-0.5 shrink-0" />
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                Examples
                              </span>
                              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                Quick Check
                              </span>
                              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                Safer Move
                              </span>
                              {lesson.technicalExplanation && (
                                <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                                  Technical Mode
                                </span>
                              )}
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                              <span className="text-sm font-semibold text-brand-blue">
                                Start module
                              </span>
                              <Layers className="h-4 w-4 text-brand-blue" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue-light/60 to-brand-teal-light/40 p-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm">
            <FlaskConical className="h-5 w-5" />
          </div>

          <h2 className="text-xl font-bold text-foreground">
            Ready to test what you learned?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Practice Lab gives you realistic scam scenarios so you can spot warning signs before they happen in real life.
          </p>

          <Link to="/scam-lab" className="inline-block mt-5">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white gap-2">
              Open Practice Lab
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
