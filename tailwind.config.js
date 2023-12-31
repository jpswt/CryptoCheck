/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundColor: {
				primary: 'var(--color-bg-primary)',
				secondary: 'var(--color-bg-secondary)',
				button: 'var(--color-bg-button)',
				accent: 'var(--color-bg-accent)',
				table: 'var(--color-bg-table)',
				input: 'var(--color-bg-input)',
				gradient: 'var(--color-gradient)',
			},

			textColor: {
				primary: 'var(--color-text-primary)',
				secondary: 'var(--color-text-secondary)',
				accent: 'var(--color-text-accent)',
				buttonText: 'var(--color-bg-secondary)',
				input: 'var(--color-bg-input)',
			},
			borderColor: {
				primary: 'var(--color-bg-primary)',
				secondary: 'var(--color-bg-secondary)',
				accent: 'var(--color-bg-input)',
				input: 'var(--color-text-accent)',
				table: 'var(--color-bg-table)',
			},
			outlineColor: {
				accent: 'var(--color-text-accent)',
			},
			placeholderColor: {
				primary: 'var(--color-text-secondary)',
			},
			colors: {
				primary: 'var(--color-shadow)',
				grad1: 'var(--color-bg-button)',
			},
		},
	},
	plugins: [require('daisyui')],
};
