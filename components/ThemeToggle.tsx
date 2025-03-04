'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only run animations after component is mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        {...(mounted ? { title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` } : {})}
        className="relative overflow-hidden border border-primary/30 bg-background/80 backdrop-blur-sm group hover:border-primary/50 hover:shadow-sm hover:shadow-primary/20"
      >
        <motion.div
          initial={false}
          animate={
            mounted
              ? {
                  rotate: theme === 'dark' ? -90 : 0,
                  scale: theme === 'dark' ? 0 : 1,
                }
              : {}
          }
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={
            mounted
              ? {
                  rotate: theme === 'dark' ? 0 : 90,
                  scale: theme === 'dark' ? 1 : 0,
                }
              : {}
          }
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
        </motion.div>

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
