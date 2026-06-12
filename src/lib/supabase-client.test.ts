import { describe, expect, it } from "vitest"
import { authClient, hasSupabaseConfig } from "./supabase-client"

describe("supabase-client", () => {
  it("stays in mock mode when launch MVP config is absent", async () => {
    expect(hasSupabaseConfig).toBe(false)

    const result = await authClient.signIn("person@example.com")

    expect(result).toEqual({ ok: true, mode: "mock", email: "person@example.com" })
  })
})
