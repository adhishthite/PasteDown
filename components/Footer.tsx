'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
        <div className="hidden items-center md:grid md:grid-cols-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-left font-semibold text-foreground"
          >
            Pastes automatically expire after 3 days.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center text-sm font-light text-muted-foreground"
          >
            © {new Date().getFullYear()}{' '}
            <Link
              href="https://adhishthite.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Adhish Thite
            </Link>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-right text-foreground"
          >
            Made with ❤️ in India
          </motion.p>
        </div>

        {/* Mobile View - Compressed */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center text-xs md:hidden"
        >
          <span className="font-semibold text-foreground">Pastes expire in 3 days</span>
          <span className="mx-1.5">•</span>
          <span className="font-light text-muted-foreground">© {new Date().getFullYear()}</span>
          <span className="mx-1.5">•</span>
          <span className="text-foreground">Made with ❤️ in India</span>
        </motion.p>
      </div>
    </motion.footer>
  )
}
