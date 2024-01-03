/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003F84',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
      //可以配置快捷方式。通用样式
      shortcuts: {
        // btn: {
        //   color: 'white',
        //   '@apply': 'py-2 px-4 font-semibold rounded-lg',
        //   '&:hover': {
        //     '@apply': 'bg-green-700',
        //     color: 'black',
        //   },
        // }
      },
    },
  },
  plugins: [],
};
