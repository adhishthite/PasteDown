'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface PasteActionsProps {
  pasteId: string
  content: string
}

export default function PasteActions({ pasteId, content }: PasteActionsProps) {
  const [isCopying, setIsCopying] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const trackEvent = async (eventType: 'copy' | 'share') => {
    try {
      await fetch(`/api/paste/${pasteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType }),
      })
    } catch (error) {
      // Silently fail tracking to not affect user experience
      console.error('Failed to track event:', error)
    }
  }

  const handleCopy = async () => {
    try {
      setIsCopying(true)
      await navigator.clipboard.writeText(content)
      toast.success('Copied to clipboard')
      // Track event after successful copy
      await trackEvent('copy')
    } catch (error) {
      console.error('Copy failed:', error)
      toast.error('Failed to copy to clipboard')
    } finally {
      setIsCopying(false)
    }
  }

  const handleShare = async () => {
    try {
      setIsSharing(true)
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      toast.success('Link copied')
      await trackEvent('share')
    } catch (error) {
      console.error('Share failed:', error)
      toast.error('Failed to copy link')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        disabled={isCopying}
        className="sm:space-x-2"
      >
        <Copy className="h-4 w-4" />
        <span className="hidden sm:inline">{isCopying ? 'Copying...' : 'Copy'}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        disabled={isSharing}
        className="sm:space-x-2"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">{isSharing ? 'Sharing...' : 'Share'}</span>
      </Button>
    </div>
  )
}
