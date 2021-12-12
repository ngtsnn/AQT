import React, { useContext, useEffect, useReducer} from "react";
import Map from "@arcgis/core/Map";
import GisReducer from "../reducers/GisReducers";
import { Init } from "../actions/GisActions/action";


export const GisContext = React.createContext();

export function GisProvider({ children }) {

  const [state, dispatch] = useReducer(GisReducer, {
    map: new Map({ basemap: "arcgis-topographic" }),
    view: null,
    graphicsLayer: null,
    cities: [],
  });

  useEffect(() => {
    dispatch(Init());
    return () => {
      
    }
  }, []);

  return (
    <GisContext.Provider value={[state, dispatch]}>
      {children}
    </GisContext.Provider>
  );
}

export function useGis() {
  const gisContext = useContext(GisContext);
  if (gisContext === undefined) {
    throw new Error("No search context right heres");
  }
  return gisContext;
}
