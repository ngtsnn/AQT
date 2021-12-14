import {
  GET_DATA_BY_DATE,
  INIT_ARCGIS,
  RENDER_DATA_BY_CATE,
  UPDATE_CAM,
} from "../actions/GisActions/const";
import {
  CATEGORY_AQI_101_NO2,
  CATEGORY_AQI_101_O3,
  CATEGORY_AQI_101_PM10,
  CATEGORY_AQI_101_PM25,
  CATEGORY_AQI_11,
  CATEGORY_AQI_4,
  CATEGORY_AQI_MV,
} from "../constants/category";

function updateData(chart, data, color, cityName, date) {
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].backgroundColor = color;
  chart.data.datasets[0].borderColor = color;
  chart.options.plugins.title.text = `The bar chart illustrates air quality of ${cityName} on ${date}`;
  chart.update();
}

export default function GisReducer(state, action) {
  switch (action.type) {
    case INIT_ARCGIS: {
      state.map = action.payload.map;
      state.view = action.payload.view;
      state.chart = action.payload.chart;
      return state;
    }
    case UPDATE_CAM: {
      state.view.goTo(action.payload);
      return state;
    }
    case GET_DATA_BY_DATE: {
      state.map?.removeAll();
      const [
        mvLayer,
        aqi4Layer,
        aqi11Layer,
        pm25Layer,
        pm10Layer,
        o3Layer,
        no2Layer,
      ] = action.payload.graphicLayers;
      switch (action.payload.currentCategory) {
        case CATEGORY_AQI_MV:
          state.map?.add(mvLayer);
          break;
        case CATEGORY_AQI_4:
          state.map?.add(aqi4Layer);
          break;
        case CATEGORY_AQI_11:
          state.map?.add(aqi11Layer);
          break;
        case CATEGORY_AQI_101_PM25:
          state.map?.add(pm25Layer);
          break;
        case CATEGORY_AQI_101_PM10:
          state.map?.add(pm10Layer);
          break;
        case CATEGORY_AQI_101_O3:
          state.map?.add(o3Layer);
          break;
        case CATEGORY_AQI_101_NO2:
          state.map?.add(no2Layer);
          break;
        default:
          state.map?.add(mvLayer);
          break;
      }
      state.currentCategory = action.payload.currentCategory;
      state.graphicLayers = action.payload.graphicLayers;
      state.cities = action.payload.cities;
      state?.statisticListener?.remove();
      state.statisticListener = state.view?.on("click", async function (event) {
        // you must overwrite default click-for-popup
        // behavior to display your own popup
        const { results } = await state.view.hitTest(event);

        // code o day ne
        const clickedCities = state.cities.filter((city) =>
          city.uids.includes(results[0].graphic.uid)
        );
        if (clickedCities.length) {
          const clickedCity = clickedCities[0];
          const data = [
            clickedCity.aqi101.no2,
            clickedCity.aqi101.o3,
            clickedCity.aqi101.pm25,
            clickedCity.aqi101.pm10,
          ];
          const bgColor = [
            clickedCity.aqi101.no2Color,
            clickedCity.aqi101.o3Color,
            clickedCity.aqi101.pm25Color,
            clickedCity.aqi101.pm10Color,
          ];
          updateData(
            state.chart,
            data,
            bgColor,
            clickedCity.cityName,
            clickedCity.date
          );
        }
      });
      return state;
    }
    case RENDER_DATA_BY_CATE: {
      state.map?.removeAll();
      const [
        mvLayer,
        aqi4Layer,
        aqi11Layer,
        pm25Layer,
        pm10Layer,
        o3Layer,
        no2Layer,
      ] = state.graphicLayers;
      switch (action.payload.category) {
        case CATEGORY_AQI_MV:
          state.map?.add(mvLayer);
          break;
        case CATEGORY_AQI_4:
          state.map?.add(aqi4Layer);

          break;
        case CATEGORY_AQI_11:
          state.map?.add(aqi11Layer);
          break;
        case CATEGORY_AQI_101_PM25:
          state.map?.add(pm25Layer);
          break;
        case CATEGORY_AQI_101_PM10:
          state.map?.add(pm10Layer);
          break;
        case CATEGORY_AQI_101_O3:
          state.map?.add(o3Layer);
          break;
        case CATEGORY_AQI_101_NO2:
          state.map?.add(no2Layer);
          break;
        default:
          state.map?.add(mvLayer);
          break;
      }
      state.currentCategory = action.payload.category;
      return state;
    }
    default:
      return state;
  }
}
