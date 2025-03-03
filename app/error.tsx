'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-2xl p-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-destructive">Something went wrong</h2>
          <p className="mb-6 text-muted-foreground">
            We encountered an error while processing your request.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={reset}>
              Try again
            </Button>
            <Button asChild variant="default">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
