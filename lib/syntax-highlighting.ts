// Available syntax highlighting themes
import {
  dracula,
  vscDarkPlus,
  atomDark,
  materialLight,
  materialOceanic,
  oneDark,
  nord,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Theme name type
export type SyntaxTheme =
  | 'dracula'
  | 'vscode-dark'
  | 'atom-dark'
  | 'material-light'
  | 'material-oceanic'
  | 'one-dark'
  | 'nord'

// Map of theme names to their corresponding styles
export const syntaxThemes = {
  dracula: dracula,
  'vscode-dark': vscDarkPlus,
  'atom-dark': atomDark,
  'material-light': materialLight,
  'material-oceanic': materialOceanic,
  'one-dark': oneDark,
  nord: nord,
}

// Get theme by name, with fallback to dracula
export function getThemeByName(themeName: SyntaxTheme = 'dracula') {
  return syntaxThemes[themeName] || dracula
}
