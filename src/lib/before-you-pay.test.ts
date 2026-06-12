import { describe, expect, it } from "vitest"
import { scoreBeforeYouPay, type PaymentCheckAnswers } from "./before-you-pay"

const safeBase: PaymentCheckAnswers = {
  unexpectedContact: false,
  rushed: false,
  secrecy: false,
  irreversiblePayment: false,
  verifiedIndependently: true,
  personalInfo: false,
  tooGood: false,
}

describe("scoreBeforeYouPay", () => {
  it("returns lower risk language when the user verified independently", () => {
    const result = scoreBeforeYouPay(safeBase)

    expect(result.level).toBe("lower")
    expect(result.title).toMatch(/lower risk/i)
  })

  it("escalates hard-to-reverse payments with pressure", () => {
    const result = scoreBeforeYouPay({
      ...safeBase,
      unexpectedContact: true,
      rushed: true,
      irreversiblePayment: true,
      verifiedIndependently: false,
    })

    expect(result.level).toBe("high")
    expect(result.nextSteps.join(" ")).toMatch(/do not send money/i)
  })
})
