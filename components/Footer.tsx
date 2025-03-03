'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface FooterProps {
  sticky?: boolean
}

export default function Footer({ sticky = false }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: 0.3,
        ease: "easeOut"
      }}
      className={cn(
        'border-t border-border py-4 text-center text-sm text-muted-foreground',
        sticky && 'sticky bottom-0 bg-background/95 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <strong>Pastes automatically expire after 3 days. </strong>
          <span className="hidden md:inline">Made with ❤️ by Adhish Thite in India.</span>
        </motion.p>
      </div>
    </motion.footer>
  )
}
