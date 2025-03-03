'use client'

import { useState } from 'react'
import Editor from '@/components/Editor'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (content: string) => {
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
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col"
    >
      <Header />

      <motion.div 
        className="flex-1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Editor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>

      <Footer sticky />
    </motion.main>
  )
}
