import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

export default function handleChangeDarkMode() {
  if (isDarkMode) {
    document.body.classList.remove("dark-theme");
    document.querySelector(".img-logo").src = "/img/logo-white.jpg";
    setIsDarkMode(false);
  } else {
    document.body.classList.add("dark-theme");
    document.querySelector(".img-logo").src = "/img/logo-dark.jpg";
    setIsDarkMode(true);
  }
}
