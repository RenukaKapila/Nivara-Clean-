export type LessonDifficulty = "Beginner" | "Intermediate" | "Advanced"
export type LessonAccess = "free" | "plus" | "family"
export type LearningMode = "simple" | "technical"

export interface LessonChoice {
  id: string
  text: string
  correct: boolean
  feedback: string
}

export interface LessonPractice {
  prompt: string
  choices: LessonChoice[]
}

export interface GoodBadComparisonItem {
  label: string
  text: string
  why: string
}

export interface MessageMockupLine {
  text: string
  tone?: "normal" | "warning" | "safe" | "info"
}

export interface Lesson {
  id: string
  title: string
  category: string
  difficulty: LessonDifficulty
  access?: LessonAccess
  icon: string
  overview: string
  simpleExplanation: string
  technicalExplanation?: string
  sensoryIdea?: string
  examples: string[]
  whatYouWillLearn: string[]
  whatItLooksLike: string[]
  redFlags: string[]
  howToVerify: string[]
  whatNotToDo: string[]
  whatToDoNext: string[]
  quickChecklist: string[]
  practice: LessonPractice
  practiceScenarioId?: string
  practiceLabel?: string
  readTime: string
}
