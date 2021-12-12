import React, { useEffect, useState } from "react";
import "./gislayout.scss";
import arcgisConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";
import { GIS_KEY } from "../../constants/key";

export default function GisLayout() {
  // const [map, setMap] = useState(null);
  // const [view, setView] = useState(null);
  // const [graphicsLayer, setGraphicsLayer] = useState(null);

  // const fetchData = async () => {
  //   const res = await fetch("http://localhost:3000/SE0115.json");
  //   const data = await res.json();

  //   const polygon = {
  //     type: "polygon",
  //     rings: data.geometries[0].coordinates[0],
  //   };
  //   const simpleFillSymbol = {
  //     type: "simple-fill",
  //     color: [227, 139, 79, 0.8], // Orange, opacity 80%
  //     outline: {
  //       color: [255, 255, 255],
  //       width: 1,
  //     },
  //   };
  //   const popupTemplate = {
  //     title: "SE0115",
  //     content: "<p>html ne</p>",
  //   };
  //   const polygonGraphic = new Graphic({
  //     geometry: polygon,
  //     symbol: simpleFillSymbol,
  //     // popupTemplate: popupTemplate,
  //   });
  //   view?.on("click", async function (event) {
  //     // you must overwrite default click-for-popup
  //     // behavior to display your own popup
  //     const graphic = await view.hitTest(event);
  //     console.log(graphic);
  //   });
  //   console.log(polygonGraphic);
  //   graphicsLayer?.add(polygonGraphic);
  // };

  // useEffect(() => {
  //   arcgisConfig.apiKey = GIS_KEY;
  //   setMap(new Map({ basemap: "arcgis-topographic" }));
  //   setGraphicsLayer(new GraphicsLayer());
  // }, []);

  // useEffect(() => {
  //   setView(
  //     new MapView({
  //       map: map || new Map({ basemap: "arcgis-topographic" }),
  //       container: "gisLayout",
  //       // center: [106.80304336824396, 10.870082646589365],
  //       center: [18.21808, 59.58301],
  //       zoom: 10,
  //       highlightOptions: {
  //         color: "white",
  //         haloOpacity: 0.65,
  //         fillOpacity: 0.45,
  //       },
  //     })
  //   );
  //   map?.add(graphicsLayer);
  // }, [map]);

  // useEffect(() => {
  //   fetchData();
  //   // Delete all polygons
  //   // map?.remove(graphicsLayer);
  //   // Add new polygon
  // });
  return <div id="gisLayout"></div>;
}
