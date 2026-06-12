import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Shield, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const desktopNavLinks = [
  { label: "Check", href: "/check" },
  { label: "Learn", href: "/learning" },
  { label: "Practice", href: "/scam-lab" },
  { label: "Progress", href: "/progress" },
  { label: "Help", href: "/report" },
  { label: "Library", href: "/library" },
  { label: "Privacy", href: "/privacy" },
  { label: "Support", href: "/support" },
]

const mobileNavLinks = [
  { label: "Check", href: "/check" },
  { label: "Learn", href: "/learning" },
  { label: "Practice", href: "/scam-lab" },
  { label: "Progress", href: "/progress" },
  { label: "Help", href: "/report" },
  { label: "Library", href: "/library" },
  { label: "Privacy", href: "/privacy" },
  { label: "Before You Pay", href: "/before-you-pay" },
  { label: "Safe Share", href: "/safe-share" },
  { label: "Family Practice", href: "/family-practice" },
  { label: "Support Nivara", href: "/support" },
]

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-sm transition-transform duration-150 group-hover:scale-105">
              <Shield className="h-4 w-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-foreground">Nivara</span>
              <span className="text-[10px] text-muted-foreground font-medium hidden sm:block">Learn the red flags before they learn you.</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {desktopNavLinks.map((link) => (
              <Link key={link.href} to={link.href} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${location.pathname === link.href || location.pathname.startsWith(link.href + "/") ? "text-brand-blue bg-brand-blue-light" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center shrink-0 gap-2">
            <Link to="/check"><Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white shadow-sm gap-1.5">Check Message<ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          </div>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden p-2 text-muted-foreground hover:text-foreground" aria-label="Open navigation menu">
                {sheetOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 bg-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-sm"><Shield className="h-4 w-4" /></div>
                  <div className="flex flex-col leading-none"><span className="text-base font-bold tracking-tight text-foreground">Nivara</span><span className="text-[10px] text-muted-foreground font-medium">Learn the red flags before they learn you.</span></div>
                </div>
                <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
                  {mobileNavLinks.map((link) => (
                    <Link key={link.href} to={link.href} onClick={() => setSheetOpen(false)} className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150 min-h-[44px] ${location.pathname === link.href || location.pathname.startsWith(link.href + "/") ? "text-brand-blue bg-brand-blue-light" : "text-foreground hover:bg-muted"}`}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Separator />
                <div className="px-4 py-5">
                  <Link to="/check" onClick={() => setSheetOpen(false)}><Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white gap-2 h-11">Check Message<ArrowRight className="h-4 w-4" /></Button></Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
