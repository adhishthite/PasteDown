'use client'

import { useState } from 'react'
import Editor from '@/components/Editor'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (content: string) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/paste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error('Failed to create paste')
      }

      const { id } = await response.json()

      toast.success('Paste created successfully!')
      router.push(`/${id}`)
    } catch (error) {
      console.error('Error creating paste:', error)
      toast.error('Failed to create paste. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background/50 py-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">PasteDown</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Markdown Paste Service</p>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1">
        <Editor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>Pastes automatically expire after 3 days.</p>
        </div>
      </footer>
    </main>
  )
}
