/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',  // Archivos de componentes
      './index.html',
  ],
  theme: {
    extend: {
      colors: {
        lightGrey: '#9DB4C0',
        grey: '#5C6B73',
        darkGrey: '#253237',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

