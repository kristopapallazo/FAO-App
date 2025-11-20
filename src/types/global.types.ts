import type { User } from "./dto.types";

export type DeviceType = "mobile" | "tablet" | "laptop";
export type Theme = "light" | "dark";

export type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppContextType {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;

  // User state
  user: User | null;
  setUser: (user: User | null) => void;

  // Theme state
  theme: Theme;
  isdarkTheme: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
