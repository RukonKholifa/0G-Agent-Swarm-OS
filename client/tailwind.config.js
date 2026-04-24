/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        og: {
          purple: '#7C3AED',
          'purple-dark': '#6D28D9',
          'purple-light': '#EDE9FE',
          'purple-50': '#F5F3FF',
        },
      },
    },
  },
  plugins: [],
};
