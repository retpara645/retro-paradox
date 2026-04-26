/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-yellow': '#FFFF00',
        'retro-blue': '#002366',
        'retro-red': '#FF0000',
      },
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'comic': '8px 8px 0px 0px rgba(0,0,0,1)',
        'comic-hover': '12px 12px 0px 0px rgba(0,0,0,1)',
        'comic-active': '0px 0px 0px 0px rgba(0,0,0,1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
