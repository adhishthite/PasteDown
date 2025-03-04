'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { formatDistanceToNow, format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Clock, Calendar } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EnhancedMarkdown from '@/components/EnhancedMarkdown'
import PasteActions from '@/components/PasteActions'

export default function PastePage() {
  const { id } = useParams()
  const [paste, setPaste] = useState<{
    content: string
    createdAt: string
    expiresAt: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await fetch(`/api/paste/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError('Paste not found or has expired')
          } else {
            setError('Failed to load paste')
          }
          return
        }

        const data = await response.json()
        setPaste(data)
      } catch (err) {
        console.error('Error fetching paste:', err)
        setError('Failed to load paste')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPaste()
    }
  }, [id])

  if (error) {
    return (
      <main className="flex min-h-screen flex-col">
        <Header />

        <div className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-destructive">Error</h2>
            <p className="mb-6 text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={() => (window.location.href = '/')}>
              Create New Paste
            </Button>
          </Card>
        </div>

        <Footer />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              Paste: <span className="font-mono text-primary">{id as string}</span>
            </h2>
            {paste && (
              <div className="hidden space-y-1 md:block">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDistanceToNow(new Date(paste.createdAt))} ago</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Expires {format(new Date(paste.expiresAt), 'PPP')} at{' '}
                    {format(new Date(paste.expiresAt), 'p')}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {paste && <PasteActions pasteId={id as string} content={paste.content} />}
            <Button size="sm" onClick={() => (window.location.href = '/')}>
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">New Paste</span>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="mb-4 h-8 w-3/4 rounded" />
              <Skeleton className="mb-2 h-4 w-full rounded" />
              <Skeleton className="mb-2 h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert md:prose max-w-none p-6">
              <EnhancedMarkdown content={paste?.content || ''} />
            </div>
          )}
        </Card>
      </div>

      <Footer />
    </main>
  )
}
