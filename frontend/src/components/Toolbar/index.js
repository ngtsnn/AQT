import React, { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeProvider";
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
import "./toolbar.scss";

export default function Toolbar() {
  const [indexToolbar, setIndexToolbar] = useState(0);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  // setIndexToolbar after click button Toolbar
  const handleToolbarTop = (index) => {
    setIndexToolbar(index);
    if (indexToolbar === index) {
      document
        .getElementsByClassName("toolbar-content")
        [indexToolbar].classList.toggle("hidden");
    }
  };

  // Style Button
  const styleActive = (index) => {
    if (indexToolbar === index) {
      return "btn-feature-item active";
    }
    return "btn-feature-item";
  };

  // ChangeTheme (DarkMode)
  const handleChangeTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark-theme");
      document.querySelector(".img-logo").src = "/img/logo-white.png";
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark-theme");
      document.querySelector(".img-logo").src = "/img/logo-dark.png";
      setIsDarkMode(true);
    }
  };

  // Render Toolbar Content
  useEffect(() => {
    const arrayToolbarContent =
      document.getElementsByClassName("toolbar-content");
    for (let i = 0; i < arrayToolbarContent.length; i++) {
      if (i === indexToolbar) {
        arrayToolbarContent[i].classList.remove("hidden");
      } else {
        arrayToolbarContent[i].classList.add("hidden");
      }
    }
    return () => {};
  }, [indexToolbar]);

  // Close toolbar content
  const handleCloseToolbarContent = () => {
    document
      .getElementsByClassName("toolbar-content")
      [indexToolbar].classList.add("hidden");
  };

  return (
    <>
      {/* Toolbar */}
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
            <button className="btn-feature-item" onClick={handleChangeTheme}>
              {isDarkMode ? (
                <Brightness2Outlined style={{ fontSize: "30px" }} />
              ) : (
                <WbSunnyOutlined style={{ fontSize: "30px" }} />
              )}
            </button>
          </span>
          <span>
            <button className="btn-feature-item">
              <Settings style={{ fontSize: "30px" }} />
            </button>
          </span>
        </div>
      </div>
      {/* Toolbar Content */}
      {/* Tab 1 */}
      <div className="toolbar-content">
        <div className="toolbar-content-container">
          <div className="toolbar-content-header">
            <span>Nội dung 1</span>
            <button
              className="btn-feature-item"
              onClick={handleCloseToolbarContent}
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Tab 2 */}
      <div className="toolbar-content">
        <div className="toolbar-content-container">
          <div className="toolbar-content-header">
            <span>Nội dung 2</span>
            <button
              className="btn-feature-item"
              onClick={handleCloseToolbarContent}
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Tab 3 */}
      <div className="toolbar-content">
        <div className="toolbar-content-container">
          <div className="toolbar-content-header">
            <span>Nội dung 3</span>
            <button
              className="btn-feature-item"
              onClick={handleCloseToolbarContent}
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Tab 4 */}
      <div className="toolbar-content">
        <div className="toolbar-content-container">
          <div className="toolbar-content-header">
            <span>Nội dung 4</span>
            <button
              className="btn-feature-item"
              onClick={handleCloseToolbarContent}
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
      {/* Tab 5 */}
      <div className="toolbar-content">
        <div className="toolbar-content-container">
          <div className="toolbar-content-header">
            <span>Nội dung 5</span>
            <button
              className="btn-feature-item"
              onClick={handleCloseToolbarContent}
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
