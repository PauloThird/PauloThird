/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#8E2DE2',
        'neon-blue': '#4A00E0',
        'neon-green': '#39FF14',
        'neon-pink': '#FF0080',
        'dark-bg': '#0f0f0f',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
        'neon-gradient-reverse': 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
        'neon-green-gradient': 'linear-gradient(135deg, #39FF14 0%, #00D4AA 100%)',
        'neon-pink-gradient': 'linear-gradient(135deg, #FF0080 0%, #FF6B6B 100%)',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            'box-shadow': '0 0 5px #8E2DE2, 0 0 10px #8E2DE2, 0 0 15px #8E2DE2' 
          },
          '100%': { 
            'box-shadow': '0 0 10px #8E2DE2, 0 0 20px #8E2DE2, 0 0 30px #8E2DE2' 
          }
        },
        'pulse-neon': {
          '0%, 100%': {
            'box-shadow': '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14',
            opacity: '1'
          },
          '50%': {
            'box-shadow': '0 0 2px #39FF14, 0 0 5px #39FF14, 0 0 10px #39FF14',
            opacity: '0.8'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}