'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import remarkTextr from 'remark-textr'
import { advancedSmartypants } from '@/lib/smartypants'
import { motion } from 'framer-motion'

interface EnhancedMarkdownProps {
  content: string
  className?: string
}

/**
 * EnhancedMarkdown component that renders markdown with advanced features
 * including SmartyPants typography for smart quotes, dashes, and other typographic elements
 */
const EnhancedMarkdown: React.FC<EnhancedMarkdownProps> = ({ content, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`text-base ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[
          // @ts-expect-error - Type issues with remark plugins
          [remarkMermaidPlugin, { theme: 'default' }], // You can change the theme to 'dark', 'forest', etc.
          remarkMath, // Add math support
          // Add SmartyPants support for typographic punctuation
          [remarkTextr, { plugins: [advancedSmartypants] }],
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeStringify,
          rehypeKatex, // Add KaTeX rendering
        ]}
        components={{
          // Add animations to headings
          h1: (props) => {
            // Extract safe props that we know are compatible
            const { children, className, id, style } = props
            return (
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`mb-4 mt-6 text-2xl font-bold ${className}`}
                id={id}
                style={style}
              >
                {children}
              </motion.h1>
            )
          },
          h2: (props) => {
            // Extract safe props that we know are compatible
            const { children, className, id, style } = props
            return (
              <motion.h2
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`mb-3 mt-5 text-xl font-semibold ${className}`}
                id={id}
                style={style}
              >
                {children}
              </motion.h2>
            )
          },
          // Add animations to code blocks
          code: (props) => {
            // Extract safe props that we know are compatible
            const { children, className: propClassName, id, style } = props
            return (
              <motion.code
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`font-mono text-base ${propClassName || ''}`}
                id={id}
                style={style}
              >
                {children}
              </motion.code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  )
}

export default EnhancedMarkdown
