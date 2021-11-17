import React, { useRef, useState } from "react";
import {
  Dehaze,
  InfoOutlined,
  Close,
  Link,
  WbSunny,
  Attachment,
} from "@mui/icons-material";
import { Switch } from "@mui/material";
import "./header.scss";

export default function Header() {
  const [type, setType] = useState("");
  const infoRef = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

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

        console.log("LOGGG");

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
              <img src="/img/logo.png" alt="" />
            </a>
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
                <span>Cổng 1022 tiếp nhận thông tin và giải đáp</span>
              </a>
            </li>
            <li>
              <a href="/">
                <Link className="modal-content-icon" />
                <span>Bản đồ nguy cơ Covid-19</span>
              </a>
            </li>
            <li>
              <a href="/">
                <WbSunny className="modal-content-icon" />
                <span style={{ display: "flex", flex: "1" }}>
                  Chế độ nền tối
                </span>
                <Switch defaultChecked={false} size="medium" color="info" />
              </a>
            </li>
            <li>
              <a href="/">
                <Link className="modal-content-icon" />
                <span>Chuyển đổi ngôn ngữ</span>
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
