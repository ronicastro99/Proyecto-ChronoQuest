/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chrono: {
          dark: '#080d1a',
          card: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          gold: '#f59e0b',
          'gold-light': '#fde68a',
          red: '#ef4444',
          fire: '#f97316',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          emerald: '#10b981',
          teal: '#14b8a6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
      },
      animation: {
        'bounce-short': 'bounceShort 0.5s ease-in-out 1',
        'shake': 'shake 0.4s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.1))' },
        }
      }
    },
  },
  plugins: [],
}
