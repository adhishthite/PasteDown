'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import { motion } from 'framer-motion'

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.4 
      }}
      className="sticky top-0 z-10 border-b border-border bg-background/95 py-3 backdrop-blur-sm"
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <motion.h1
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer text-2xl font-bold transition-colors hover:text-primary"
          onClick={handleLogoClick}
        >
          PasteDown
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">Markdown Paste Service</p>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  )
}
