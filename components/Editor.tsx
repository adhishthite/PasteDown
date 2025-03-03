'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import EnhancedMarkdown from './EnhancedMarkdown'
import { motion, AnimatePresence } from 'framer-motion'

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
      <div className="h-full py-4">
        <div className="3xl:max-w-[2200px] container mx-auto h-full px-4 2xl:max-w-[1800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <Card className="flex h-[calc(100vh-160px)] flex-col overflow-hidden border shadow-md">
              <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-xl font-medium"
                >
                  PasteDown Editor
                </motion.h2>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()}>
                    {isSubmitting ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Creating...
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Create Paste
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </div>

              <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-2 md:divide-x">
                {/* Editor Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex h-full flex-col overflow-hidden"
                >
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
                </motion.div>

                {/* Preview Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex h-full flex-col overflow-hidden"
                >
                  <div className="border-b border-border bg-muted/50 px-4 py-2">
                    <h3 className="text-base font-medium">Preview</h3>
                  </div>
                  <div
                    ref={previewRef}
                    className="prose prose-lg dark:prose-invert scrollbar-custom max-w-none flex-1 overflow-auto p-6"
                  >
                    <AnimatePresence mode="wait">
                      {content ? (
                        <EnhancedMarkdown content={content} />
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="italic text-muted-foreground"
                        >
                          Your markdown preview will appear here...
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
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
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
          <Card className="flex h-[calc(100vh-160px)] flex-col overflow-hidden border shadow-md">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-xl font-medium"
              >
                PasteDown Editor
              </motion.h2>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()} size="sm">
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="creating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Creating...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="create"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Create
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            <Tabs
              defaultValue="edit"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-1 flex-col"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger value="edit">
                  <motion.span
                    animate={{
                      color: activeTab === 'edit' ? 'var(--foreground)' : 'var(--muted-foreground)',
                    }}
                  >
                    Edit
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <motion.span
                    animate={{
                      color:
                        activeTab === 'preview' ? 'var(--foreground)' : 'var(--muted-foreground)',
                    }}
                  >
                    Preview
                  </motion.span>
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {activeTab === 'edit' && (
                  <motion.div
                    key="edit-tab"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative m-0 flex-1 overflow-hidden border-0 p-0"
                  >
                    <Textarea
                      placeholder="Write your markdown here..."
                      className="scrollbar-custom absolute inset-0 h-full w-full resize-none p-4 font-mono text-base focus-visible:ring-0"
                      value={content}
                      onChange={handleContentChange}
                    />
                  </motion.div>
                )}

                {activeTab === 'preview' && (
                  <motion.div
                    key="preview-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="relative m-0 flex-1 overflow-hidden border-0 p-0"
                  >
                    <div className="prose prose-lg dark:prose-invert scrollbar-custom absolute inset-0 max-w-none overflow-auto p-6">
                      <AnimatePresence mode="wait">
                        {content ? (
                          <EnhancedMarkdown content={content} />
                        ) : (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="italic text-muted-foreground"
                          >
                            Your markdown preview will appear here...
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
