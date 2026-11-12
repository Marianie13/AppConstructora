/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Negro cálido, no azulado: se siente impreso, no digital.
        tinta: {
          950: '#0C0B09',
          900: '#121110',
          850: '#1A1816',
          800: '#221F1C',
          700: '#2E2A26',
          600: '#3D3833',
        },
        // Texto color hueso, nunca blanco puro.
        hueso: {
          50:  '#F7F4EE',
          100: '#EDE8E0',
          200: '#D6D0C6',
          300: '#A8A196',
          400: '#7C766D',
          500: '#565149',
        },
        // Un solo acento, usado con cuenta.
        terracota: {
          300: '#D98A66',
          400: '#C4633F',
          500: '#AE5433',
        },
      },
      fontFamily: {
        // Una sola grotesca para todo, como las revistas de arquitectura.
        sans: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        display: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        // La monoespaciada se reserva para numeros y metadatos.
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala con mucho contraste: o muy grande, o muy pequeño.
        'display-xl': ['clamp(3.5rem, 11vw, 9rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)',  { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'rotulo':     ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      maxWidth: { contenido: '82rem' },
    },
  },
  plugins: [],
}
