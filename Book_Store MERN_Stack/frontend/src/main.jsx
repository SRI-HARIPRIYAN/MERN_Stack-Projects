import { render } from "preact";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("app")).render(
	<BrowserRouter>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</BrowserRouter>
);
