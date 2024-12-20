import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./context/WalletProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
