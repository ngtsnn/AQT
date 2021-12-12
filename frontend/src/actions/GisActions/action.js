import { INIT_ARCGIS, UPDATE_CAM } from "./const";
import arcgisConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import MapView from "@arcgis/core/views/MapView";
import { GIS_KEY } from "../../constants/key";


export function Init() {
  arcgisConfig.apiKey = GIS_KEY;
  const map = new Map({ basemap: "arcgis-topographic" });
  const view  = new MapView({
    map: map,
    container: "gisLayout",
    center: [18.21808, 59.58301],
    zoom: 10,
    highlightOptions: {
      color: "white",
      haloOpacity: 0.65,
      fillOpacity: 0.45,
    },
  });

  return {
    type: INIT_ARCGIS,
    payload: {map , view},
  };
}

export function UpdateCam(center = [18.21808, 59.58301]) {
  const point = new Point({
    latitude: center[0],
    longitude: center[1],
  });

  return {
    type: UPDATE_CAM,
    payload: {
      target: point,
      zoom: 11,
    },
  };
}