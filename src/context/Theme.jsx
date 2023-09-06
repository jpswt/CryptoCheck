import { useState, useEffect, createContext } from 'react';

const getTheme = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storeTheme = window.localStorage.getItem('color-theme');

		if (typeof storeTheme === 'string') {
			return storeTheme;
		}

		const userMedia = window.matchMedia('(prefers-color-theme: dark)');
		if (userMedia.matches) {
			return 'dark';
		}
	}
	return 'light';
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
	const [theme, setTheme] = useState(getTheme);

	const defaultTheme = (theme) => {
		const root = window.document.documentElement;
		const isDark = theme === 'dark';

		root.classList.remove(isDark ? 'light' : 'dark');
		root.classList.add(theme);

		localStorage.setItem('color-theme', theme);
	};

	if (initialTheme) {
		defaultTheme(initialTheme);
	}

	useEffect(() => {
		defaultTheme(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
