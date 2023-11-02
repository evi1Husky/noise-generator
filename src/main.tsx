import ReactDOM from "react-dom/client";
import "./index.css";
import { NoiseGenerator } from "./components/NoiseGenerator/NoiseGenerator";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="app-container">
    <NoiseGenerator />
  </div>
);
