// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float1: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        float1: 'float1 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

