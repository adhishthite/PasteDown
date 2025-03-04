import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/backend/utils/dbConnect'
import PasteModel from '@/backend/models/Paste'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Connect to database
    await connectToDatabase()

    const id = params.id

    if (!id) {
      return NextResponse.json({ error: 'Missing paste ID' }, { status: 400 })
    }

    // Get the paste from MongoDB
    const paste = await PasteModel.findOne({ id })

    if (!paste) {
      return NextResponse.json({ error: 'Paste not found or has expired' }, { status: 404 })
    }

    // Check if paste has expired
    const now = new Date()
    if (paste.expiresAt < now) {
      // MongoDB TTL index will handle deletion
      return NextResponse.json({ error: 'Paste has expired' }, { status: 404 })
    }

    // Return paste data
    return NextResponse.json({
      id: paste.id,
      content: paste.content,
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
    })
  } catch (error) {
    console.error('Error retrieving paste:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
