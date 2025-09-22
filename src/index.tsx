import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Calculator from "./components/App/App";
import { CalculatorProvider } from "./services/CalculatorContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CalculatorProvider>
      <Calculator />
    </CalculatorProvider>
  </React.StrictMode>
);
