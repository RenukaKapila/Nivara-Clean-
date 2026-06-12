import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { blockStyles, metallicText } from "./learningStyles"

type Tone = keyof typeof blockStyles

export function LessonBlockShell({
  tone,
  label,
  title,
  description,
  icon: Icon,
  children,
}: {
  tone: Tone
  label: string
  title: string
  description?: string
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${blockStyles[tone]}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 border border-white shadow-sm">
          <Icon className="h-5 w-5 text-foreground" />
        </div>

        <div>
          <p className={`text-xs font-bold uppercase tracking-wide ${metallicText[tone]}`}>
            {label}
          </p>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}
