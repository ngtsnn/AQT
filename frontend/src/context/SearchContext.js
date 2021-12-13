import React, { useContext, useState } from "react";

export const SearchContext = React.createContext();

export function SearchProvider({ children }) {
  const [city, setCity] = useState({});
  return (
    <SearchContext.Provider value={{ city, setCity }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const searchContext = useContext(SearchContext);
  if (searchContext === undefined){
    throw new Error("No search context right heres");
  }
  return searchContext;
}
