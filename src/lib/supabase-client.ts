export const hasSupabaseConfig = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

export const authClient = {
  mode: hasSupabaseConfig ? "supabase" : "mock",
  async signIn(email: string) {
    if (!hasSupabaseConfig) return { ok: true, mode: "mock", email }
    return { ok: false, mode: "supabase-not-configured-in-mvp" }
  },
}
