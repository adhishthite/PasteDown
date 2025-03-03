import { NextRequest, NextResponse } from 'next/server'

// Import the pastes map from the parent route
// In a real implementation, this would be a database query
import { pastes } from '../shared'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: 'Missing paste ID' }, { status: 400 })
    }

    // Get the paste from our "database"
    const paste = pastes.get(id)

    if (!paste) {
      return NextResponse.json({ error: 'Paste not found or has expired' }, { status: 404 })
    }

    // Check if paste has expired
    const now = new Date()
    if (paste.expiresAt < now) {
      // Delete expired paste
      pastes.delete(id)
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
