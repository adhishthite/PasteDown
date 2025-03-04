import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { checkRateLimit } from './shared'
import connectToDatabase from '@/backend/utils/dbConnect'
import PasteModel from '@/backend/models/Paste'
import analyticsService, { AnalyticsEventType } from '@/backend/services/AnalyticsService'
import logger from '@/backend/utils/logger'

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase()

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Check rate limit (5 requests per hour per IP)
    if (!checkRateLimit(ip)) {
      logger.warn('Rate limit exceeded', { ip })
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()

    // Validate content
    if (!body.content || typeof body.content !== 'string') {
      logger.warn('Invalid content submitted', { ip })
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

    // Create and save the paste to MongoDB
    const paste = new PasteModel({
      id,
      content: body.content,
      createdAt: now,
      expiresAt,
    })

    await paste.save()
    
    // Track paste creation in analytics
    await analyticsService.trackEvent(AnalyticsEventType.PASTE_CREATED, {
      ip,
      pasteId: id,
      contentLength: body.content.length,
    })

    logger.info('Paste created successfully', { id, ip })

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
    logger.error('Error creating paste', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
