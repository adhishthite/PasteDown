'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Share2, Copy } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EnhancedMarkdown from '@/components/EnhancedMarkdown'

export default function PastePage() {
  const { id } = useParams()
  const [paste, setPaste] = useState<{ content: string } | null>(null)
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    } catch (error) {
      console.error('Error copying link:', error)
      toast.error('Failed to copy link')
    }
  }

  const copyContent = async () => {
    if (!paste) return

    try {
      await navigator.clipboard.writeText(paste.content)
      toast.success('Content copied to clipboard')
    } catch (error) {
      console.error('Error copying content:', error)
      toast.error('Failed to copy content')
    }
  }

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
          <h2 className="text-xl font-semibold">
            Paste: <span className="font-mono text-primary">{id}</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={copyContent}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Content
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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Button variant="link" size="sm" onClick={() => (window.location.href = '/')}>
            Create New Paste
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
