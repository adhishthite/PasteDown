import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'

const EnhancedMarkdown = ({ content, className = '' }) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[
          [remarkMermaidPlugin, { theme: 'default' }], // You can change the theme to 'dark', 'forest', etc.
        ]}
        rehypePlugins={[rehypeRaw, rehypeStringify]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default EnhancedMarkdown
