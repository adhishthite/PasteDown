import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMermaidPlugin from 'remark-mermaid-plugin'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import remarkRetext from 'remark-retext'
import retextSmartypants from 'retext-smartypants'
import { unified } from 'unified'
import { english } from 'retext-english'

const EnhancedMarkdown = ({ content, className = '' }) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[
          [remarkMermaidPlugin, { theme: 'default' }], // You can change the theme to 'dark', 'forest', etc.
          remarkMath, // Add math support
          // Add SmartyPants support
          [
            remarkRetext,
            unified().use(english).use(retextSmartypants, {
              quotes: true, // Enable smart quotes: '' → '', "" → ""
              dashes: true, // Enable smart dashes: -- → –, --- → —
              ellipses: true, // Enable smart ellipses: ... → …
              backticks: true, // Enable smart backticks: `` → ", '' → '
              spaces: true, // Enable smart spaces: multiple spaces → single space
            }),
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
