import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const EnhancedMarkdown = ({ content, className = '' }) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[
          [remarkMermaidPlugin, { theme: 'default' }], // You can change the theme to 'dark', 'forest', etc.
          remarkMath, // Add math support
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
