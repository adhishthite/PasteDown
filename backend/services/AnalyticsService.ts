import Analytics, { IAnalytics } from '../models/Analytics'
import logger from '../utils/logger'

export enum AnalyticsEventType {
  PASTE_CREATED = 'paste_created',
  PASTE_VIEWED = 'paste_viewed',
  PASTE_COPIED = 'paste_copied',
  PASTE_SHARED = 'paste_shared',
}

interface AnalyticsEventPayload {
  ip?: string
  pasteId?: string
  contentLength?: number
}

class AnalyticsService {
  private static instance: AnalyticsService
  private activeIPs: Set<string> = new Set()

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  private getFormattedDate(): string {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  }

  private async getOrCreateAnalytics(): Promise<IAnalytics> {
    try {
      let analytics = await Analytics.findById('stats')

      if (!analytics) {
        analytics = new Analytics({ _id: 'stats' })
        await analytics.save()
        logger.info('Created new analytics document')
      }

      return analytics
    } catch (error) {
      logger.error('Error getting analytics document', error)
      throw error
    }
  }

  public async trackEvent(
    eventType: AnalyticsEventType,
    payload?: AnalyticsEventPayload
  ): Promise<void> {
    try {
      const analytics = await this.getOrCreateAnalytics()
      const today = this.getFormattedDate()

      // Track IP for unique user count
      if (payload?.ip) {
        this.activeIPs.add(payload.ip)
        analytics.activeIPs = this.activeIPs.size
      }

      switch (eventType) {
        case AnalyticsEventType.PASTE_CREATED:
          analytics.totalPastes += 1

          // Update daily stats
          const dailyPastes = analytics.pastesByDay.get(today) || 0
          analytics.pastesByDay.set(today, dailyPastes + 1)

          // Track average paste length
          if (payload?.contentLength) {
            const currentTotal = analytics.avgPasteLength * (analytics.totalPastes - 1)
            analytics.avgPasteLength =
              (currentTotal + payload.contentLength) / analytics.totalPastes
          }

          logger.info('Tracked paste creation', {
            pasteId: payload?.pasteId,
            contentLength: payload?.contentLength,
          })
          break

        case AnalyticsEventType.PASTE_VIEWED:
          analytics.totalViews += 1

          // Update daily stats
          const dailyViews = analytics.viewsByDay.get(today) || 0
          analytics.viewsByDay.set(today, dailyViews + 1)

          logger.info('Tracked paste view', {
            pasteId: payload?.pasteId,
          })
          break

        case AnalyticsEventType.PASTE_COPIED:
          analytics.totalCopies += 1

          // Update daily stats
          const dailyCopies = analytics.copiesByDay.get(today) || 0
          analytics.copiesByDay.set(today, dailyCopies + 1)

          logger.info('Tracked paste copy', {
            pasteId: payload?.pasteId,
          })
          break

        case AnalyticsEventType.PASTE_SHARED:
          analytics.totalShares += 1

          // Update daily stats
          const dailyShares = analytics.sharesByDay.get(today) || 0
          analytics.sharesByDay.set(today, dailyShares + 1)

          logger.info('Tracked paste share', {
            pasteId: payload?.pasteId,
          })
          break
      }

      analytics.lastUpdated = new Date()
      await analytics.save()
    } catch (error) {
      logger.error('Error tracking analytics event', error)
      // Don't throw to prevent affecting the main application flow
    }
  }

  public async getAnalytics(): Promise<IAnalytics> {
    try {
      return await this.getOrCreateAnalytics()
    } catch (error) {
      logger.error('Error retrieving analytics', error)
      throw error
    }
  }
}

export default AnalyticsService.getInstance()
