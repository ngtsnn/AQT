import React from "react";
import { LocationOnOutlined } from "@mui/icons-material";

import "./style.scss";
import { useGis } from "../../../context/GisContext";
import { UpdateCam } from "../../../actions/GisActions/action";

const Results = function ({ cities }) {

  const [state, dispatch] = useGis();

  const choose = (city) => {
    const center = city.center
      .reverse()
      .map((ordinate) => parseFloat(ordinate));
    dispatch(UpdateCam(center));  
  }

  return (
    <div className="found-cities">
      {cities &&
        cities.map((city) => (
          <div className="found-city" key={city?._id} id={city?._id}  onClick={() => {choose(city)}}>
            <div className="city-icon">
              <LocationOnOutlined />
            </div>
            <div className="city-info">
              <div className="city-name">{Array.isArray(city?.name) ? city?.name[0] : city?.name }</div>
              <div className="city-center">{city?.center?.join(",")}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Results;
