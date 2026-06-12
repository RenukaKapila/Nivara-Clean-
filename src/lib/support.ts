export function normalizeSupportUrl(value: string | undefined) {
  const trimmed = value?.trim()
  if (!trimmed) return ""

  try {
    const url = new URL(trimmed)
    if (url.protocol !== "https:" && url.protocol !== "http:") return ""
    return url.toString()
  } catch {
    return ""
  }
}

export const supportUrl = normalizeSupportUrl(import.meta.env.VITE_SUPPORT_URL)
