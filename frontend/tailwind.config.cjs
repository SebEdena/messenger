const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-primary))',
        tertiary: 'rgb(var(--color-primary))',
        accent: 'rgb(var(--color-primary))',
        font: 'rgb(var(--color-font))',
      },
    },
  },

  plugins: [],

  darkMode: 'class',
};

module.exports = config;
