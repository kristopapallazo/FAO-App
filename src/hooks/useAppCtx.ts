import { useContext } from "react";
import type { AppContextType } from "../types/global.types";
import { AppContext } from "../context";

const useApp = () => {
  const context = useContext<AppContextType | undefined>(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export { useApp };
