'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import EnhancedMarkdown from './EnhancedMarkdown'

interface EditorProps {
  onSubmit: (content: string) => Promise<void>
  isSubmitting: boolean
}

export default function Editor({ onSubmit, isSubmitting }: EditorProps) {
  const [content, setContent] = useState('')
  const [activeTab, setActiveTab] = useState('edit')
  const isMobile = useIsMobile()
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  // Handle submit
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

  // Sync scrolling between editor and preview
  useEffect(() => {
    if (isMobile || !editorRef.current || !previewRef.current) return

    const editorElement = editorRef.current
    const previewElement = previewRef.current

    const handleEditorScroll = () => {
      const editorScrollPercentage =
        editorElement.scrollTop / (editorElement.scrollHeight - editorElement.clientHeight)

      previewElement.scrollTop =
        editorScrollPercentage * (previewElement.scrollHeight - previewElement.clientHeight)
    }

    editorElement.addEventListener('scroll', handleEditorScroll)
    return () => {
      editorElement.removeEventListener('scroll', handleEditorScroll)
    }
  }, [isMobile, content])

  // Desktop view (side by side)
  if (!isMobile) {
    return (
      <div className="flex h-full flex-col">
        <div className="container mx-auto flex h-full flex-col px-4 py-4">
          <Card className="flex flex-1 flex-col overflow-hidden border shadow-md">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
              <h2 className="text-lg font-medium">PasteDown Editor</h2>
              <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()}>
                {isSubmitting ? 'Creating...' : 'Create Paste'}
              </Button>
            </div>

            <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-2 md:divide-x">
              {/* Editor Panel */}
              <div className="flex h-full flex-col overflow-hidden">
                <div className="border-b border-border bg-muted/50 px-4 py-2">
                  <h3 className="text-sm font-medium">Editor</h3>
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <Textarea
                    ref={editorRef}
                    placeholder="Write your markdown here..."
                    className="scrollbar-custom absolute inset-0 h-full w-full resize-none p-4 font-mono text-sm focus-visible:ring-0"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>

              {/* Preview Panel */}
              <div className="flex h-full flex-col overflow-hidden">
                <div className="border-b border-border bg-muted/50 px-4 py-2">
                  <h3 className="text-sm font-medium">Preview</h3>
                </div>
                <div
                  ref={previewRef}
                  className="prose prose-sm dark:prose-invert scrollbar-custom max-w-none flex-1 overflow-auto p-6"
                >
                  {content ? (
                    <EnhancedMarkdown content={content} />
                  ) : (
                    <p className="italic text-muted-foreground">
                      Your markdown preview will appear here...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Mobile view (tabs)
  return (
    <div className="flex h-full flex-col">
      <div className="container mx-auto flex h-full flex-col px-4 py-4">
        <Card className="flex flex-1 flex-col overflow-hidden border shadow-md">
          <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
            <h2 className="text-lg font-medium">PasteDown Editor</h2>
            <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()} size="sm">
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>

          <Tabs
            defaultValue="edit"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-1 flex-col"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="relative m-0 flex-1 overflow-hidden border-0 p-0">
              <Textarea
                placeholder="Write your markdown here..."
                className="scrollbar-custom absolute inset-0 h-full w-full resize-none p-4 font-mono text-sm focus-visible:ring-0"
                value={content}
                onChange={handleContentChange}
              />
            </TabsContent>

            <TabsContent
              value="preview"
              className="relative m-0 flex-1 overflow-hidden border-0 p-0"
            >
              <div className="prose prose-sm dark:prose-invert scrollbar-custom absolute inset-0 max-w-none overflow-auto p-6">
                {content ? (
                  <EnhancedMarkdown content={content} />
                ) : (
                  <p className="italic text-muted-foreground">
                    Your markdown preview will appear here...
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
