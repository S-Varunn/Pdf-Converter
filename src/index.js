import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-chrome-extension-router";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
