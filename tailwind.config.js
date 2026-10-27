/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0f9ff',
          100: '#e0f7ff',
          200: '#b3edff',
          300: '#80e7ff',
          400: '#4dd9ff',
          500: '#00d9ff',
          600: '#00bfcc',
          700: '#009aa0',
          800: '#007a86',
          900: '#005a6b',
        },
        purple: {
          600: '#8338ec',
          700: '#6b2fd9',
        },
        slate: {
          900: '#0f172a',
          950: '#020617',
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00d9ff 0%, #8338ec 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0d0221 0%, #16213e 100%)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-cyber': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 1s infinite',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 217, 255, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        cyber: '0 0 20px rgba(0, 217, 255, 0.25)',
        'cyber-lg': '0 0 40px rgba(0, 217, 255, 0.4)',
        glow: '0 0 30px rgba(131, 56, 236, 0.3)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      transitionTimingFunction: {
        cyber: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
