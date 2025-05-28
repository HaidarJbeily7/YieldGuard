import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import { Router } from "./Router";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="yield-guard-theme">
			<Router />
		</ThemeProvider>
	);
}

export default App;
