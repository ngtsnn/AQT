import "./scss/main.scss";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import ToolbarMobile from "./components/ToolbarMobile";
import GisLayout from "./components/GisLayout";
import DarkModeProvider from "./context/DarkModeProvider";

function App() {
	return (
		<DarkModeProvider>
			<div className="App">
				<Header></Header>
				<div
					className="app-content"
					style={{
						position: "relative",
						display: "flex",
						flexDirection: "row",
						width: "100%",
						height: "100%",
					}}
				>
					<Toolbar></Toolbar>
					<GisLayout></GisLayout>
				</div>
				<ToolbarMobile></ToolbarMobile>
			</div>
		</DarkModeProvider>
	);
}

export default App;
