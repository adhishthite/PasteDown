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
        duration: 0.4,
      }}
      className="sticky top-0 z-10 border-b border-border bg-background/95 py-4 backdrop-blur-lg"
    >
      <div className="3xl:max-w-[2200px] container mx-auto flex items-center justify-between px-4 2xl:max-w-[1800px]">
        <motion.h1
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-3xl font-black tracking-tight text-transparent transition-all hover:from-primary hover:to-primary/80"
          onClick={handleLogoClick}
        >
          <span className="mr-1 font-mono">{'{'}</span>
          PasteDown
          <span className="ml-1 font-mono">{'}'}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  )
}
