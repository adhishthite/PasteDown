type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

class Logger {
  private static instance: Logger
  private debugMode: boolean

  private constructor() {
    this.debugMode = process.env.NODE_ENV !== 'production'
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    let formattedMessage = `[${timestamp}] [${level}] ${message}`
    
    if (data) {
      try {
        formattedMessage += '\n' + JSON.stringify(data, null, 2)
      } catch (error) {
        formattedMessage += '\n[Object could not be stringified]'
      }
    }
    
    return formattedMessage
  }

  public info(message: string, data?: any): void {
    console.log(this.formatMessage('INFO', message, data))
  }

  public warn(message: string, data?: any): void {
    console.warn(this.formatMessage('WARN', message, data))
  }

  public error(message: string, error?: any): void {
    if (error instanceof Error) {
      console.error(this.formatMessage('ERROR', message, {
        message: error.message,
        stack: error.stack,
        ...(error as any),
      }))
    } else {
      console.error(this.formatMessage('ERROR', message, error))
    }
  }

  public debug(message: string, data?: any): void {
    if (this.debugMode) {
      console.debug(this.formatMessage('DEBUG', message, data))
    }
  }

  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled
  }
}

export default Logger.getInstance()