import { CheckCircle, XCircle } from "lucide-react"

export function GoodBadComparison({
  badTitle = "Risky Move",
  badText,
  badWhy,
  goodTitle = "Safer Move",
  goodText,
  goodWhy,
}: {
  badTitle?: string
  badText: string
  badWhy: string
  goodTitle?: string
  goodText: string
  goodWhy: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="h-4 w-4 text-red-600" />
          <p className="text-sm font-bold text-red-700">{badTitle}</p>
        </div>
        <p className="text-sm font-medium text-foreground">{badText}</p>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{badWhy}</p>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <p className="text-sm font-bold text-emerald-700">{goodTitle}</p>
        </div>
        <p className="text-sm font-medium text-foreground">{goodText}</p>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{goodWhy}</p>
      </div>
    </div>
  )
}
