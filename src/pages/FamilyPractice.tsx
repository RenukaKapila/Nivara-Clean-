import { useState } from "react"
import { ArrowRight, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { familyPracticeScenarios, familySafetyChecklist } from "@/lib/family-practice"

export function FamilyPractice() {
  const [index, setIndex] = useState(0)
  const scenario = familyPracticeScenarios[index]
  const isLast = index === familyPracticeScenarios.length - 1
  const percent = Math.round(((index + 1) / familyPracticeScenarios.length) * 100)

  function next() {
    setIndex((current) => Math.min(current + 1, familyPracticeScenarios.length - 1))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal text-white">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Family Safety Practice</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Five quick scenarios for families to discuss together. Kids can ask for help without getting in trouble.
          </p>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Scenario {index + 1} of {familyPracticeScenarios.length}</span>
            <span>{percent}%</span>
          </div>
          <Progress value={percent} />
        </div>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">{scenario.title}</h2>
            <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4 text-sm leading-relaxed">
              {scenario.message}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Discuss the red flags</p>
                <ul className="mt-2 space-y-2">
                  {scenario.redFlags.map((flag) => (
                    <li key={flag} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold">Safe family rule</p>
                <p className="mt-2 rounded-lg border border-brand-teal/20 bg-brand-teal-light/40 p-3 text-sm">
                  {scenario.safeRule}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-border p-4">
              <p className="text-sm font-semibold">Family discussion</p>
              <p className="mt-1 text-sm text-muted-foreground">{scenario.discussionPrompt}</p>
            </div>

            {!isLast ? (
              <Button onClick={next} className="mt-6 w-full bg-brand-blue text-white hover:bg-brand-blue/90">
                Next Scenario <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-800">Family checklist</p>
                <ul className="mt-3 space-y-2">
                  {familySafetyChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-emerald-900">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
