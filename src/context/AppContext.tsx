/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AppContextType, DeviceType, Theme } from "../types/global.types";
import type { User } from "../types/dto.types";
import { DUMMY_USER } from "../data";

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "laptop";
  });
  //Check the Local Storage for user info
  const [user, setUser] = useState<User | null>(() => {
    const userInLocalS = localStorage.getItem("user");

    const normalizedUser = userInLocalS ? JSON.parse(userInLocalS) : null;

    // If invalid or missing required fields, return DUMMY_USER
    if (
      !normalizedUser ||
      typeof normalizedUser !== "object" ||
      !normalizedUser?.id ||
      !normalizedUser?.name
    ) {
      localStorage.setItem("user", JSON.stringify(DUMMY_USER));
      return DUMMY_USER;
    }

    // If valid, return the normalized user
    return normalizedUser;
  });

  //Check the Local Storage for theme info
  const [theme, setTheme] = useState<Theme>(() => {
    const isDarkTheme = !!(localStorage.getItem("theme") === "dark");
    return isDarkTheme ? "dark" : "light";
  });

  // Handle window resize for device detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("laptop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Persist user to localStorage
  //   useEffect(() => {
  //     if (user) {
  //       localStorage.setItem("user", JSON.stringify(user));
  //     } else {
  //       localStorage.removeItem("user");
  //     }
  //   }, [user]);

  // Persist theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    // Optional: Apply dark mode class to body
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // Toggle theme helper
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: AppContextType = {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isLaptop: deviceType === "laptop",
    user,
    setUser,
    theme,
    isdarkTheme: !!(theme === "dark"),
    setTheme,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
