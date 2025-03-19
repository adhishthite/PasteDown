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

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="-ml-1 mr-2 h-4 w-4 animate-spin text-background"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
    >
      <title>Loading</title>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  // Desktop view (side by side)
  if (!isMobile) {
    return (
      <div className="h-full w-full">
        <div className="3xl:max-w-[2200px] container mx-auto h-full w-full px-4 2xl:max-w-[1800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
            className="h-full w-full py-4"
          >
            <Card className="flex h-full w-full flex-col overflow-hidden border shadow-md">
              <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                <h2 className="text-xl font-medium">PasteDown Editor</h2>
                <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      Creating...
                    </>
                  ) : (
                    'Create Paste'
                  )}
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
                      className="scrollbar-custom absolute inset-0 h-full w-full resize-none overflow-auto p-4 font-mono text-base focus-visible:ring-0"
                      value={content}
                      onChange={handleContentChange}
                      disabled={isSubmitting}
                    />
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
                          <LoadingSpinner />
                          Creating paste...
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="border-b border-border bg-muted/50 px-4 py-2">
                    <h3 className="text-base font-medium">Preview</h3>
                  </div>
                  <div
                    ref={previewRef}
                    className="scrollbar-custom prose prose-lg flex-1 overflow-auto p-6 dark:prose-invert"
                  >
                    {content ? (
                      <EnhancedMarkdown content={content} />
                    ) : (
                      <p className="italic text-muted-foreground">
                        Your markdown preview will appear here...
                      </p>
                    )}
                  </div>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <div className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
                        <LoadingSpinner />
                        Creating paste...
                      </div>
                    </div>
                  )}
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
    <div className="h-full w-full">
      <div className="3xl:max-w-[2200px] container mx-auto h-full w-full px-4 2xl:max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full py-4"
        >
          <Card className="flex h-full w-full flex-col overflow-hidden border shadow-md">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
              <h2 className="text-xl font-medium">PasteDown Editor</h2>
              <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()} size="sm">
                {isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </div>

            <Tabs
              defaultValue="edit"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-1 flex-col"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger value="edit" disabled={isSubmitting}>
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={isSubmitting}>
                  Preview
                </TabsTrigger>
              </TabsList>

              {activeTab === 'edit' && (
                <div className="relative m-0 flex-1 overflow-hidden border-0 p-0">
                  <Textarea
                    placeholder="Write your markdown here..."
                    className="scrollbar-custom absolute inset-0 h-full w-full resize-none overflow-auto p-4 font-mono text-base focus-visible:ring-0"
                    value={content}
                    onChange={handleContentChange}
                    disabled={isSubmitting}
                  />
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <div className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
                        <LoadingSpinner />
                        Creating paste...
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="relative m-0 flex-1 overflow-hidden border-0 p-0">
                  <div className="scrollbar-custom prose prose-lg absolute inset-0 max-w-none overflow-auto p-6 dark:prose-invert">
                    {content ? (
                      <EnhancedMarkdown content={content} />
                    ) : (
                      <p className="italic text-muted-foreground">
                        Your markdown preview will appear here...
                      </p>
                    )}
                  </div>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <div className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
                        <LoadingSpinner />
                        Creating paste...
                      </div>
                    </div>
                  )}
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
