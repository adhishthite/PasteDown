import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { Paste, pastes, cleanupExpiredPastes, checkRateLimit } from './shared'

export async function POST(request: NextRequest) {
  try {
    // Clean up expired pastes
    cleanupExpiredPastes()

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Check rate limit (5 requests per hour per IP)
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()

    // Validate content
    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid content. Content must be a non-empty string.' },
        { status: 400 }
      )
    }

    // Generate a unique ID using nanoid
    const id = nanoid(8) // 8-character ID

    // Calculate expiration date (3 days from now)
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

    // Create the paste object
    const paste: Paste = {
      id,
      content: body.content,
      createdAt: now,
      expiresAt,
    }

    // Save paste to our "database"
    pastes.set(id, paste)

    // Return the paste ID and URL
    return NextResponse.json(
      {
        id,
        url: `/${id}`,
        expiresAt,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating paste:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
