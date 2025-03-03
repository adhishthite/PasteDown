'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface EditorProps {
  onSubmit: (content: string) => Promise<void>
  isSubmitting: boolean
}

export default function Editor({ onSubmit, isSubmitting }: EditorProps) {
  const [content, setContent] = useState('')
  const [activeTab, setActiveTab] = useState('edit')
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile for responsive layout
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical md breakpoint
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Please enter some markdown content before submitting')
      return
    }

    try {
      await onSubmit(content)
    } catch (error) {
      console.error('Error submitting paste:', error)
      toast.error('Failed to create paste. Please try again.')
    }
  }

  // Desktop view (side by side)
  if (!isMobile) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x">
            {/* Editor Panel */}
            <div className="flex flex-col">
              <div className="border-b border-border bg-muted/50 p-2">
                <h2 className="text-sm font-medium">Editor</h2>
              </div>
              <Textarea
                placeholder="Write your markdown here..."
                className="min-h-[60vh] flex-1 resize-none rounded-none border-0 p-4 font-mono text-base focus-visible:ring-0"
                value={content}
                onChange={handleContentChange}
              />
            </div>

            {/* Preview Panel */}
            <div className="flex flex-col">
              <div className="border-b border-border bg-muted/50 p-2">
                <h2 className="text-sm font-medium">Preview</h2>
              </div>
              <div className="prose prose-sm md:prose dark:prose-invert min-h-[60vh] max-w-none flex-1 overflow-auto rounded-none border-0 p-4">
                {content ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">Your markdown preview will appear here...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end bg-muted/30 p-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !content.trim()}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Creating...' : 'Create Paste'}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Mobile view (tabs)
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="overflow-hidden">
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="m-0">
            <Textarea
              placeholder="Write your markdown here..."
              className="min-h-[60vh] resize-none rounded-none border-0 p-4 font-mono text-base focus-visible:ring-0"
              value={content}
              onChange={handleContentChange}
            />
          </TabsContent>

          <TabsContent value="preview" className="m-0">
            <div className="prose prose-sm dark:prose-invert min-h-[60vh] max-w-none overflow-auto rounded-none border-0 p-4">
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground">Your markdown preview will appear here...</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end bg-muted/30 p-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Creating...' : 'Create Paste'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
