'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Dynamically import the Editor component to reduce initial bundle size
const Editor = dynamic(() => import('@/components/Editor'), {
  loading: () => <div className="flex flex-1 items-center justify-center">Loading editor...</div>,
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
    <main className="flex min-h-screen flex-col text-base">
      <Header />

      <div className="flex-1">
        <Editor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      <Footer sticky />
    </main>
  )
}
