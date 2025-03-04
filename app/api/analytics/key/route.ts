import { NextResponse } from 'next/server'
import logger from '@/backend/utils/logger'

export async function GET() {
  try {
    // Get the ANALYTICS_API_KEY from environment variables
    const apiKey = process.env.ANALYTICS_API_KEY

    // Only return the key if it exists in the environment
    if (apiKey) {
      logger.info('API key requested for analytics dashboard')
      return NextResponse.json({ key: apiKey })
    } else {
      logger.warn('API key requested but not configured in environment')
      return NextResponse.json({ error: 'API key not configured' }, { status: 404 })
    }
  } catch (error) {
    logger.error('Error providing API key', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
