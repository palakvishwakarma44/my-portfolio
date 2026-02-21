import { useState, useEffect } from 'react';

const THEMES = {
    nebula: 'nebula',
    aurora: 'aurora',
    synthwave: 'synthwave',
    matrix: 'matrix',
};

/**
 * Custom hook for theme management
 * Persists theme preference to localStorage
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        return savedTheme || THEMES.nebula;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const themeArray = Object.values(THEMES);
        const currentIndex = themeArray.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themeArray.length;
        setTheme(themeArray[nextIndex]);
    };

    return { theme, setTheme, toggleTheme, THEMES };
};

export default useTheme;
