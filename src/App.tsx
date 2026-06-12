import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Home } from "@/pages/Home"
import { TermsAgreement } from "@/components/TermsAgreement"

const ScamCheck = lazy(() => import("@/pages/ScamCheck").then((module) => ({ default: module.ScamCheck })))
const Results = lazy(() => import("@/pages/Results").then((module) => ({ default: module.Results })))
const ScamLab = lazy(() => import("@/pages/ScamLab").then((module) => ({ default: module.ScamLab })))
const LearningCenter = lazy(() => import("@/pages/LearningCenter").then((module) => ({ default: module.LearningCenter })))
const LessonDetail = lazy(() => import("@/pages/LessonDetail").then((module) => ({ default: module.LessonDetail })))
const Progress = lazy(() => import("@/pages/Progress").then((module) => ({ default: module.Progress })))
const ReportRecover = lazy(() => import("@/pages/ReportRecover").then((module) => ({ default: module.ReportRecover })))
const PrivacySafety = lazy(() => import("@/pages/PrivacySafety").then((module) => ({ default: module.PrivacySafety })))
const BeforeYouPay = lazy(() => import("@/pages/BeforeYouPay").then((module) => ({ default: module.BeforeYouPay })))
const SafeShare = lazy(() => import("@/pages/SafeShare").then((module) => ({ default: module.SafeShare })))
const ScamLibrary = lazy(() => import("@/pages/ScamLibrary").then((module) => ({ default: module.ScamLibrary })))
const FamilyPractice = lazy(() => import("@/pages/FamilyPractice").then((module) => ({ default: module.FamilyPractice })))
const SupportNivara = lazy(() => import("@/pages/SupportNivara").then((module) => ({ default: module.SupportNivara })))
const Disclaimer = lazy(() => import("@/pages/Disclaimer").then((module) => ({ default: module.Disclaimer })))
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy").then((module) => ({ default: module.PrivacyPolicy })))
const Terms = lazy(() => import("@/pages/Terms").then((module) => ({ default: module.Terms })))

const routerBasename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "")

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      Loading Nivara...
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <div className="flex min-h-svh flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/check" element={<TermsAgreement><ScamCheck /></TermsAgreement>} />
              <Route path="/results" element={<Results />} />
              <Route path="/scam-lab" element={<ScamLab />} />
              <Route path="/learning" element={<LearningCenter />} />
              <Route path="/learning/:id" element={<LessonDetail />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/report" element={<ReportRecover />} />
              <Route path="/help" element={<ReportRecover />} />
              <Route path="/privacy" element={<PrivacySafety />} />
              <Route path="/library" element={<ScamLibrary />} />
              <Route path="/before-you-pay" element={<TermsAgreement><BeforeYouPay /></TermsAgreement>} />
              <Route path="/safe-share" element={<TermsAgreement><SafeShare /></TermsAgreement>} />
              <Route path="/family-practice" element={<FamilyPractice />} />
              <Route path="/support" element={<SupportNivara />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/pricing" element={<Home />} />
              <Route path="/early-access" element={<Home />} />
              <Route path="/login" element={<Home />} />
              <Route path="/signup" element={<Home />} />
              <Route path="/account" element={<Progress />} />
              <Route path="/checkout-success" element={<Home />} />
              <Route path="/checkout-cancel" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
