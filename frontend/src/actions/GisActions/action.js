import {
  GET_DATA_BY_DATE,
  INIT_ARCGIS,
  RENDER_DATA_BY_CATE,
  UPDATE_CAM,
} from "./const";
import arcgisConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import MapView from "@arcgis/core/views/MapView";
import { GIS_KEY } from "../../constants/key";
import axios from "axios";
import { BASE_API } from "../../constants/url";
import { colorConverter } from "../../utils/colorConverter";
import { CATEGORY_AQI_MV } from "../../constants/category";
import Chart from "chart.js/auto";

export function Init() {
  arcgisConfig.apiKey = GIS_KEY;
  const map = new Map({ basemap: "arcgis-topographic" });
  const view = new MapView({
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

  const ctx = document.getElementById("barChart");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["NO2", "O3", "PM25", "PM10"],
      datasets: [
        {
          label: "Point of cleaness",
          data: [0, 0, 0, 0],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "The bar chart illustrates air quality",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return {
    type: INIT_ARCGIS,
    payload: { map, view, chart },
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

export const getCitiesByDate = async (
  date,
  currentCategory = CATEGORY_AQI_MV
) => {
  const { data } = await axios.get(`${BASE_API}/air-qualities/?date=${date}`);

  const mvLayer = new GraphicsLayer();
  const aqi4Layer = new GraphicsLayer();
  const aqi11Layer = new GraphicsLayer();
  const no2Layer = new GraphicsLayer();
  const o3Layer = new GraphicsLayer();
  const pm10Layer = new GraphicsLayer();
  const pm25Layer = new GraphicsLayer();

  // setList(data);
  const cities = [];
  [...data].map((item) => {
    const polygon = {
      type: "polygon",
      rings: item.city.geometries[0].coordinates[0],
    };
    const popupTemplate = {
      title: `Air quality of ${item.city.name[0]}`,
      content: `
      <h3>Main poll: </h3>
      <p>name: ${item.mainPolls[0].name}</p>
      <p>Source: ${item.mainPolls[0].sources}</p>
      <p>Solution: ${item.mainPolls[0].solutions}</p>
      <hr/>
      <h3>Recommendation: </h3>
      <p>General: ${item.nonSensitiveRecommendation.general}</p> 
      <p>Sport Activities: ${item.nonSensitiveRecommendation.sports}</p> 
      <p>Ventilation: ${item.nonSensitiveRecommendation.ventilation}</p> 
      
      `,
    };
    const simpleFillSymbol = {
      type: "simple-fill",
      color: [92, 242, 17, 0.8], // Orange, opacity 80%
      outline: {
        color: colorConverter(item.meanValueColor),
        width: 1,
      },
    };

    const uids = [];

    simpleFillSymbol.color = colorConverter(item.meanValueColor);
    const mvPolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(mvPolygonGraphic.uid);
    mvLayer.add(mvPolygonGraphic);

    simpleFillSymbol.color = colorConverter(item.aqi_4.color);
    const aqi4PolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(aqi4PolygonGraphic.uid);
    aqi4Layer.add(aqi4PolygonGraphic);

    simpleFillSymbol.color = colorConverter(item.aqi_11.color);
    const aqi11PolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(aqi11PolygonGraphic.uid);
    aqi11Layer.add(aqi11PolygonGraphic);

    simpleFillSymbol.color = colorConverter(item.aqi_101.pm25Color);
    const pm25PolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(pm25PolygonGraphic.uid);
    pm25Layer.add(pm25PolygonGraphic);

    simpleFillSymbol.color = colorConverter(item.aqi_101.pm10Color);
    const pm10PolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(pm10PolygonGraphic.uid);
    pm10Layer.add(pm10PolygonGraphic);

    simpleFillSymbol.color = colorConverter(item.aqi_101.o3Color);
    const o3PolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(o3PolygonGraphic.uid);
    o3Layer.add(o3PolygonGraphic);

    simpleFillSymbol.color = colorConverter(item.aqi_101.no2Color);
    const no2PolygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      popupTemplate: popupTemplate,
    });
    uids.push(no2PolygonGraphic.uid);
    no2Layer.add(no2PolygonGraphic);

    cities.push({
      uids,
      id: item.id,
      cityName: item.city.name,
      aqi101: item.aqi_101,
      date: item.date,
    });
  });

  return {
    type: GET_DATA_BY_DATE,
    payload: {
      graphicLayers: [
        mvLayer,
        aqi4Layer,
        aqi11Layer,
        pm25Layer,
        pm10Layer,
        o3Layer,
        no2Layer,
      ],
      cities,
      currentCategory,
    },
  };
};

export const renderByCate = (category = CATEGORY_AQI_MV) => {
  return {
    type: RENDER_DATA_BY_CATE,
    payload: {
      category,
    },
  };
};
