import { Link } from "react-router-dom"
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Eye,
  FlaskConical,
  HelpCircle,
  Lock,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { monthlyModules } from "@/lib/monthly-modules"

const howItWorksSteps = [
  {
    icon: Eye,
    title: "Paste a suspicious message",
    description: "Copy in a text, email, or note that made you pause.",
  },
  {
    icon: Lock,
    title: "See hidden private info",
    description: "Nivara redacts common personal details before showing results.",
  },
  {
    icon: BookOpen,
    title: "Learn the scam pattern",
    description: "Review plain-language red flags and safer next steps.",
  },
  {
    icon: FlaskConical,
    title: "Practice similar examples",
    description: "Build confidence with realistic scenarios you can try again.",
  },
]

const startCards = [
  {
    icon: Shield,
    title: "I want to check something",
    description: "Paste a suspicious message and review possible warning signs.",
    cta: "Check a Message",
    href: "/check",
  },
  {
    icon: BookOpen,
    title: "I want to learn",
    description: "Take short lessons that explain scam patterns in everyday language.",
    cta: "Start Learning",
    href: "/learning",
  },
  {
    icon: HelpCircle,
    title: "I need help now",
    description: "Get calm recovery steps and official resources if something already happened.",
    cta: "Get Help",
    href: "/report",
  },
  {
    icon: BookOpen,
    title: "I want a scam library",
    description: "Search common scam patterns and learn what to notice.",
    cta: "Open Library",
    href: "/library",
  },
]

const lessonLinks = [
  { title: "Phishing & Fake Websites", href: "/learning/phishing-fake-websites" },
  { title: "Social Engineering", href: "/learning/social-engineering" },
  { title: "Payment & Money Scams", href: "/learning/payment-money-scams" },
  { title: "Safe Verification Habits", href: "/learning/safe-verification-habits" },
]

export function Home() {
  const module = monthlyModules[0]

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge className="mb-5 w-fit border-brand-blue/20 bg-brand-blue-light text-brand-blue">
              Privacy-first scam learning
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Learn the red flags before they learn you.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Nivara helps people recognize scams through private message checks, bite-sized lessons, and realistic practice.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              It is a local-first learning MVP for everyday people, families, students, parents, and older adults.
              It teaches warning signs; it does not promise perfect scam detection.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/check">
                <Button size="lg" className="w-full gap-2 bg-brand-blue text-white hover:bg-brand-blue/90 sm:w-auto">
                  Check a Message
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/scam-lab">
                <Button size="lg" variant="outline" className="w-full gap-2 border-brand-blue/30 text-brand-blue sm:w-auto">
                  <FlaskConical className="h-4 w-4" />
                  Start Practice Lab
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-5">
            <div className="rounded-xl border border-red-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase text-red-600">Example message</p>
              <p className="mt-2 rounded-lg bg-red-50 p-3 font-mono text-xs leading-relaxed text-foreground">
                Package held. Pay $0.30 today to avoid return: delivery-label-update.example
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-brand-teal/20 bg-white p-4">
              <p className="text-xs font-semibold uppercase text-brand-teal">Nivara helps you notice</p>
              <div className="mt-3 space-y-2">
                {["Tiny fee used as bait", "Unfamiliar delivery link", "Urgent deadline"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-brand-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Analysis runs in your browser in this MVP. Always verify through official sources before clicking, paying, or sharing personal information.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pause. Check. Learn. Practice. Stay safer.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Nivara is built around one simple loop that helps people slow down and make safer choices.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-light text-brand-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Where do you want to start?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Choose the path that matches what you need right now.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {startCards.map(({ icon: Icon, title, description, cta, href }) => (
              <Card key={title} className="border-border shadow-sm">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal-light text-brand-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <Link to={href} className="mt-5">
                    <Button variant="outline" className="w-full justify-between border-brand-blue/30 text-brand-blue">
                      {cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Card className="border-border bg-white shadow-sm">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase text-brand-blue">{module.month}</p>
              <h2 className="mt-2 text-2xl font-bold">{module.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
              <div className="mt-4 rounded-lg border border-border bg-white/70 p-3 text-sm">
                <p className="text-xs font-semibold text-muted-foreground">Example</p>
                <p className="mt-1">{module.exampleMessage}</p>
              </div>
              <div className="mt-4 grid gap-2">
                {module.redFlags.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link to={`/learning/${module.relatedLessonIds[0]}`}>
                  <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 sm:w-auto">
                    Start Module
                  </Button>
                </Link>
                <Link to="/progress">
                  <Button variant="outline" className="w-full border-brand-blue/30 text-brand-blue sm:w-auto">
                    View Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold">Popular lessons</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Start with the patterns people run into most often.
              </p>
              <div className="mt-5 grid gap-3">
                {lessonLinks.map((lesson) => (
                  <Link
                    key={lesson.href}
                    to={lesson.href}
                    className="flex items-center justify-between rounded-lg border border-border p-3 text-sm font-medium hover:bg-muted/30"
                  >
                    {lesson.title}
                    <ArrowRight className="h-4 w-4 text-brand-blue" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Lock className="mx-auto mb-4 h-8 w-8 text-brand-teal" />
          <h2 className="text-3xl font-bold tracking-tight">Private by default in this MVP</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Message checks, lessons, practice progress, and terms acceptance run locally in your browser. Nivara does not provide legal, financial, banking, law-enforcement, or emergency services. When something matters, verify through official sources.
          </p>
        </div>
      </section>

      <section className="bg-muted/20 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Before You Pay", text: "Use a guided checklist before sending money.", href: "/before-you-pay" },
              { title: "Safe Share", text: "Redact private details before asking for help.", href: "/safe-share" },
              { title: "Family Practice", text: "Run five quick safety scenarios together.", href: "/family-practice" },
              { title: "Support Nivara", text: "Optional support. The app stays free and has no paywall.", href: "/support" },
            ].map((item) => (
              <Card key={item.href} className="border-border bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                  <Link to={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                    Open <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
