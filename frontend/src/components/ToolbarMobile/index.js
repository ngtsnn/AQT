import React, { useState, useEffect } from "react";
import {
  FilterNone,
  AnalyticsOutlined,
  Search,
  AltRoute,
  AccountTreeOutlined,
  WbSunnyOutlined,
  Brightness2Outlined,
  Settings,
  Close,
} from "@mui/icons-material";
import "./toolbarmobile.scss";
export default function ToolbarMobile() {
  const arrayToolbarMobileContent = document.getElementsByClassName("toolbar-mobile-content");
  const [indexToolbarMobile, setIndexToolbarMobile] = useState(0);

  // Style Button Active
  const styleActive = (index) => {
    if (indexToolbarMobile === index) {
      return "btn-feature-item active";
    }
    return "btn-feature-item";
  };

  // OnClick Toolbar Mobile
  const handleToolbarMobile = (index) => {
    let toolbarmobileContentClassList = arrayToolbarMobileContent[index].classList;
    if (toolbarmobileContentClassList.contains("hidden")) {
      toolbarmobileContentClassList.remove("hidden", "slideOutDown");
      toolbarmobileContentClassList.add("slideInUp");
    } else {
      toolbarmobileContentClassList.remove("slideInUp");
      toolbarmobileContentClassList.add("slideOutDown");
      setTimeout(() => {
        toolbarmobileContentClassList.add("hidden");
      }, 500);
    }
    setIndexToolbarMobile(index);
  };

  // Render Tab When Toolbar Change
  useEffect(() => {
    for (let i = 0; i < arrayToolbarMobileContent.length; i++) {
      if (i === indexToolbarMobile) {
        arrayToolbarMobileContent[i].classList.remove("hidden");
      } else {
        arrayToolbarMobileContent[i].classList.add("hidden");
      }
    }
    return () => {};
  }, [indexToolbarMobile]);

  // Handle Close Tab
  const handleCloseToolbar = () => {
    let toolbarmobileContentClassList = arrayToolbarMobileContent[indexToolbarMobile].classList;
    toolbarmobileContentClassList.remove("slideInUp");
    toolbarmobileContentClassList.add("slideOutDown");
    setTimeout(() => {
      toolbarmobileContentClassList.add("hidden");
    }, 500);
  };

  return (
    <>
      {/* Toolbar-mobile */}
      <div id="toolbar-mobile">
        <button className={styleActive(0)} onClick={() => handleToolbarMobile(0)}>
          <FilterNone />
        </button>
        <button className={styleActive(1)} onClick={() => handleToolbarMobile(1)}>
          <AnalyticsOutlined />
        </button>
        <button className={styleActive(2)} onClick={() => handleToolbarMobile(2)}>
          <Search />
        </button>
        <button className={styleActive(3)} onClick={() => handleToolbarMobile(3)}>
          <AltRoute />
        </button>
        <button className={styleActive(4)} onClick={() => handleToolbarMobile(4)}>
          <AccountTreeOutlined />
        </button>
      </div>
      {/* Toolbar Mobile Content 1*/}
      <div className="toolbar-mobile-content hidden">
        <div className="toolbar-mobile-content-container">
          <div className="toolbar-mobile-content-header">
            <span>Noi dung 1</span>
            <button className="btn-feature-item" onClick={handleCloseToolbar}>
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Toolbar Mobile Content 2*/}
      <div className="toolbar-mobile-content hidden">
        <div className="toolbar-mobile-content-container">
          <div className="toolbar-mobile-content-header">
            <span>Noi dung 2</span>
            <button className="btn-feature-item" onClick={handleCloseToolbar}>
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Toolbar Mobile Content 3*/}
      <div className="toolbar-mobile-content hidden">
        <div className="toolbar-mobile-content-container">
          <div className="toolbar-mobile-content-header">
            <span>Noi dung 3</span>
            <button className="btn-feature-item" onClick={handleCloseToolbar}>
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Toolbar Mobile Content 4*/}
      <div className="toolbar-mobile-content hidden">
        <div className="toolbar-mobile-content-container">
          <div className="toolbar-mobile-content-header">
            <span>Noi dung 4</span>
            <button className="btn-feature-item" onClick={handleCloseToolbar}>
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Toolbar Mobile Content 5*/}
      <div className="toolbar-mobile-content hidden">
        <div className="toolbar-mobile-content-container">
          <div className="toolbar-mobile-content-header">
            <span>Noi dung 5</span>
            <button className="btn-feature-item" onClick={handleCloseToolbar}>
              <Close />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
