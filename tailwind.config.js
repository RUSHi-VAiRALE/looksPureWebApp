/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'slow-zoom-out': 'zoomOut 25s cubic-bezier(0.1, 0.05, 0.1, 0.99) forwards',
      },
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(1.2)' },
          '10%': { transform: 'scale(1.2)' }, // Hold the initial state for a moment
          '100%': { transform: 'scale(1.0)' },
        },
      },
    },
  },
  plugins: [],
}