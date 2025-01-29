/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      backgroundImage: {
        'custom-radial1': `
        radial-gradient(circle at 20% 30%, rgba(0, 80, 200 , .7), transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(40, 40, 255  , .7), transparent 40%)
        `,
        'custom-radial2': `
          radial-gradient(circle at 80% 70%, rgba(0, 80, 250 , .7), transparent 40%),
          radial-gradient(circle at 20% 30%, rgba(40, 40, 255  , .7), transparent 40%)
        `,
      },
      colors: {
        'light-gray': '#e5e5e5',
      },

    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')],
}

