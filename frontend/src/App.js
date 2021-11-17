import "./App.scss";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import GisLayout from "./components/GisLayout";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div
        className="app-content"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Toolbar></Toolbar>
        <GisLayout></GisLayout>
      </div>
    </div>
  );
}

export default App;
