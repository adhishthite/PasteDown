import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/backend/utils/dbConnect'
import analyticsService from '@/backend/services/AnalyticsService'
import logger from '@/backend/utils/logger'

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase()

    // Get API key from request header for authentication
    const apiKey = request.headers.get('x-api-key')

    // Check if API key is valid
    if (!apiKey || apiKey !== process.env.ANALYTICS_API_KEY) {
      logger.warn('Unauthorized analytics access attempt', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
      })
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get analytics data
    const analytics = await analyticsService.getAnalytics()

    logger.info('Analytics retrieved successfully')

    // Return analytics data
    return NextResponse.json({
      totalPastes: analytics.totalPastes,
      totalViews: analytics.totalViews,
      totalCopies: analytics.totalCopies,
      totalShares: analytics.totalShares,
      pastesByDay: Object.fromEntries(analytics.pastesByDay),
      viewsByDay: Object.fromEntries(analytics.viewsByDay),
      copiesByDay: Object.fromEntries(analytics.copiesByDay),
      sharesByDay: Object.fromEntries(analytics.sharesByDay),
      activeIPs: analytics.activeIPs,
      avgPasteLength: analytics.avgPasteLength,
      lastUpdated: analytics.lastUpdated,
    })
  } catch (error) {
    logger.error('Error retrieving analytics', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
