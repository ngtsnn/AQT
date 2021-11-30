import React, { useEffect } from "react";
import "./gislayout.scss";
import arcgisConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";

export default function GisLayout() {
  useEffect(async () => {
    arcgisConfig.apiKey = "AAPKc6e5adb1355c4f3f9af6b66859984835PWMVQ2ETfKlLK8mQ3ekhodnYmwCXZ1UIQpZ_s75oqZHb1BI6h3Nh_Ute2QuMrQOt";
    const map = new Map({ basemap: "arcgis-topographic" });
    const view = new MapView({
      map: map,
      container: "gisLayout",
      // center: [106.80304336824396, 10.870082646589365],
      center: [18.21808, 59.58301],
      zoom: 12,
    });
    // fetch("http://localhost:3001/SE0115.json").then((res) => {
    //   return res.json();
    // }).then(data)
    const res = await fetch("http://localhost:3001/SE0115.json");
    const data = await res.json();

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    const polygon = {
      type: "polygon",
      rings: data.geometries[0].coordinates[0],
    };
    const simpleFillSymbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.8], // Orange, opacity 80%
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };
    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
    });
    graphicsLayer.add(polygonGraphic);
  }, []);
  return <div id="gisLayout"></div>;
}
