import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    bg: string;
    card: string;
    textMain: string;
    textMuted: string;
    primary: string;
    headerBg: string;
    iconBg: string;
    border: string;
    inputBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme || 'light');

  useEffect(() => {
    setTheme(systemColorScheme || 'light');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? '#121212' : '#f8f9fc',
    card: isDark ? '#1e1e1e' : '#fff',
    textMain: isDark ? '#ffffff' : '#111111',
    textMuted: isDark ? '#aaaaaa' : '#666666',
    primary: isDark ? '#3d8eee' : '#0056b3',
    headerBg: isDark ? '#1e1e1e' : '#ffffff',
    iconBg: isDark ? '#233342' : '#e6f0fa',
    border: isDark ? '#333333' : '#eeeeee',
    inputBg: isDark ? '#1a1a1a' : '#ffffff'
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
