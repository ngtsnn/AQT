import React, { useContext, useEffect, useReducer } from "react";
import Map from "@arcgis/core/Map";
import GisReducer from "../reducers/GisReducers";
import { getCitiesByDate, Init } from "../actions/GisActions/action";
import { CATEGORY_AQI_MV } from "../constants/category";

export const GisContext = React.createContext();

export function GisProvider({ children }) {
  const [state, dispatch] = useReducer(GisReducer, {
    map: new Map({ basemap: "arcgis-topographic" }),
    view: null,
    graphicsLayers: [],
    cities: [],
    currentCategory: CATEGORY_AQI_MV,
    statisticListener: null,
    chart: null,
  });

  const getCitiesAction = async () => {
    dispatch(await getCitiesByDate("2021-12-08"));
  };

  useEffect(() => {
    dispatch(Init());
    getCitiesAction();
    return () => {};
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
