'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import EnhancedMarkdown from './EnhancedMarkdown'
import { motion } from 'framer-motion'

interface EditorProps {
  onSubmit: (content: string) => Promise<void>
  isSubmitting: boolean
}

function EditorComponent({ onSubmit, isSubmitting }: EditorProps) {
  const [content, setContent] = useState('')
  const [activeTab, setActiveTab] = useState('edit')
  const isMobile = useIsMobile()
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Handle content change with useCallback
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }, [])

  // Handle submit with useCallback
  const handleSubmit = useCallback(async () => {
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
  }, [content, onSubmit])

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
  }, [isMobile])

  // Desktop view (side by side)
  if (!isMobile) {
    return (
      <div className="h-full py-4">
        <div className="3xl:max-w-[2200px] container mx-auto h-full px-4 2xl:max-w-[1800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
          >
            <Card className="flex h-[calc(100vh-160px)] flex-col overflow-hidden border shadow-md">
              <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                <h2 className="text-xl font-medium">PasteDown Editor</h2>
                <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()}>
                  {isSubmitting ? 'Creating...' : 'Create Paste'}
                </Button>
              </div>

              <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-2 md:divide-x">
                {/* Editor Panel */}
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="border-b border-border bg-muted/50 px-4 py-2">
                    <h3 className="text-base font-medium">Editor</h3>
                  </div>
                  <div className="relative flex-1 overflow-hidden">
                    <Textarea
                      ref={editorRef}
                      placeholder="Write your markdown here..."
                      className="scrollbar-custom absolute inset-0 h-full w-full resize-none p-4 font-mono text-base focus-visible:ring-0"
                      value={content}
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="border-b border-border bg-muted/50 px-4 py-2">
                    <h3 className="text-base font-medium">Preview</h3>
                  </div>
                  <div
                    ref={previewRef}
                    className="prose prose-lg dark:prose-invert scrollbar-custom max-w-none flex-1 overflow-auto p-6"
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
          </motion.div>
        </div>
      </div>
    )
  }

  // Mobile view (tabs)
  return (
    <div className="h-full py-4">
      <div className="3xl:max-w-[2200px] container mx-auto h-full px-4 2xl:max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="flex h-[calc(100vh-160px)] flex-col overflow-hidden border shadow-md">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
              <h2 className="text-xl font-medium">PasteDown Editor</h2>
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

              {activeTab === 'edit' && (
                <div className="relative m-0 flex-1 overflow-hidden border-0 p-0">
                  <Textarea
                    placeholder="Write your markdown here..."
                    className="scrollbar-custom absolute inset-0 h-full w-full resize-none p-4 font-mono text-base focus-visible:ring-0"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="relative m-0 flex-1 overflow-hidden border-0 p-0">
                  <div className="prose prose-lg dark:prose-invert scrollbar-custom absolute inset-0 max-w-none overflow-auto p-6">
                    {content ? (
                      <EnhancedMarkdown content={content} />
                    ) : (
                      <p className="italic text-muted-foreground">
                        Your markdown preview will appear here...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Wrap component with memo for performance
const Editor = memo(EditorComponent)
export default Editor
