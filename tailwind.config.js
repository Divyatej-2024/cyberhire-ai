/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(210, 100%, 55%)',
          50: 'hsl(210, 100%, 95%)',
          100: 'hsl(210, 100%, 90%)',
          200: 'hsl(210, 100%, 80%)',
          300: 'hsl(210, 100%, 70%)',
          400: 'hsl(210, 100%, 60%)',
          500: 'hsl(210, 100%, 55%)',
          600: 'hsl(210, 100%, 45%)',
          700: 'hsl(210, 100%, 35%)',
          800: 'hsl(210, 100%, 25%)',
          900: 'hsl(210, 100%, 15%)',
        },
        cyber: {
          DEFAULT: 'hsl(160, 70%, 45%)',
          50: 'hsl(160, 70%, 95%)',
          100: 'hsl(160, 70%, 90%)',
          200: 'hsl(160, 70%, 80%)',
          300: 'hsl(160, 70%, 70%)',
          400: 'hsl(160, 70%, 60%)',
          500: 'hsl(160, 70%, 45%)',
          600: 'hsl(160, 70%, 35%)',
          700: 'hsl(160, 70%, 25%)',
          800: 'hsl(160, 70%, 15%)',
          900: 'hsl(160, 70%, 10%)',
        },
        glass: {
          bg: 'rgba(255,255,255,0.1)',
          border: 'rgba(255,255,255,0.2)',
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
