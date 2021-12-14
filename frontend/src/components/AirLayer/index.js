import React, { useState } from "react";
import "./airlayer.scss";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  CATEGORY_AQI_101_NO2,
  CATEGORY_AQI_101_O3,
  CATEGORY_AQI_101_PM10,
  CATEGORY_AQI_101_PM25,
  CATEGORY_AQI_11,
  CATEGORY_AQI_4,
  CATEGORY_AQI_MV,
} from "../../constants/category";
import { useGis } from "../../context/GisContext";
import { renderByCate } from "../../actions/GisActions/action";

export default function AirLayer() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [gis, dispatch] = useGis();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickCategory = (e) => {
    //call action
    dispatch(renderByCate(e.target.value));
  };

  return (
    <div className="airlayer-container">
      <div className="airquality-container">
        <div className="airquality-lv1" onClick={handleToggle}>
          <span>
            <b>AQI101</b>
          </span>
          <div className="dropdown-icon">
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <Collapse in={isExpanded}>
          {/* NO2 */}
          <div className="airlayer-line">
            <div className="airlayer-input">
              <input
                type="radio"
                name="input_radio"
                id=""
                value={CATEGORY_AQI_101_NO2}
                onClick={handleClickCategory}
              />
            </div>
            <div className="airlayer-img">
              <img src="/img/no2.png" alt="" />
            </div>
            <div className="airlayer-text">
              <span>
                Nitrogen Dioxide (NO<sub>2</sub>)
              </span>
            </div>
          </div>
          {/* Ozone */}
          <div className="airlayer-line">
            <div className="airlayer-input">
              <input
                type="radio"
                name="input_radio"
                id=""
                onClick={handleClickCategory}
                value={CATEGORY_AQI_101_O3}
              />
            </div>
            <div className="airlayer-img">
              <img src="/img/o3.png" alt="" />
            </div>
            <div className="airlayer-text">
              <span>
                Ozone (O<sub>3</sub>)
              </span>
            </div>
          </div>
          {/* PM10 */}
          <div className="airlayer-line">
            <div className="airlayer-input">
              <input
                type="radio"
                name="input_radio"
                id=""
                onClick={handleClickCategory}
                value={CATEGORY_AQI_101_PM10}
              />
            </div>
            <div className="airlayer-img">
              <img src="/img/pm10.png" alt="" />
            </div>
            <div className="airlayer-text">
              <span>
                Particulate Matter 10 (PM<sub>10</sub>)
              </span>
            </div>
          </div>
          {/* PM2.5 */}
          <div className="airlayer-line">
            <div className="airlayer-input">
              <input
                type="radio"
                name="input_radio"
                id=""
                onClick={handleClickCategory}
                value={CATEGORY_AQI_101_PM25}
              />
            </div>
            <div className="airlayer-img">
              <img src="/img/pm2.5.png" alt="" />
            </div>
            <div className="airlayer-text">
              <span>
                Particulate Matter 2.5 (PM<sub>2.5</sub>)
              </span>
            </div>
          </div>
        </Collapse>
      </div>

      <div className="airquality-container">
        <div className="airlayer-line">
          <div className="airlayer-input">
            <input
              type="radio"
              name="input_radio"
              id=""
              onClick={handleClickCategory}
              value={CATEGORY_AQI_11}
            />
          </div>
          <div className="airlayer-text">
            <b>AQI11</b>
          </div>
        </div>
      </div>

      <div className="airquality-container">
        <div className="airlayer-line">
          <div className="airlayer-input">
            <input
              type="radio"
              name="input_radio"
              id=""
              onClick={handleClickCategory}
              value={CATEGORY_AQI_4}
            />
          </div>
          <div className="airlayer-text">
            <b>AQI4</b>
          </div>
        </div>
      </div>
      <div className="airquality-container">
        <div className="airlayer-line">
          <div className="airlayer-input">
            <input
              type="radio"
              name="input_radio"
              id=""
              value={CATEGORY_AQI_MV}
              onClick={handleClickCategory}
              defaultChecked={true}
            />
          </div>
          <div className="airlayer-text">
            <b>Mean Value</b>
          </div>
        </div>
      </div>

      <h3 style={{ paddingLeft: 10 }}>
        <b>COLOR STRIP</b>
      </h3>
      <div className="color-table-container">
        <div className="color-table">
          <div style={{ background: "rgb(255, 0, 0)" }}></div>
          <div style={{ background: "rgb(255, 13, 0)" }}></div>
          <div style={{ background: "rgb(255, 25, 0)" }}></div>
          <div style={{ background: "rgb(255, 38, 0)" }}></div>
          <div style={{ background: "rgb(255, 51, 0)" }}></div>
          <div style={{ background: "rgb(255, 64, 0)" }}></div>
          <div style={{ background: "rgb(255, 77, 0)" }}></div>
          <div style={{ background: "rgb(255, 89, 0)" }}></div>
          <div style={{ background: "rgb(255, 102, 0)" }}></div>
          <div style={{ background: "rgb(255, 115, 0)" }}></div>
          <div style={{ background: "rgb(255, 128, 0)" }}></div>
          <div style={{ background: "rgb(255, 140, 0)" }}></div>
          <div style={{ background: "rgb(255, 153, 0)" }}></div>
          <div style={{ background: "rgb(255, 166, 0)" }}></div>
          <div style={{ background: "rgb(255, 178, 0)" }}></div>
          <div style={{ background: "rgb(255, 191, 0)" }}></div>
          <div style={{ background: "rgb(255, 204, 0)" }}></div>
          <div style={{ background: "rgb(255, 217, 0)" }}></div>
          <div style={{ background: "rgb(255, 229, 0)" }}></div>
          <div style={{ background: "rgb(255, 242, 0)" }}></div>
          <div style={{ background: "rgb(255, 255, 0)" }}></div>
          <div style={{ background: "rgb(242, 255, 0)" }}></div>
          <div style={{ background: "rgb(230, 255, 0)" }}></div>
          <div style={{ background: "rgb(217, 255, 0)" }}></div>
          <div style={{ background: "rgb(204, 255, 0)" }}></div>
          <div style={{ background: "rgb(191, 255, 0)" }}></div>
          <div style={{ background: "rgb(178, 255, 0)" }}></div>
          <div style={{ background: "rgb(166, 255, 0)" }}></div>
          <div style={{ background: "rgb(153, 255, 0)" }}></div>
          <div style={{ background: "rgb(140, 255, 0)" }}></div>
          <div style={{ background: "rgb(128, 255, 0)" }}></div>
          <div style={{ background: "rgb(115, 255, 0)" }}></div>
          <div style={{ background: "rgb(102, 255, 0)" }}></div>
          <div style={{ background: "rgb(89, 255, 0)" }}></div>
          <div style={{ background: "rgb(77, 255, 0)" }}></div>
          <div style={{ background: "rgb(64, 255, 0)" }}></div>
          <div style={{ background: "rgb(51, 255, 0)" }}></div>
          <div style={{ background: "rgb(38, 255, 0)" }}></div>
          <div style={{ background: "rgb(26, 255, 0)" }}></div>
          <div style={{ background: "rgb(13, 255, 0)" }}></div>
          <div style={{ background: "rgb(0, 255, 0)" }}></div>
          <div style={{ background: "rgb(0, 255, 13)" }}></div>
          <div style={{ background: "rgb(0, 255, 25)" }}></div>
          <div style={{ background: "rgb(0, 255, 38)" }}></div>
          <div style={{ background: "rgb(0, 255, 51)" }}></div>
          <div style={{ background: "rgb(0, 255, 64)" }}></div>
          <div style={{ background: "rgb(0, 255, 77)" }}></div>
          <div style={{ background: "rgb(0, 255, 89)" }}></div>
          <div style={{ background: "rgb(0, 255, 102)" }}></div>
          <div style={{ background: "rgb(0, 255, 115)" }}></div>
          <div style={{ background: "rgb(0, 255, 128)" }}></div>
          <div style={{ background: "rgb(0, 255, 140)" }}></div>
          <div style={{ background: "rgb(0, 255, 153)" }}></div>
          <div style={{ background: "rgb(0, 255, 166)" }}></div>
          <div style={{ background: "rgb(0, 255, 179)" }}></div>
          <div style={{ background: "rgb(0, 255, 191)" }}></div>
          <div style={{ background: "rgb(0, 255, 204)" }}></div>
          <div style={{ background: "rgb(0, 255, 217)" }}></div>
          <div style={{ background: "rgb(0, 255, 229)" }}></div>
          <div style={{ background: "rgb(0, 255, 242)" }}></div>
          <div style={{ background: "rgb(0, 255, 255)" }}></div>
          <div style={{ background: "rgb(0, 242, 255)" }}></div>
          <div style={{ background: "rgb(0, 229, 255)" }}></div>
          <div style={{ background: "rgb(0, 217, 255)" }}></div>
          <div style={{ background: "rgb(0, 204, 255)" }}></div>
          <div style={{ background: "rgb(0, 191, 255)" }}></div>
          <div style={{ background: "rgb(0, 178, 255)" }}></div>
          <div style={{ background: "rgb(0, 166, 255)" }}></div>
          <div style={{ background: "rgb(0, 153, 255)" }}></div>
          <div style={{ background: "rgb(0, 140, 255)" }}></div>
          <div style={{ background: "rgb(0, 128, 255)" }}></div>
          <div style={{ background: "rgb(0, 115, 255)" }}></div>
          <div style={{ background: "rgb(0, 102, 255)" }}></div>
          <div style={{ background: "rgb(0, 89, 255)" }}></div>
          <div style={{ background: "rgb(0, 76, 255)" }}></div>
          <div style={{ background: "rgb(0, 64, 255)" }}></div>
          <div style={{ background: "rgb(0, 51, 255)" }}></div>
          <div style={{ background: "rgb(0, 38, 255)" }}></div>
          <div style={{ background: "rgb(0, 25, 255)" }}></div>
          <div style={{ background: "rgb(0, 13, 255)" }}></div>
          <div style={{ background: "rgb(0, 0, 255)" }}></div>
          <div style={{ background: "rgb(13, 0, 255)" }}></div>
          <div style={{ background: "rgb(25, 0, 255)" }}></div>
          <div style={{ background: "rgb(38, 0, 255)" }}></div>
          <div style={{ background: "rgb(51, 0, 255)" }}></div>
          <div style={{ background: "rgb(64, 0, 255)" }}></div>
          <div style={{ background: "rgb(76, 0, 255)" }}></div>
          <div style={{ background: "rgb(89, 0, 255)" }}></div>
          <div style={{ background: "rgb(102, 0, 255)" }}></div>
          <div style={{ background: "rgb(115, 0, 255)" }}></div>
          <div style={{ background: "rgb(128, 0, 255)" }}></div>
          <div style={{ background: "rgb(140, 0, 255)" }}></div>
          <div style={{ background: "rgb(153, 0, 255)" }}></div>
          <div style={{ background: "rgb(166, 0, 255)" }}></div>
          <div style={{ background: "rgb(179, 0, 255)" }}></div>
          <div style={{ background: "rgb(191, 0, 255)" }}></div>
          <div style={{ background: "rgb(204, 0, 255)" }}></div>
          <div style={{ background: "rgb(217, 0, 255)" }}></div>
          <div style={{ background: "rgb(230, 0, 255)" }}></div>
          <div style={{ background: "rgb(242, 0, 255)" }}></div>
          <div style={{ background: "rgb(255, 0, 255)" }}></div>
        </div>
        <div className="color-legend">
          <div className="start">0</div>
          <div className="end">100</div>
        </div>
      </div>
    </div>
  );
}
