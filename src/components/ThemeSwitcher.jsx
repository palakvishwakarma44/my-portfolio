import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-switcher hover-target"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === 'nebula' ? <FiMoon /> : <FiSun />}
        </button>
    );
};

export default ThemeSwitcher;
