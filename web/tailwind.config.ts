import type { Config } from 'tailwindcss'

/** Callida tokens — aligned with root `styles.css` */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F8F6F1',
        'paper-2': '#F1EEE5',
        ink: '#0F1115',
        'ink-soft': '#2A2D34',
        'ink-mute': '#6A6B6E',
        rule: '#DCD7C9',
        navy: '#1B2028',
        yellow: '#F2DC4B',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
