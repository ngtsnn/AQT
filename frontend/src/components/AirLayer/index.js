import React from "react";
import "./airlayer.scss";

export default function AirLayer() {
  return (
    <div className="airlayer-container">
      {/* NO2 */}
      <div className="airlayer-line">
        <div className="airlayer-input">
          <input type="radio" name="input_radio" id="" defaultChecked={true} />
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
          <input type="radio" name="input_radio" id="" />
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
          <input type="radio" name="input_radio" id="" />
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
          <input type="radio" name="input_radio" id="" />
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
    </div>
  );
}
