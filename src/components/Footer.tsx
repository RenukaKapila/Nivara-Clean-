import { Link } from "react-router-dom"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">Nivara</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Nivara helps people recognize scams through private message checks, short lessons, and realistic practice.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Educational warning-sign guidance only. Nivara cannot guarantee scam detection.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">MVP Tools</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/check">Check</Link></li>
              <li><Link to="/learning">Learn</Link></li>
              <li><Link to="/scam-lab">Practice</Link></li>
              <li><Link to="/progress">Progress</Link></li>
              <li><Link to="/report">Help & Recovery</Link></li>
              <li><Link to="/library">Scam Library</Link></li>
              <li><Link to="/privacy">Privacy & Safety</Link></li>
              <li><Link to="/before-you-pay">Before You Pay</Link></li>
              <li><Link to="/safe-share">Safe Share</Link></li>
              <li><Link to="/family-practice">Family Practice</Link></li>
              <li><Link to="/support">Support Nivara</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Official Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer">FTC ReportFraud.gov</a></li>
              <li><a href="https://identitytheft.gov" target="_blank" rel="noopener noreferrer">IdentityTheft.gov</a></li>
              <li><a href="https://ic3.gov" target="_blank" rel="noopener noreferrer">FBI IC3</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
