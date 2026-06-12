import {
  FileText,
  ImageIcon,
  Mail,
  MessageSquare,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type {
  PracticeScenario,
  PracticeScenarioFormat,
} from "@/lib/practice-scenarios"

const formatIcons: Record<PracticeScenarioFormat, LucideIcon> = {
  sms: MessageSquare,
  email: Mail,
  social: MessageSquare,
  invoice: FileText,
  notice: FileText,
  image: ImageIcon,
  pdf: FileText,
}

const formatLabels: Record<PracticeScenarioFormat, string> = {
  sms: "Text Message",
  email: "Email",
  social: "Social Message",
  invoice: "Invoice Preview",
  notice: "Notice",
  image: "Image-Style Example",
  pdf: "PDF Preview",
}

export function ScenarioCard({ scenario }: { scenario: PracticeScenario }) {
  const Icon = formatIcons[scenario.format] || MessageSquare

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-light text-brand-blue">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-bold text-foreground">
              {formatLabels[scenario.format]}
            </p>
            <p className="text-xs text-muted-foreground">
              Review the situation carefully
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-xs">
          {scenario.difficulty}
        </Badge>
      </div>

      <div className="p-4">
        {scenario.content.sender && (
          <p className="text-xs text-muted-foreground mb-1">
            From:{" "}
            <span className="font-semibold text-foreground">
              {scenario.content.sender}
            </span>
          </p>
        )}

        {scenario.content.subject && (
          <p className="text-sm font-bold text-foreground mb-3">
            {scenario.content.subject}
          </p>
        )}

        <div
          className={`rounded-2xl border p-4 ${
            scenario.format === "sms" || scenario.format === "social"
              ? "border-blue-200 bg-blue-50/60"
              : scenario.format === "pdf" || scenario.format === "invoice"
                ? "border-amber-200 bg-amber-50/60"
                : scenario.format === "image"
                  ? "border-purple-200 bg-purple-50/60"
                  : "border-border bg-muted/20"
          }`}
        >
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {scenario.content.body}
          </p>
        </div>

        {scenario.content.attachmentName && (
          <div className="mt-3 rounded-xl border border-border bg-muted/20 p-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">
              {scenario.content.attachmentName}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
