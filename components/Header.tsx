'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = () => {
    // Only navigate to root if we're not already there
    if (pathname !== '/') {
      router.push('/')
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 py-3 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1
          className="cursor-pointer text-2xl font-bold transition-colors hover:text-primary"
          onClick={handleLogoClick}
        >
          PasteDown
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">Markdown Paste Service</p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
