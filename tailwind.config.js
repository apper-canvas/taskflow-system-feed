/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'scale-up': 'scale-up 0.2s ease-out',
        'fade-out': 'fade-out 0.4s ease-in-out forwards',
        'slide-up': 'slide-up 0.4s ease-in-out forwards',
        'bounce-in': 'bounce-in 0.6s ease-out'
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(0.95) rotate(2deg)' },
          '100%': { opacity: '0', transform: 'scale(0.9) rotate(2deg)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(0)', height: 'auto' },
          '100%': { transform: 'translateY(-100%)', height: '0' }
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}