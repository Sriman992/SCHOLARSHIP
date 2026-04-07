import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApplicationProvider } from "./context/ApplicationContext";
import { ScholarshipProvider } from "./context/ScholarshipContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScholarshipProvider>
      <ApplicationProvider>
        <App />
      </ApplicationProvider>
    </ScholarshipProvider>
  </React.StrictMode>
);