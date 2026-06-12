import type { MessageMockupLine } from "@/types/learning"

const toneClasses = {
  normal: "bg-white border-border text-foreground",
  warning: "bg-red-50 border-red-200 text-red-800",
  safe: "bg-emerald-50 border-emerald-200 text-emerald-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
}

export function MessageMockup({
  title = "Message Example",
  lines,
}: {
  title?: string
  lines: MessageMockupLine[]
}) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">
        For example
      </p>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold text-muted-foreground mb-3">{title}</p>

        <div className="space-y-2">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`rounded-xl border px-3 py-2 text-sm leading-relaxed ${
                toneClasses[line.tone || "normal"]
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
