import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";

// Định nghĩa kiểu cho Theme
export interface Theme {
  background: string;
  text: string;
  content: string;
  borderInput: string;
}

// Định nghĩa kiểu cho Context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeMode: boolean; // Add this
}

// Khai báo theme sáng và tối
const lightTheme: Theme = {
  background: '#f5f5f5',
  content: 'white',
  text: 'black',
  borderInput: '#ccc',
};

const darkTheme: Theme = {
  background: '#333',
  text: 'white',
  content: '#222',
   borderInput: '#444',
};

// Update the context default value
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => { },
  themeMode: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [themeMode, setThemeMode] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
    setThemeMode(!themeMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme trong toàn bộ app
export const useTheme = () => useContext(ThemeContext);