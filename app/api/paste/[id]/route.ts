import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/backend/utils/dbConnect'
import PasteModel from '@/backend/models/Paste'
import analyticsService, { AnalyticsEventType } from '@/backend/services/AnalyticsService'
import logger from '@/backend/utils/logger'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Connect to database
    await connectToDatabase()

    const id = params.id
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    if (!id) {
      logger.warn('Missing paste ID in request', { ip })
      return NextResponse.json({ error: 'Missing paste ID' }, { status: 400 })
    }

    // Get the paste from MongoDB
    const paste = await PasteModel.findOne({ id })

    if (!paste) {
      logger.info('Paste not found or expired', { id, ip })
      return NextResponse.json({ error: 'Paste not found or has expired' }, { status: 404 })
    }

    // Check if paste has expired
    const now = new Date()
    if (paste.expiresAt < now) {
      logger.info('Paste has expired', { id, ip })
      // MongoDB TTL index will handle deletion
      return NextResponse.json({ error: 'Paste has expired' }, { status: 404 })
    }

    // Track paste view in analytics
    await analyticsService.trackEvent(AnalyticsEventType.PASTE_VIEWED, {
      ip,
      pasteId: id,
    })

    logger.info('Paste retrieved successfully', { id, ip })

    // Return paste data
    return NextResponse.json({
      id: paste.id,
      content: paste.content,
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
    })
  } catch (error) {
    logger.error('Error retrieving paste', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Add endpoints for tracking copy and share events
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!id) {
      logger.warn('Missing paste ID in tracking request', { ip })
      return NextResponse.json({ error: 'Missing paste ID' }, { status: 400 })
    }
    
    // Get event type from request body
    const body = await request.json()
    const { eventType } = body
    
    if (!eventType || (eventType !== 'copy' && eventType !== 'share')) {
      logger.warn('Invalid event type in tracking request', { ip, eventType })
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
    }
    
    // Track appropriate event
    if (eventType === 'copy') {
      await analyticsService.trackEvent(AnalyticsEventType.PASTE_COPIED, {
        ip,
        pasteId: id,
      })
      logger.info('Paste copy tracked', { id, ip })
    } else if (eventType === 'share') {
      await analyticsService.trackEvent(AnalyticsEventType.PASTE_SHARED, {
        ip,
        pasteId: id,
      })
      logger.info('Paste share tracked', { id, ip })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error tracking paste event', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
