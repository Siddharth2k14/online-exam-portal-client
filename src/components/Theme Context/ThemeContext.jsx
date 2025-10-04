import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('light');

    const toggleTheme = () => {
        setThemeMode((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';

            document.body.style.background = newTheme === 'light' ? '#fff' : '#222';
            document.body.style.color = newTheme === 'light' ? '#333' : '#fff';

            return newTheme;
        });
    };

    // Apply the initial theme mode only when the component mounts.
    useEffect(() => {
        document.body.style.background = themeMode === 'light' ? '#fff' : '#222';
        document.body.style.color = themeMode === 'light' ? '#333' : '#fff';
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                themeMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};