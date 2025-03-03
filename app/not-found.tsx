import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-2xl p-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-destructive">Paste Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The paste you&apos;re looking for doesn&apos;t exist or has expired.
            <br />
            Pastes automatically expire after 3 days.
          </p>
          <Button asChild variant="default">
            <Link href="/">Create New Paste</Link>
          </Button>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
