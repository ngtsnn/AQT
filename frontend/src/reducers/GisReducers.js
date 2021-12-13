import { INIT_ARCGIS, UPDATE_CAM } from "../actions/GisActions/const";


export default function GisReducer (state, action) {
  switch (action.type) {
    case INIT_ARCGIS: {
      state.map = action.payload.map;
      state.view = action.payload.view;
      return state;
    } 
    case UPDATE_CAM: {
      console.log(action.payload);
      state.view.goTo(action.payload);
      return state;
    }
    default: return state;
  }
}