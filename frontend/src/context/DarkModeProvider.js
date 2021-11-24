import React, { useState } from "react";

export const DarkModeContext = React.createContext();

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
