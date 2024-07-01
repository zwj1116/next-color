module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '576px',
      sm: '576px', // 自定义 sm 断点
      md: '768px', // 自定义 md 断点
      // 继续添加或覆盖默认断点
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
    extend: {},
  },
  plugins: [],
};
