import { Brain, Lightbulb } from "lucide-react"
import type { LearningMode } from "@/types/learning"

export function TechnicalModeToggle({
  mode,
  onChange,
}: {
  mode: LearningMode
  onChange: (mode: LearningMode) => void
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange("simple")}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
            mode === "simple"
              ? "bg-brand-blue text-white shadow-sm"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Lightbulb className="h-4 w-4" />
          Simple
        </button>

        <button
          type="button"
          onClick={() => onChange("technical")}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
            mode === "technical"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Brain className="h-4 w-4" />
          Technical
        </button>
      </div>
    </div>
  )
}
