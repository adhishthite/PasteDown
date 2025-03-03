/**
 * SmartyPants function to convert ASCII punctuation to typographic punctuation
 * This is used with remark-textr to transform text in Markdown
 */
export function smartypants(input: string): string {
  // Replace straight quotes with curly quotes using template literals to avoid escaping issues
  let processed = input.replace(/"([^"]*)"/g, (match, p1) => `"${p1}"`)
  processed = processed.replace(/'([^']*)'/g, (match, p1) => `'${p1}'`)

  // Replace triple dashes with em-dash
  processed = processed.replace(/---/g, '—')

  // Replace double dashes with en-dash
  processed = processed.replace(/--/g, '–')

  // Replace three dots with ellipsis
  processed = processed.replace(/\.\.\./g, '…')

  // Replace multiple spaces with a single space
  processed = processed.replace(/  +/g, ' ')

  return processed
}

/**
 * Advanced SmartyPants function with more replacements
 */
export function advancedSmartypants(input: string): string {
  // Start with basic SmartyPants replacements
  let processed = smartypants(input)

  // Replace << and >> with guillemets (French quotes)
  processed = processed.replace(/<<([^>>]*)>>/g, (match, p1) => `«${p1}»`)

  // Replace (c) with copyright symbol
  processed = processed.replace(/\(c\)/gi, '©')

  // Replace (r) with registered trademark symbol
  processed = processed.replace(/\(r\)/gi, '®')

  // Replace (tm) with trademark symbol
  processed = processed.replace(/\(tm\)/gi, '™')

  // Replace 1/2, 1/4, 3/4 with fraction symbols
  processed = processed.replace(/1\/2/g, '½')
  processed = processed.replace(/1\/4/g, '¼')
  processed = processed.replace(/3\/4/g, '¾')

  return processed
}
