import { cn } from '@/lib/utils'

interface FooterProps {
  sticky?: boolean
}

export default function Footer({ sticky = false }: FooterProps) {
  return (
    <footer
      className={cn(
        'border-t border-border py-4 text-center text-sm text-muted-foreground',
        sticky && 'sticky bottom-0 bg-background/95 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <p>Pastes automatically expire after 3 days.</p>
      </div>
    </footer>
  )
}
