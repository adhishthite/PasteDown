'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Share2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

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
      await trackEvent('copy')
      toast({
        title: 'Copied to clipboard',
        description: 'The paste content has been copied to your clipboard.',
      })
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy to clipboard. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsCopying(false)
    }
  }

  const handleShare = async () => {
    try {
      setIsSharing(true)
      
      if (navigator.share) {
        await navigator.share({
          title: 'PasteDown Shared Content',
          text: 'Check out this paste on PasteDown',
          url: window.location.href,
        })
        await trackEvent('share')
        toast({
          title: 'Shared successfully',
          description: 'The paste link has been shared.',
        })
      } else {
        // Fallback for browsers that don't support navigator.share
        await navigator.clipboard.writeText(window.location.href)
        await trackEvent('share')
        toast({
          title: 'Link copied',
          description: 'The paste link has been copied to your clipboard. You can now share it manually.',
        })
      }
    } catch (error) {
      // Only show error toast if it's not an AbortError (user cancelled share)
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: 'Share failed',
          description: 'Failed to share the paste. Please try again.',
          variant: 'destructive',
        })
      }
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
      >
        <Copy className="h-4 w-4 mr-2" />
        {isCopying ? 'Copying...' : 'Copy'}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleShare}
        disabled={isSharing}
      >
        <Share2 className="h-4 w-4 mr-2" />
        {isSharing ? 'Sharing...' : 'Share'}
      </Button>
    </div>
  )
}