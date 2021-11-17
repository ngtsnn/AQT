import React, { useState } from "react";
import {
  FilterNone,
  AnalyticsOutlined,
  Search,
  AltRoute,
  AccountTreeOutlined,
  WbSunny,
  Settings,
} from "@mui/icons-material";
import "./toolbar.scss";

export default function Toolbar() {
  const [indexToolbar, setIndexToolbar] = useState(0);

  const handleToolbarTop = (index) => {
    setIndexToolbar(index);
  };

  const styleActive = (index) => {
    if (indexToolbar === index) {
      return "btn-feature-item active";
    }
    return "btn-feature-item";
  };

  return (
    <div className="toolbar">
      <div className="toolbar-top">
        <span>
          <button
            className={styleActive(0)}
            onClick={() => handleToolbarTop(0)}
          >
            <FilterNone style={{ fontSize: "30px" }} />
          </button>
        </span>
        <span>
          <button
            className={styleActive(1)}
            onClick={() => handleToolbarTop(1)}
          >
            <AnalyticsOutlined style={{ fontSize: "30px" }} />
          </button>
        </span>
        <span>
          <button
            className={styleActive(2)}
            onClick={() => handleToolbarTop(2)}
          >
            <Search style={{ fontSize: "30px" }} />
          </button>
        </span>
        <span>
          <button
            className={styleActive(3)}
            onClick={() => handleToolbarTop(3)}
          >
            <AltRoute style={{ fontSize: "30px" }} />
          </button>
        </span>
        <span>
          <button
            className={styleActive(4)}
            onClick={() => handleToolbarTop(4)}
          >
            <AccountTreeOutlined style={{ fontSize: "30px" }} />
          </button>
        </span>
      </div>
      <div className="toolbar-bottom">
        <span>
          <button className="btn-feature-item">
            <WbSunny style={{ fontSize: "30px" }} />
          </button>
        </span>
        <span>
          <button className="btn-feature-item">
            <Settings style={{ fontSize: "30px" }} />
          </button>
        </span>
      </div>
    </div>
  );
}
