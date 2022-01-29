const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      green: {
        100: '#DAE6DE',
        300: '#D7EFE0',
        500: '#9EC5AC',
        700: '#5A8068',
        900: '#32533F',
      },
      white: colors.white,
    },
  },
  plugins: [],
};
