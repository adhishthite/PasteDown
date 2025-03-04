import Database from '../config/database'

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error('Please define the MONGODB_DB_NAME environment variable inside .env')
}

const dbConfig = {
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DB_NAME,
  collection: process.env.MONGODB_COLLECTION || 'DEV',
}

const database = Database.getInstance()

export async function connectToDatabase() {
  if (database.getConnectionStatus()) {
    return
  }

  await database.connect(dbConfig)
}

export default connectToDatabase
