import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./context/WalletProvider";
import "@near-wallet-selector/modal-ui/styles.css";
import "@mantine/core/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
