// Shared types and data for paste API routes
export interface Paste {
  id: string
  content: string
  createdAt: Date
  expiresAt: Date
}

// In-memory store for pastes (would be replaced with a real database)
export const pastes = new Map<string, Paste>()

// Rate limiting implementation
export const ipRequests = new Map<string, { count: number; resetAt: Date }>()

// Simulate TTL by cleaning up expired pastes
export function cleanupExpiredPastes() {
  const now = new Date()
  Array.from(pastes.entries()).forEach(([id, paste]) => {
    if (paste.expiresAt < now) {
      pastes.delete(id)
    }
  })
}

// Check rate limit
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
