import { fixTypos } from './typopo'

declare global {
  interface Window {
    fixTypos: typeof fixTypos
  }
}

window.fixTypos = fixTypos
