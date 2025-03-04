'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Dynamically import the Editor component to reduce initial bundle size
const Editor = dynamic(() => import('@/components/Editor'), {
  loading: () => (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="relative h-12 w-12"
        >
          <div className="absolute h-full w-full rounded-full border-4 border-muted" />
          <div className="absolute h-full w-full rounded-full border-4 border-primary border-t-transparent" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          Loading editor...
        </motion.p>
      </motion.div>
    </div>
  ),
  ssr: false, // Disable server-side rendering for the Editor
})

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Memoize the submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback(
    async (content: string) => {
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
    },
    [router]
  )

  return (
    <main className="flex h-screen flex-col text-base">
      <Header />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0">
          <Editor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>

      <Footer sticky />
    </main>
  )
}
