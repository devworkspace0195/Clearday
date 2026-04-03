import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { COLORS } from '../constants';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  error: string;
  success: string;
  white: string;
}

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const lightColors: ThemeColors = {
  background: COLORS.backgroundLight,
  surface: COLORS.surfaceLight,
  textPrimary: COLORS.textPrimaryLight,
  textSecondary: COLORS.textSecondaryLight,
  border: COLORS.borderLight,
  primary: COLORS.primary,
  primaryDark: COLORS.primaryDark,
  primaryLight: COLORS.primaryLight,
  error: COLORS.error,
  success: COLORS.success,
  white: COLORS.white,
};

const darkColors: ThemeColors = {
  background: COLORS.backgroundDark,
  surface: COLORS.surfaceDark,
  textPrimary: COLORS.textPrimaryDark,
  textSecondary: COLORS.textSecondaryDark,
  border: COLORS.borderDark,
  primary: COLORS.primary,
  primaryDark: COLORS.primaryDark,
  primaryLight: COLORS.primaryLight,
  error: COLORS.error,
  success: COLORS.success,
  white: COLORS.white,
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');

  const isDark = mode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = useCallback(() => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, colors, toggleTheme, isDark }),
    [mode, colors, toggleTheme, isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
