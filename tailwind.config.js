/** @type {import('tailwindcss').Config} */

// Tokens definidos como tripletas RGB en src/styles.css
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: token('--c-canvas'),
        surface: {
          DEFAULT: token('--c-surface'),
          2: token('--c-surface-2'),
        },
        line: token('--c-line'),
        ink: token('--c-ink'),
        muted: token('--c-muted'),
        faint: token('--c-faint'),
        accent: {
          DEFAULT: token('--c-accent'),
          soft: token('--c-accent-soft'),
          ink: token('--c-accent-ink'),
        },
        danger: {
          DEFAULT: token('--c-danger'),
          soft: token('--c-danger-soft'),
        },
        success: {
          DEFAULT: token('--c-success'),
          soft: token('--c-success-soft'),
        },
        warn: {
          DEFAULT: token('--c-warn'),
          soft: token('--c-warn-soft'),
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display',
          'Helvetica Neue', 'Segoe UI', 'sans-serif',
        ],
        serif: ['Instrument Serif', 'Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse-slow': 'spin 25s linear infinite reverse',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
