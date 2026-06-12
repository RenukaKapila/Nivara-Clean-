export function URLBreakdown({
  url,
  looksLike,
  realDomain,
  lesson,
}: {
  url: string
  looksLike: string
  realDomain: string
  lesson: string
}) {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-3">
        Visual Breakdown
      </p>

      <div className="rounded-xl bg-muted/40 border border-border p-3 font-mono text-xs sm:text-sm break-all text-foreground">
        {url}
      </div>

      <div className="mt-4 grid gap-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-700">Looks like</p>
          <p className="text-sm text-foreground">{looksLike}</p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-700">Real domain</p>
          <p className="text-sm text-foreground font-mono break-all">{realDomain}</p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-xs font-semibold text-emerald-700">Remember</p>
          <p className="text-sm text-foreground">{lesson}</p>
        </div>
      </div>
    </div>
  )
}
