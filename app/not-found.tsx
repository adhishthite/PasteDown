import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background/50 py-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">PasteDown</h1>
          <p className="text-sm text-muted-foreground">Markdown Paste Service</p>
        </div>
      </header>

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

      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>Pastes automatically expire after 3 days.</p>
        </div>
      </footer>
    </main>
  )
}
