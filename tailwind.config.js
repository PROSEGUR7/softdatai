/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#050714',
          light: '#0c0e22'
        },
        primary: {
          DEFAULT: '#6C63FF',
          light: '#8A84FF',
          dark: '#5046E5'
        },
        secondary: {
          DEFAULT: '#00D4FF',
          light: '#5EE7FF',
          dark: '#00A3C4'
        },
        accent: {
          DEFAULT: '#FF007A',
          light: '#FF4DA1',
          dark: '#C80060'
        },
        success: {
          DEFAULT: '#00C48C',
          light: '#33DFAD',
          dark: '#00A371'
        },
        warning: {
          DEFAULT: '#FFB800',
          light: '#FFC740',
          dark: '#CC9200'
        },
        error: {
          DEFAULT: '#FF4D4F',
          light: '#FF7A7B',
          dark: '#CC3D3F'
        },
        neutral: {
          100: '#F5F5FF',
          200: '#E5E5FF',
          300: '#C9C9E7',
          400: '#9D9DBB',
          500: '#7D7D99',
          600: '#5C5C77',
          700: '#3D3D55',
          800: '#222233',
          900: '#13131F',
          950: '#0A0A12'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        'neon-primary': '0 0 10px rgba(108, 99, 255, 0.5)',
        'neon-secondary': '0 0 10px rgba(0, 212, 255, 0.5)',
        'neon-accent': '0 0 10px rgba(255, 0, 122, 0.5)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
};