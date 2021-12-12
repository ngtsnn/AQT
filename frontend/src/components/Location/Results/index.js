import React from "react";
import { LocationOnOutlined } from "@mui/icons-material";

import "./style.scss";

const Results = function ({ cities }) {
  return (
    <div className="found-cities">
      {cities &&
        cities.map((city) => (
          <div className="found-city" key={city?._id} id={city?._id}>
            <div className="city-icon">
              <LocationOnOutlined />
            </div>
            <div className="city-info">
              <div className="city-name">{city?.name}</div>
              <div className="city-center">{city?.center?.join(",")}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Results;
