/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Fondo: beige con un verde muy leve, como el yeso de cal.
        // No es gris ni crema: tiene justo el tris verdoso.
        papel: {
          50:  '#F4F5EF',
          100: '#EAECE3',
          200: '#E1E4D9',
          300: '#D6DACC',
          400: '#C3C8B7',
        },
        // Texto: casi negro, pero con la misma base verdosa del fondo,
        // para que la pagina se sienta de una sola familia.
        tinta: {
          900: '#1B1E18',
          800: '#242821',
          700: '#3A3F34',
          600: '#565C4C',
          500: '#6B715F',
          400: '#8A907E',
        },
        // Un solo acento. Terracota sobre verde apagado es la pareja
        // clasica de la arquitectura mediterranea.
        terracota: {
          300: '#C97045',
          400: '#A8502C',
          500: '#8E4224',
        },
      },
      fontFamily: {
        sans:    ['Archivo', 'Helvetica Neue', 'sans-serif'],
        display: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 11vw, 9rem)',    { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)',     { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'rotulo':     ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      maxWidth: { contenido: '82rem' },
    },
  },
  plugins: [],
}
