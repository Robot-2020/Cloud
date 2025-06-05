/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '430px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/assets/image/hero-image.jpg')",
      },
      colors: {
        'white-50': '#d9ecff',
        'black-50': '#1c1c21',
        'black-100': '#0e0e10',
        'black-200': '#282732',
        'blue-50': '#839cb5',
        'blue-100': '#2d2d38',
      },
      fontFamily: {
        sans: ['Mona Sans', 'sans-serif'], // 自定义字体
      },
    },
  },
  plugins: [],
}

