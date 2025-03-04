// Rate limiting types and implementation
interface RateLimitEntry {
  count: number
  resetAt: Date
}

export const ipRequests = new Map<string, RateLimitEntry>()

export function checkRateLimit(ip: string): boolean {
  const now = new Date()
  const rateLimit = ipRequests.get(ip)

  // Reset rate limit if the hour has passed
  if (rateLimit && rateLimit.resetAt < now) {
    ipRequests.delete(ip)
  }

  if (!ipRequests.has(ip)) {
    // Set reset time to 1 hour from now
    const resetAt = new Date(now.getTime() + 60 * 60 * 1000)
    ipRequests.set(ip, { count: 1, resetAt })
    return true
  }

  const currentLimit = ipRequests.get(ip)!
  if (currentLimit.count >= 5) {
    return false
  }

  currentLimit.count++
  return true
}
