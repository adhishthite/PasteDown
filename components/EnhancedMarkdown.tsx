import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import remarkSmartypants from 'remark-smartypants'

interface EnhancedMarkdownProps {
  content: string
  className?: string
}

const EnhancedMarkdown: React.FC<EnhancedMarkdownProps> = ({ content, className = '' }) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[
          // @ts-expect-error - Type issues with remark plugins
          [remarkMermaidPlugin, { theme: 'default' }], // You can change the theme to 'dark', 'forest', etc.
          remarkMath, // Add math support
          // Add SmartyPants support for typographic punctuation
          [
            remarkSmartypants,
            {
              quotes: true, // Enable smart quotes: '' → '', "" → ""
              dashes: true, // Enable smart dashes: -- → –, --- → —
              ellipses: true, // Enable smart ellipses: ... → …
            },
          ],
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeStringify,
          rehypeKatex, // Add KaTeX rendering
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default EnhancedMarkdown
