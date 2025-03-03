import React from 'react'
import EnhancedMarkdown from '@/components/EnhancedMarkdown'

export default function KatexDemo() {
  const mathContent = `
# KaTeX Demo

## Inline Math

Einstein's famous equation: $E = mc^2$

The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

## Block Math

The Pythagorean theorem:

$$a^2 + b^2 = c^2$$

The Lorentz factor from special relativity:

$$\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}$$

Maxwell's Equations:

$$\\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} = \\frac{4\\pi}{c}\\vec{\\mathbf{j}}$$

$$\\nabla \\cdot \\vec{\\mathbf{E}} = 4 \\pi \\rho$$

$$\\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t} = \\vec{\\mathbf{0}}$$

$$\\nabla \\cdot \\vec{\\mathbf{B}} = 0$$

## Matrix

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
$$

## Fractions

$$\\frac{1}{\\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}} {1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }$$
  `

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">KaTeX Mathematical Expressions Demo</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <EnhancedMarkdown content={mathContent} />
      </div>
    </div>
  )
}
