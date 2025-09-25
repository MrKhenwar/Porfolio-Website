/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'playfair': ['Playfair Display', 'serif'],
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'text-shimmer': 'text-shimmer 2s ease-in-out infinite alternate',
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 5px rgba(239, 68, 68, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.6)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
};
