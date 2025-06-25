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
      xxl: '1920px'
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
        'gray': '#f0ece5',
        accent: 'var(--color-accent)',
        'accent-pink': 'var(--color-accent-pink)',
      },
      fontFamily: {
        sans: ['Mona Sans', 'sans-serif'], // 自定义字体
      },
      width: {
        '5x': '500%' // 自定义类 w-5x 为 500%
      },
      translate: {
        '101': '101%',
      },
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
            // 添加will-change优化
            willChange: 'transform'
          },
          '100%': {
            transform: 'translateX(-50%)',
            // 确保动画结束时移除优化
            willChange: 'auto'
          }
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      }

    },
  },
  plugins: [],
}

