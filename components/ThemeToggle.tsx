'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="relative overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'dark' ? -90 : 0,
            scale: theme === 'dark' ? 0 : 1,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            rotate: theme === 'dark' ? 0 : 90,
            scale: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
