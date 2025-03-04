'use client'

import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import remarkTextr from 'remark-textr'
import { advancedSmartypants } from '@/lib/smartypants'

interface EnhancedMarkdownProps {
  content: string
  className?: string
}

/**
 * EnhancedMarkdown component that renders markdown with advanced features
 * including SmartyPants typography for smart quotes, dashes, and other typographic elements
 */
const EnhancedMarkdownComponent: React.FC<EnhancedMarkdownProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={`text-base ${className}`}>
      <ReactMarkdown
        remarkPlugins={[
          [remarkMermaidPlugin, {}],
          remarkMath,
          [remarkTextr, { plugins: [advancedSmartypants] }],
        ]}
        rehypePlugins={[rehypeRaw, rehypeStringify, rehypeKatex]}
        components={{
          h1: ({ children, className, ...props }) => (
            <h1 className={`mb-4 mt-6 text-2xl font-bold ${className || ''}`} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, className, ...props }) => (
            <h2 className={`mb-3 mt-5 text-xl font-semibold ${className || ''}`} {...props}>
              {children}
            </h2>
          ),
          code: ({ children, className, ...props }) => (
            <code className={`font-mono text-base ${className || ''}`} {...props}>
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
const EnhancedMarkdown = memo(EnhancedMarkdownComponent)

export default EnhancedMarkdown
