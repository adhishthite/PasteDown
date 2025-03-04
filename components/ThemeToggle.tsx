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
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        {...(mounted ? { title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` } : {})}
        className={`relative overflow-hidden rounded-full bg-gradient-to-br ${
          theme === 'dark' 
            ? 'from-blue-600/20 via-blue-500/15 to-blue-400/20' 
            : 'from-amber-400/20 via-yellow-300/15 to-orange-300/20'
        } backdrop-blur-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-300 border-none`}
      >
        {/* Glow effect overlay */}
        <div className={`absolute inset-0 rounded-full ${
          theme === 'dark' 
            ? 'bg-gradient-to-tr from-blue-700/10 to-blue-300/5' 
            : 'bg-gradient-to-tr from-amber-500/10 to-yellow-300/5'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
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
          <Sun className="h-[1.2rem] w-[1.2rem] text-amber-400 drop-shadow-sm" />
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
          <Moon className="h-[1.2rem] w-[1.2rem] text-blue-300 drop-shadow-sm" />
        </motion.div>

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
