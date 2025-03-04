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
        ease: 'easeOut',
      }}
      className={cn(
        'border-t border-border py-4 text-center text-base text-muted-foreground',
        sticky && 'sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm'
      )}
    >
      <div className="3xl:max-w-[2200px] container mx-auto px-4 2xl:max-w-[1800px]">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-3 items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-foreground text-left font-semibold"
          >
            Pastes automatically expire after 3 days.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-muted-foreground text-sm font-light text-center"
          >
            © {new Date().getFullYear()} Adhish Thite
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-foreground text-right"
          >
            Made with ❤️ in India
          </motion.p>
        </div>
        
        {/* Mobile View - Compressed */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="md:hidden text-xs text-center"
        >
          <span className="text-foreground font-semibold">Pastes expire in 3 days</span>
          <span className="mx-1.5">•</span>
          <span className="text-muted-foreground font-light">© {new Date().getFullYear()}</span>
          <span className="mx-1.5">•</span>
          <span className="text-foreground">Made with ❤️ in India</span>
        </motion.p>
      </div>
    </motion.footer>
  )
}
