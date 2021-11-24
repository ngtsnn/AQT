import React, { useEffect } from "react";
import "./gislayout.scss";
import arcgisConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default function GisLayout() {
  useEffect(() => {
    arcgisConfig.apiKey =
      "AAPKc6e5adb1355c4f3f9af6b66859984835PWMVQ2ETfKlLK8mQ3ekhodnYmwCXZ1UIQpZ_s75oqZHb1BI6h3Nh_Ute2QuMrQOt";
    const map = new Map({ basemap: "arcgis-topographic" });
    const view = new MapView({
      map: map,
      container: "gisLayout",
      center: [106.80304336824396, 10.870082646589365],
      zoom: 12,
    });
  }, []);
  return <div id="gisLayout"></div>;
}
