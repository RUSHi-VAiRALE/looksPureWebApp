/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '768px',
        'md': '1024px',
        'xl': '2560px',
      },
    },
  },
  plugins: [],
}