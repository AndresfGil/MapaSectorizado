
import "./styles.css";
import React from "react";
import { store } from "./store";
import { MapApp } from "./MapApp";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MapApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
