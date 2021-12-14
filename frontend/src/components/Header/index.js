import React, { useRef, useState, useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeProvider";
import {
  Dehaze,
  InfoOutlined,
  Close,
  Link,
  Brightness2Outlined,
  Attachment,
} from "@mui/icons-material";
import { Switch } from "@mui/material";
import "./header.scss";
import { useGis } from "../../context/GisContext";
import { getCitiesByDate } from "../../actions/GisActions/action";

export default function Header() {
  const [type, setType] = useState("");
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const infoRef = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const [gis, distpatch] = useGis();
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const handleOpen = (type) => {
    switch (type) {
      case "menu":
        menuRef.current.classList.remove("hidden", "slideOutLeft");
        menuRef.current.classList.add("slideInLeft");

        overlayRef.current.classList.remove("hidden");

        setType("menu");
        break;
      case "info":
        infoRef.current.classList.remove("hidden", "slideOutRight");
        infoRef.current.classList.add("slideInRight");

        overlayRef.current.classList.remove("hidden");

        setType("info");
        break;

      default:
        break;
    }
  };

  const handleClose = (type) => {
    switch (type) {
      case "menu":
        menuRef.current.classList.remove("slideInLeft");
        menuRef.current.classList.add("slideOutLeft");

        setTimeout(() => {
          menuRef.current.classList.add("hidden");
          overlayRef.current.classList.add("hidden");
        }, [500]); // 500ms: That's a animation slideOutLeft delay

        setType("");
        break;
      case "info":
        infoRef.current.classList.remove("slideInRight");
        infoRef.current.classList.add("slideOutRight");

        setTimeout(() => {
          infoRef.current.classList.add("hidden");
          overlayRef.current.classList.add("hidden");
        }, [500]); // 500ms: That's a animation slideOutRight delay

        setType("");
        break;

      default:
        break;
    }
  };

  const handleChangeDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark-theme");
      document.querySelector(".img-logo").src = "/img/logo-white.jpg";
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark-theme");
      document.querySelector(".img-logo").src = "/img/logo-dark.jpg";
      setIsDarkMode(true);
    }
  };

  const pickDateHandle = async (e) => {
    distpatch(await getCitiesByDate(e.target.value, gis.currentCategory));
    // distpatch(renderByCate(gis.currentCategory));
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="header-container">
          <div className="header-left">
            <button
              className="btn-feature-item"
              onClick={() => handleOpen("menu")}
            >
              <Dehaze />
            </button>
            <a href="/">
              <div className="img-container">
                <img src="/img/logo-white.jpg" alt="" className="img-logo" />
              </div>
            </a>
          </div>
          <div className="header-center">
            <input
              type="date"
              id="date"
              min="2021-12-05"
              max={date}
              defaultValue={date}
              onChange={pickDateHandle}
            />
          </div>
          <div className="header-right">
            <button
              className="btn-feature-item"
              onClick={() => handleOpen("info")}
            >
              <InfoOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* Modal Menu*/}
      <div className="modal-menu hidden" ref={menuRef}>
        <div className="modal-header">
          <button
            className="btn-feature-item"
            onClick={() => handleClose("menu")}
          >
            <Close />
          </button>
        </div>
        <div className="modal-content">
          <ul>
            <li>
              <a href="/">
                <Attachment className="modal-content-icon" />
                <span>Hotline: 19001000</span>
              </a>
            </li>
            <li>
              <a href="/">
                <Link className="modal-content-icon" />
                <span>Air Quality Tracking Map</span>
              </a>
            </li>
            <li>
              <a href="/">
                <Brightness2Outlined className="modal-content-icon" />
                <span style={{ display: "flex", flex: "1" }}>Dark Mode</span>
                <Switch
                  checked={isDarkMode}
                  size="medium"
                  color="info"
                  onChange={handleChangeDarkMode}
                />
              </a>
            </li>
            <li>
              <a href="/">
                <Link className="modal-content-icon" />
                <span>Languages</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal Info */}
      <div className="modal-info hidden" ref={infoRef}>
        <div className="modal-header">
          <button
            className="btn-feature-item"
            onClick={() => handleClose("info")}
          >
            <Close />
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-title">
            <h1>Lorem ipsum dolor sit amet.</h1>
          </div>
          <div className="modal-desc">
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              porro quas iste libero eligendi consequatur voluptatum reiciendis
              commodi? Tenetur aut expedita ex blanditiis, ullam eligendi.
              Commodi vero similique praesentium laboriosam consectetur, quam
              quae officiis in placeat rem, eligendi culpa ab? Quidem ea non id,
              rerum totam et aperiam nobis. Non.
            </span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className="overlay hidden"
        ref={overlayRef}
        onClick={() => handleClose(type)}
      ></div>
    </>
  );
}
