import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { ThemeContext } from '../context/Theme';
import { useContext } from 'react';

const ToggleBtn = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	return (
		<div className="p-2">
			{theme === 'dark' ? (
				<div
					className="flex cursor-pointer items-center"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					<IoMoonOutline className="mr-2 text-2xl font-bold text-primary" />
				</div>
			) : (
				<div
					className="flex cursor-pointer items-center"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					<IoSunnyOutline className="mr-2 text-2xl font-bold text-primary" />
				</div>
			)}
		</div>
	);
};
export default ToggleBtn;
