import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Search, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { scamLibraryCategories, scamLibraryEntries } from "@/lib/scam-library"

export function ScamLibrary() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scamLibraryEntries.filter((entry) => {
      const matchesCategory = category === "All" || entry.category === category
      const matchesQuery =
        !q ||
        [entry.name, entry.targets, entry.setup, entry.example, entry.category]
          .join(" ")
          .toLowerCase()
          .includes(q)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Scam Pattern Library</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Search common scam patterns, see everyday examples, and learn safer next steps. Nivara teaches warning signs; it cannot guarantee whether something is or is not a scam.
          </p>
        </div>

        <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-9"
              placeholder="Search bank alerts, delivery texts, jobs, gift cards..."
              aria-label="Search scam library"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...scamLibraryCategories].map((item) => (
              <Button
                key={item}
                type="button"
                variant={category === item ? "default" : "outline"}
                className={category === item ? "bg-brand-blue text-white" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <Card key={entry.id} className="border-border shadow-sm">
              <CardContent className="flex h-full flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <Badge variant="outline" className="mb-2">{entry.category}</Badge>
                    <h2 className="text-lg font-bold">{entry.name}</h2>
                  </div>
                  <ShieldCheck className="h-5 w-5 shrink-0 text-brand-teal" />
                </div>

                <p className="text-xs font-semibold uppercase text-muted-foreground">Who it targets</p>
                <p className="mt-1 text-sm text-foreground">{entry.targets}</p>

                <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">Common setup</p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.setup}</p>

                <div className="mt-4 rounded-lg border border-border bg-muted/20 p-3">
                  <p className="text-xs font-semibold text-muted-foreground">Example</p>
                  <p className="mt-1 text-sm">{entry.example}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Red flags</p>
                  <ul className="mt-2 space-y-1.5">
                    {entry.redFlags.map((flag) => (
                      <li key={flag} className="text-sm text-muted-foreground">- {flag}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-sm font-medium text-foreground">{entry.safeAction}</p>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link to={`/learning/${entry.relatedLessonId}`} className="flex-1">
                    <Button variant="outline" className="w-full border-brand-blue/30 text-brand-blue">
                      Lesson
                    </Button>
                  </Link>
                  <Link to={entry.practiceLink} className="flex-1">
                    <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90">
                      Practice <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
