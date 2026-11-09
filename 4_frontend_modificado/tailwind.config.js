/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Habita" - elegante oscuro con acentos dorados
        carbon: {
          50:  '#f6f5f3',
          100: '#e8e6e1',
          200: '#d3d0c9',
          300: '#aaa6a0',
          400: '#7d7a75',
          500: '#55534f',
          950: '#0a0a0c',
          900: '#121216',
          800: '#1a1a20',
          700: '#24242c',
          600: '#32323c',
        },
        oro: {
          100: '#f7eccf',
          200: '#ecd9a3',
          300: '#dfc173',
          400: '#cfa84a',
          500: '#b8902f',
          600: '#957125',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        oro: '0 0 0 1px rgba(207,168,74,0.35), 0 18px 40px -24px rgba(207,168,74,0.45)',
      },
      letterSpacing: {
        marca: '0.28em',
      },
    },
  },
  plugins: [],
}
