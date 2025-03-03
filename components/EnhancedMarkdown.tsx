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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Components } from 'react-markdown'
import { SyntaxTheme, getThemeByName } from '@/lib/syntax-highlighting'

interface EnhancedMarkdownProps {
  content: string
  className?: string
  syntaxTheme?: SyntaxTheme
}

/**
 * EnhancedMarkdown component that renders markdown with advanced features
 * including SmartyPants typography for smart quotes, dashes, and other typographic elements,
 * syntax highlighting for code blocks, and math rendering.
 */
const EnhancedMarkdown: React.FC<EnhancedMarkdownProps> = ({
  content,
  className = '',
  syntaxTheme = 'dracula', // Default theme
}) => {
  // Get the syntax highlighting theme
  const codeTheme = getThemeByName(syntaxTheme)

  // Define components for ReactMarkdown
  const components: Components = {
    // Add animations to headings with proper TypeScript typing
    h1: ({ children }) => (
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        initial={{ x: -15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.h2>
    ),
    // Add syntax highlighting for code blocks
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      const isInline = !match

      return !isInline ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="my-4 overflow-hidden rounded"
        >
          <SyntaxHighlighter
            style={codeTheme}
            language={language}
            PreTag="div"
            wrapLines
            showLineNumbers
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </motion.div>
      ) : (
        <code className={className}>{children}</code>
      )
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
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
        components={components}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  )
}

export default EnhancedMarkdown
