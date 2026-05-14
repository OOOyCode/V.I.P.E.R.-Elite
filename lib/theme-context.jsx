"use client";

import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("viper-theme");
    if (saved && ["dark", "light"].includes(saved)) {
      setThemeState(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
  }, []);
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("viper-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: "dark",
          toggleTheme: () => {},
          setTheme: () => {},
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
