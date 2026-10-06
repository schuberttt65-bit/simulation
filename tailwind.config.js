/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pop: {
          yellow: '#FFE600',
          pink: '#FF70A6',
          purple: '#A06CD5',
          cyan: '#48CAE4',
          lime: '#70E000',
          orange: '#FF9770',
          cream: '#FFF9EB',
          darkBg: '#12131C',
          darkCard: '#1E202F',
        },
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo-dark': '4px 4px 0px 0px #FFFFFF',
        'clay': 'inset 2px 2px 5px rgba(255, 255, 255, 0.7), inset -3px -3px 6px rgba(0, 0, 0, 0.15), 5px 5px 0px 0px #000000',
        'clay-dark': 'inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -3px -3px 6px rgba(0, 0, 0, 0.6), 5px 5px 0px 0px #FFFFFF',
        'soft-neu': '9px 9px 18px #d1d5db, -9px -9px 18px #ffffff',
      },
      borderRadius: {
        'clay': '1.75rem',
      },
    },
  },
  plugins: [],
};
