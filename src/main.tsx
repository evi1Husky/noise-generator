import ReactDOM from "react-dom/client";
import "./index.css";
import { NoiseGenerator } from "./components/NoiseGenerator/NoiseGenerator";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="app-container">
    <NoiseGenerator />
  </div>
);
