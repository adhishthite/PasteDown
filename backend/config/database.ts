import mongoose from 'mongoose'

interface DatabaseConfig {
  uri: string
  dbName: string
  collection: string
}

class Database {
  private static instance: Database
  private isConnected = false

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async connect(config: DatabaseConfig): Promise<void> {
    if (this.isConnected) {
      console.log('Using existing database connection')
      return
    }

    try {
      const options = {
        dbName: config.dbName,
      }

      await mongoose.connect(config.uri, options)

      this.isConnected = true
      console.log('Database connection successful')
    } catch (error) {
      console.error('Database connection failed:', error)
      throw error
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return
    }

    try {
      await mongoose.disconnect()
      this.isConnected = false
      console.log('Database disconnected successfully')
    } catch (error) {
      console.error('Database disconnection failed:', error)
      throw error
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected
  }
}

export default Database
