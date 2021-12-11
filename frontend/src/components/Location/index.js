import React from "react";
import { Search } from "@mui/icons-material";
import "./location.scss";

export default function Location() {
  return (
    <div id="location">
      <div className="location-icon">
        <Search />
      </div>
      <div className="location-input">
        <input placeholder="Tìm địa điểm" />
      </div>
    </div>
  );
}
