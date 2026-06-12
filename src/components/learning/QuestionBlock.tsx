import { useState } from "react"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LessonPractice } from "@/types/learning"

export function QuestionBlock({ practice }: { practice: LessonPractice }) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)
  const selectedChoice = practice.choices.find((choice) => choice.id === selectedChoiceId)
  const answered = selectedChoiceId !== null

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">
        Quick Check
      </p>

      <p className="text-sm font-semibold text-foreground leading-relaxed mb-4">
        {practice.prompt}
      </p>

      <div className="space-y-2">
        {practice.choices.map((choice) => {
          const selected = selectedChoiceId === choice.id

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => setSelectedChoiceId(choice.id)}
              disabled={answered}
              className={`w-full rounded-xl border p-4 text-left text-sm transition-all ${
                !answered
                  ? "bg-white hover:bg-amber-100/60 hover:border-amber-300"
                  : selected && choice.correct
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : selected && !choice.correct
                      ? "bg-red-50 border-red-300 text-red-800"
                      : choice.correct
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                        : "bg-white/60 border-border text-muted-foreground"
              }`}
            >
              <div className="flex items-start gap-2">
                {answered ? (
                  choice.correct ? (
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : selected ? (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground/30 mt-0.5 shrink-0" />
                  )
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-current mt-0.5 shrink-0" />
                )}
                <span>{choice.text}</span>
              </div>
            </button>
          )
        })}
      </div>

      {selectedChoice && (
        <div
          className={`mt-4 rounded-xl border p-4 ${
            selectedChoice.correct
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className={`text-sm font-bold mb-1 ${selectedChoice.correct ? "text-emerald-700" : "text-red-700"}`}>
            {selectedChoice.correct ? "Good catch!" : "That was a tricky one."}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{selectedChoice.feedback}</p>
        </div>
      )}

      {selectedChoiceId && (
        <Button
          variant="outline"
          onClick={() => setSelectedChoiceId(null)}
          className="mt-4 gap-2 border-amber-300 text-amber-700 hover:bg-amber-100"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
