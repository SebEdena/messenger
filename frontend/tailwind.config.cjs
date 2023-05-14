const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: 'rgb(var(--color-background))',
				font: 'rgb(var(--color-font))'
			}
		}
	},

	plugins: [],

	darkMode: 'class'
};

module.exports = config;
