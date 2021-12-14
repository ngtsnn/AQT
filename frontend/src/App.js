import "./scss/main.scss";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import ToolbarMobile from "./components/ToolbarMobile";
import GisLayout from "./components/GisLayout";
import DarkModeProvider from "./context/DarkModeProvider";
import { GisProvider } from "./context/GisContext";

function App() {
  return (
    <DarkModeProvider>
      <GisProvider>
        <div className="App">
          <Header></Header>
          <div
            className="app-content"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "calc(100vh - 70px)",
            }}
          >
            <Toolbar></Toolbar>
            <GisLayout></GisLayout>
          </div>
          <ToolbarMobile></ToolbarMobile>
        </div>
      </GisProvider>
    </DarkModeProvider>
  );
}

export default App;
