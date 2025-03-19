'use client'

import type React from 'react'
import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import remarkTextr from 'remark-textr'
import { advancedSmartypants } from '@/lib/smartypants'
import remarkGfm from 'remark-gfm'

// Import the correct types
import type { Plugin } from 'unified'

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
  // Fix type incompatibility with remarkMermaidPlugin using a more specific type
  // The double cast is needed to safely convert between incompatible plugin types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mermaidPlugin = remarkMermaidPlugin as unknown as Plugin<[], any>

  return (
    <div className={`text-base ${className}`}>
      <ReactMarkdown
        remarkPlugins={[
          remarkMath,
          [remarkTextr, { plugins: [advancedSmartypants] }],
          [mermaidPlugin, {}],
          remarkGfm,
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
          // Add custom table components with border styling
          table: ({ children, className, ...props }) => (
            <div className="my-6 w-full overflow-x-auto">
              <table className={`w-full border-collapse ${className || ''}`} {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted/50" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-border" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="border-b border-border" {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2" {...props}>
              {children}
            </td>
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
